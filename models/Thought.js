const { Schema, model } = require('mongoose');
const dayjs = require ('dayjs');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) =>
            dayjs(timestamp).format('DD MMM[,] YYYY [at] hh:mm a'),
    },
    username: {
        type: String,
        required: true,
    },
    // array of nested documents created with the reactionSchema
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// virtual reactionCount that retrieves the length of the user's 'reactions' array field on query
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
