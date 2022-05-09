const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews');
const {validate} = require('../middleware/auth');


router.get('/', reviewController.getReviews);
router.get('/:id', reviewController.getReview);
router.post('/', validate, reviewController.createReview);
router.put('/:id', validate, reviewController.updateReview);
router.delete('/:id', validate, reviewController.deleteReview);


module.exports = router;
