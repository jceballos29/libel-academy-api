/** @format */

const {
  CourseModel,
  InstructorModel,
  CategoryModel,
  ReviewModel
} = require('../models');
const { populate } = require('../models/course');
const {
  handleHTTPError,
  handleSuccess,
} = require('../utils/handleResponses');

const getCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find()
      .populate({
        path: 'instructor',
        select: 'name username avatar',
        populate: {
          path: 'avatar',
          model: 'Storage',
          select: 'url',
        },
      })
      .populate({
        path: 'images',
        populate: [
          {
            path: 'common',
            model: 'Storage',
            select: 'url',
          },
          {
            path: 'featured',
            model: 'Storage',
            select: 'url',
          },
        ],
      })
      .populate({
        path: 'category',
        model: 'Category',
        select: 'name',
      })
      .populate({
        path: 'reviews',
        model: 'Review',
        populate: {
          path: 'user',
          select: 'name username avatar',
          populate: {
            path: 'avatar',
            model: 'Storage',
            select: 'url',
          },
        },
      });
    return handleSuccess(res, 'Cursos encontrados', courses);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id).populate(
      'instructor'
    );
    if (!course) {
      return handleHTTPError(res, 'Curso no encontrado', 404);
    }
    return handleSuccess(res, 'Curso encontrado', course);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

const getCourseBySlug = async (req, res) => {
  try {
    const course = await CourseModel.findOne({
      slug: req.params.slug,
    })
      .populate({
        path: 'instructor',
        select: 'name username avatar phrase courses',
        populate: 
          {
            path: 'avatar',
            model: 'Storage',
            select: 'url',
          }
      })
      .populate({
        path: 'images',
        populate: [
          {
            path: 'common',
            model: 'Storage',
            select: 'url',
          },
          {
            path: 'featured',
            model: 'Storage',
            select: 'url',
          },
        ],
      })
      .populate({
        path: 'category',
        model: 'Category',
        select: 'name',
      })
      .populate({
      path: 'reviews',
      model: 'Review',
      populate: {
        path: 'user',
        select: 'name username avatar',
        populate: {
          path: 'avatar',
          model: 'Storage',
          select: 'url',
        },
      },
    });
    if (!course) {
      return handleHTTPError(res, 'Curso no encontrado', 404);
    }
    return handleSuccess(res, 'Curso encontrado', course);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

const createCourse = async (req, res) => {
  try {
    const instructor = await InstructorModel.findById(
      req.body.instructor
    );
    if (!instructor) {
      return handleHTTPError(res, 'Instructor no encontrado', 404);
    }
    const category = await CategoryModel.findById(req.body.category);
    if (!category) {
      return handleHTTPError(res, 'Categoría no encontrada', 404);
    }
    const course = await CourseModel.create(req.body);

    instructor.courses.push(course._id);
    category.courses.push(course._id);

    await instructor.save();
    await category.save();

    return handleSuccess(res, 'Curso creado', course);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await CourseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('instructor');
    if (!course) {
      return handleHTTPError(res, 'Curso no encontrado', 404);
    }
    return handleSuccess(res, 'Curso actualizado', course);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await CourseModel.findByIdAndDelete(req.params.id);
    if (!course) {
      return handleHTTPError(res, 'Curso no encontrado', 404);
    }
    const instructor = await InstructorModel.findById(
      course.instructor
    );
    const category = await CategoryModel.findById(course.category);

    instructor.courses.pull(course._id);
    category.courses.pull(course._id);

    await instructor.save();
    await category.save();

    return handleSuccess(res, 'Curso eliminado', course);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};


const addReview = async (req, res) => {
  try{
    const {reviewId} = req.body
    const review = await ReviewModel.findById(reviewId);
    if (!review) {
      return handleHTTPError(res, 'Review no encontrado', 404);
    }
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      return handleHTTPError(res, 'Course no encontrado', 404);
    }

    if (!course._id.toString() === review.course.toString()) {
      return handleHTTPError(res, 'Review no encontrado', 404);
    }

    const updateCourse = await CourseModel.findByIdAndUpdate(
      course._id,
      {$push: {reviews: reviewId}},
      {new: true}
    ).populate({
      path: 'instructor',
      select: 'name username avatar phrase courses',
      populate: 
        {
          path: 'avatar',
          model: 'Storage',
          select: 'url',
        }
    })
    .populate({
      path: 'images',
      populate: [
        {
          path: 'common',
          model: 'Storage',
          select: 'url',
        },
        {
          path: 'featured',
          model: 'Storage',
          select: 'url',
        },
      ],
    })
    .populate({
      path: 'category',
      model: 'Category',
      select: 'name',
    })
    .populate({
    path: 'reviews',
    model: 'Review',
    populate: {
      path: 'user',
      select: 'name username avatar',
      populate: {
        path: 'avatar',
        model: 'Storage',
        select: 'url',
      },
    },
  });
    
    return handleSuccess(res, 'Reseña agregado', updateCourse);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
}

module.exports = {
  getCourses,
  getCourse,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  addReview,
};
