const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');
const {validate} = require('../middleware/auth');


router.get('/', coursesController.getCourses);
router.get('/:id', coursesController.getCourse);
router.get('/slug/:slug', coursesController.getCourseBySlug);
router.post('/', coursesController.createCourse);
router.patch('/:id', coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);
router.post('/:id/reviews', validate, coursesController.addReview);


module.exports = router;