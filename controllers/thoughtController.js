const { User, Thought } = require('../models');

module.exports = {
    // GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
                // exclude __v (version key)
                .select('-__v')
            res.status(200).json(thoughts);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err, message: 'Error: Could not get the thoughts.'});
        }
    },

    // GET a single thought by its _id
    async getSingleThought(req, res) {
        try {
            const thoughts = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
            res.status(200).json(thoughts);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err, message: 'Error: Could not get the thoughts.'});
        }
    },

    // Create (POST) a new thoughts
    async createThought (req, res) {
        try {
            const thoughts = await Thought.create(req.body)
                .then(({ _id }) => {
                    // add the thought in relation to the user's thoughts (array)
                    return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                    );
                })
                .then((user) =>
                !user
                    ? res.status(400).json({ message: "Thought created, but no user is associated with this id!" })
                    : res.status(200).json({
                        updatedUser: user,
                        message: 'Thought added to user.'
                    })
                );
            // res.status(200).json( { thoughts, message: 'Thought added to user.'});
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err, message: 'Error: Could not create the thought.'});
        }
    },

    // Update (PUT) a thoughts by their _id
    async updateThought (req, res) {
        try {
            const thoughts = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            
            if(!thoughts) {
                return res.status(400)
                    .json({ message: 'Error: No thought with that ID found.' })
            };

            res.status(200).json(thoughts);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err, message: 'Error: Could not update the thought.'});
        }
    },

    // Remove (DELETE) a thoughts by their _id, and their associated thoughts
    async removeThought(req, res) {
        try {
            const thoughts = await Thought.findOneAndDelete( { _id: req.params.thoughtId } );
            
            if(!thoughts) {
                return res.status(400)
                    .json({ message: 'Error: No thoughts with that ID found.' })
            };

            // remove this thoughts's associated thoughts when deleted
            await Thought.deleteMany({ _id: { $in: thoughts.thoughts } });

            res.status(200).json({ thoughts, message: 'thoughts and associated thoughts deleted!'});
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err, message: 'Error: Could not delete the thoughts.'});
        }
    },

    // Create (POST) a new Reaction to a thoughts's Reaction list
    async addReaction(req, res) {
        try {
            const thoughts = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            
            if(!thoughts) {
                return res.status(400)
                    .json({ message: 'Error: No thought with that ID found.' })
            };

            res.status(200).json({ thoughts, message: 'Reaction added!'});
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err, message: 'Error: Could not add a reaction to this thought.'});
        }
    },

    // Remove (DELETE) a Reaction from the thoughts's Reaction list
    async removeReaction(req, res) {
        try {
            const thoughts = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            
            if(!thoughts) {
                return res.status(400)
                    .json({ message: 'Error: No thought with that ID found.' })
            };

            res.status(200).json({ thoughts, message: 'Reaction removed!'});
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err, message: 'Error: Could not add a reaction to this thought.'});
        }
    }
};