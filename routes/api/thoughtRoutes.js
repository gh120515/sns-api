const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(removeThought);

// /api/thoughts/:thoughtId/reactions
// post reactions by thought ID
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId
// delete reactions by reactionId  
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router;
