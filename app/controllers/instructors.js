const { InstructorModel } = require('../models');
const {
  handleHTTPError,
  handleSuccess,
} = require('../utils/handleResponses');


const getInstructors = async (req, res) => {
  try {
    const instructors = await InstructorModel.find().populate('avatar');
    return handleSuccess(res, 'Instructores encontrados', instructors);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
}


const getInstructor = async (req, res) => {
  try {
    const instructor = await InstructorModel.findById(req.params.id).populate('avatar');
    if (!instructor) {
      return handleHTTPError(res, 'Instructor no encontrado', 404);
    }
    return handleSuccess(res, 'Instructor encontrado', instructor);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
}


const getInstructorByUsername = async (req, res) => {
  try {
    const instructor = await InstructorModel.findOne({ username: req.params.username }).populate('avatar');
    if (!instructor) {
      return handleHTTPError(res, 'Instructor no encontrado', 404);
    }
    return handleSuccess(res, 'Instructor encontrado', instructor);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
}


const createInstructor = async (req, res) => {
  try {
    const instructor = await InstructorModel.create(req.body);
    return handleSuccess(res, 'Instructor creado', instructor);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
}


const updateInstructor = async (req, res) => {
  try {
    const instructor = await InstructorModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('avatar');
    if (!instructor) {
      return handleHTTPError(res, 'Instructor no encontrado', 404);
    }
    return handleSuccess(res, 'Instructor actualizado', instructor);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
}


const deleteInstructor = async (req, res) => {
  try {
    const instructor = await InstructorModel.deleteById(req.params.id);
    if (!instructor) {
      return handleHTTPError(res, 'Instructor no encontrado', 404);
    }
    return handleSuccess(res, 'Instructor eliminado', instructor);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
}


module.exports = {
  getInstructors,
  getInstructor,
  getInstructorByUsername,
  createInstructor,
  updateInstructor,
  deleteInstructor,
};