const express = require('express');
const router = express.Router();

const instructorsController = require('../controllers/instructors');


router.get('/', instructorsController.getInstructors);
router.get('/:id', instructorsController.getInstructor);
router.get('/username/:username', instructorsController.getInstructorByUsername);
router.post('/', instructorsController.createInstructor);
router.patch('/:id', instructorsController.updateInstructor);
router.delete('/:id', instructorsController.deleteInstructor);


module.exports = router;