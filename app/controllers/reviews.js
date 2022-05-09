/** @format */

const { CourseModel, ReviewModel, UserModel } = require('../models');
const {
  handleHTTPError,
  handleSuccess,
} = require('../utils/handleResponses');

const getReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find().populate({
      path: 'user',
      select: 'name email',
      model: 'User',
    })
      .populate({
        path: 'course',
        select: 'name',
        model: 'Course',
      });
    return handleSuccess(res, 'Reviews encontrados', reviews);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

const getReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id).populate({
      path: 'user',
      select: 'name email',
      model: 'User',
    })
      .populate({
        path: 'course',
        select: 'name',
        model: 'Course',
      });
    if (!review) {
      return handleHTTPError(res, 'Review no encontrado', 404);
    }
    return handleSuccess(res, 'Review encontrado', review);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

const createReview = async (req, res) => {
  try {
    console.log(req.body);
    const { courseId, rating, comment } = req.body;
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return handleHTTPError(res, 'User no encontrado', 404);
    }

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return handleHTTPError(res, 'Course no encontrado', 404);
    }

    const review = await ReviewModel.create({
      user: user._id,
      course: course._id,
      rating,
      comment,
    })

    return handleSuccess(res, 'Review creado', review);
  } catch (error) {
    console.log(error);
    handleHTTPError(res, error.message);
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id);
    if (!review) {
      return handleHTTPError(res, 'Review no encontrado', 404);
    }

    const user = await UserModel.findById(req.userId);
    if (!user) {
      return handleHTTPError(res, 'User no encontrado', 404);
    }

    if (user._id.toString() !== review.user.toString()) {
      return handleHTTPError(
        res,
        'No tienes permisos para editar este review',
        401
      );
    }

    const { courseId, rating, comment } = req.body;
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return handleHTTPError(res, 'Course no encontrado', 404);
    }

    const updatedReview = await ReviewModel.findByIdAndUpdate(
      req.params.id,
      {
        course: course._id,
        rating,
        comment,
      },
      { new: true }
    ).populate({
      path: 'user',
      select: 'name email',
      model: 'User',
    })
      .populate({
        path: 'course',
        select: 'name',
        model: 'Course',
      });

    return handleSuccess(res, 'Review actualizado', updatedReview);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id);
    if (!review) {
      return handleHTTPError(res, 'Review no encontrado', 404);
    }

    const user = await UserModel.findById(req.userId);
    if (!user) {
      return handleHTTPError(res, 'User no encontrado', 404);
    }

    if (user._id.toString() !== review.user.toString()) {
      return handleHTTPError(
        res,
        'No tienes permisos para eliminar este review',
        401
      );
    }

    await review.remove();
    return handleSuccess(res, 'Review eliminado');
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

module.exports = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
