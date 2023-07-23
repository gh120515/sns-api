const { Schema, model } = require('mongoose');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // mongoose matching validation for a valid email
        match: [
            /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            'Please enter a valid email address.',
        ]
    },
    thoughts: [
        // array of _id values referencing the Thought model
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],
    friends: [
        // array of _id values referencing the User model (as 'friends')
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// virtual reactionCount that retrieves the length of the user's 'reaction' array field on query
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length
});

const Thought = model('user', thoughtSchema);

module.exports = Thought;
