const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const {validate} = require('../middleware/auth');


router.get('/', validate, userController.getUser);
router.put('/', validate, userController.updateUser);
router.patch('/password', validate, userController.changePassword);
router.delete('/', validate, userController.deleteUser);
router.post('/wishlist', validate, userController.addCourseToWishlist);
router.delete('/wishlist/:courseId', validate, userController.removeCourseFromWishlist);
router.post('/enroll', validate, userController.enrollCourse);
router.delete('/enroll/:courseId', validate, userController.dropCourse);
router.post('/complete/:courseId/:lessonId', validate, userController.completeLesson);


module.exports = router;