const { User, Thought } = require('../models');

module.exports = {
    // GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
                // exclude __v (version key)
                .select('-__v')
            res.status(200).json(users);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err, message: 'Error: Could not get the users.'});
        }
    },

    // GET a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('thoughts')
                .populate('friends')
            res.status(200).json(user);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err, message: 'Error: Could not get the user.'});
        }
    },

    // Create (POST) a new user
    async createUser (req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err, message: 'Error: Could not create the user.'});
        }
    },

    // Update (PUT) a user by their _id
    async updateUser (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            
            if(!user) {
                return res.status(400)
                    .json({ message: 'Error: No user with that ID found.' })
            };

            res.status(200).json(user);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err, message: 'Error: Could not update the user.'});
        }
    },

    // Remove (DELETE) a user by their _id, and their associated thoughts
    async removeUser(req, res) {
        try {
            const user = await User.findOneAndDelete( { _id: req.params.userId } );
            
            if(!user) {
                return res.status(400)
                    .json({ message: 'Error: No user with that ID found.' })
            };

            // remove this user's associated thoughts when deleted
            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            res.status(200).json({ user, message: 'User and associated thoughts deleted!'});
        } catch (err) {
            console.log(err)
            return res.status(500).json({ err, message: 'Error: Could not delete the user.'});
        }
    }

};