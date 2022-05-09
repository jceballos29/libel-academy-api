/** @format */

const { UserModel, CourseModel } = require('../models');
const {
  handleHTTPError,
  handleSuccess,
} = require('../utils/handleResponses');
const {
  comparePassword,
  encryptPassword,
} = require('../utils/handlePassword');

const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)
      .select('-password')
      .populate('avatar')
      .populate({
        path: 'wishlistCourses',
        populate: {
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
        },
      })
      .populate({
        path: 'wishlistCourses',
        populate: {
          path: 'instructor',
          model: 'Instructor',
        },
      })
      .populate({
        path: 'enrolledCourses',
        populate: {
          path: 'course',
          model: 'Course',
          populate: {
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
          },
        },
      });
    if (!user) {
      return handleHTTPError(res, 'Usuario no encontrado', 404);
    }
    return handleSuccess(res, 'Usuario encontrado', user);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true, runValidators: true }
    )
      .select('-password')
      .populate('avatar')
      .populate({
        path: 'wishlistCourses',
        populate: {
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
        },
      })
      .populate({
        path: 'wishlistCourses',
        populate: {
          path: 'instructor',
          model: 'Instructor',
        },
      })
      .populate({
        path: 'enrolledCourses',
        populate: {
          path: 'course',
          model: 'Course',
          populate: {
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
          },
        },
      });
    if (!user) {
      return handleHTTPError(res, 'Usuario no encontrado', 404);
    }
    return handleSuccess(res, 'Usuario actualizado', user);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return handleHTTPError(res, 'Usuario no encontrado', 404);
    }
    const isPasswordCorrect = await comparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return handleHTTPError(res, 'Contraseña incorrecta', 400);
    }
    const newPasswordHash = await encryptPassword(newPassword);
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.userId,
      { password: newPasswordHash },
      { new: true }
    )
      .select('-password')
      .populate('avatar')
      .populate({
        path: 'wishlistCourses',
        populate: {
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
        },
      })
      .populate({
        path: 'wishlistCourses',
        populate: {
          path: 'instructor',
          model: 'Instructor',
        },
      })
      .populate({
        path: 'enrolledCourses',
        populate: {
          path: 'course',
          model: 'Course',
          populate: {
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
          },
        },
      });
    return handleSuccess(res, 'Contraseña actualizada', updatedUser);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.deleteById(req.userId);
    if (!user) {
      return handleHTTPError(res, 'Usuario no encontrado', 404);
    }
    return handleSuccess(res, 'Usuario eliminado', user);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

const addCourseToWishlist = async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return handleHTTPError(res, 'Usuario no encontrado', 404);
    }
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return handleHTTPError(res, 'Curso no encontrado', 404);
    }

    const isCourseInWishlist = user.wishlistCourses.find(
      (wishlistCourse) =>
        wishlistCourse.toString() === course._id.toString()
    );
    if (isCourseInWishlist) {
      return handleHTTPError(
        res,
        'Curso ya agregado a la lista de deseos',
        400
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.userId,
      { $push: { wishlistCourses: courseId } },
      { new: true }
    )
      .select('-password')
      .populate('avatar')
      .populate({
        path: 'wishlistCourses',
        populate: {
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
        },
      })
      .populate({
        path: 'wishlistCourses',
        populate: {
          path: 'instructor',
          model: 'Instructor',
        },
      })
      .populate({
        path: 'enrolledCourses',
        populate: {
          path: 'course',
          model: 'Course',
          populate: {
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
          },
        },
      });
    return handleSuccess(
      res,
      'Curso agregado a la lista de deseos',
      updatedUser
    );
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

const removeCourseFromWishlist = async (req, res) => {
  try {
    const { courseId } = req.params;
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return handleHTTPError(res, 'Usuario no encontrado', 404);
    }
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return handleHTTPError(res, 'Curso no encontrado', 404);
    }

    const isCourseInWishlist = user.wishlistCourses.find(
      (wishlistCourse) =>
        wishlistCourse.toString() === course._id.toString()
    );
    if (!isCourseInWishlist) {
      return handleHTTPError(
        res,
        'Curso no agregado a la lista de deseos',
        400
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.userId,
      { $pull: { wishlistCourses: courseId } },
      { new: true }
    )
      .select('-password')
      .populate('avatar')
      .populate({
        path: 'wishlistCourses',
        populate: {
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
        },
      })
      .populate({
        path: 'wishlistCourses',
        populate: {
          path: 'instructor',
          model: 'Instructor',
        },
      })
      .populate({
        path: 'enrolledCourses',
        populate: {
          path: 'course',
          model: 'Course',
          populate: {
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
          },
        },
      });

    return handleSuccess(
      res,
      'Curso eliminado de la lista de deseos',
      updatedUser
    );
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return handleHTTPError(res, 'Usuario no encontrado', 404);
    }
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return handleHTTPError(res, 'Curso no encontrado', 404);
    }

    const isCourseEnrolled = user.enrolledCourses
      .map((enroll) => enroll.course._id.toString())
      .includes(course._id.toString());

    if (isCourseEnrolled) {
      return handleHTTPError(res, 'Curso ya inscrito', 400);
    }

    const isCourseInWishlist = user.wishlistCourses
      .map((wish) => wish.toString())
      .includes(course._id.toString());
    if (isCourseInWishlist) {
      await UserModel.findByIdAndUpdate(
        req.userId,
        { $pull: { wishlistCourses: courseId } },
        { new: true }
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.userId,
      { $push: { enrolledCourses: { course: course._id } } },
      { new: true }
    )
      .select('-password')
      .populate('avatar')
      .populate({
        path: 'wishlistCourses',
        populate: {
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
        },
      })
      .populate({
        path: 'wishlistCourses',
        populate: {
          path: 'instructor',
          model: 'Instructor',
        },
      })
      .populate({
        path: 'enrolledCourses',
        populate: {
          path: 'course',
          model: 'Course',
          populate: {
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
          },
        },
      });

    course.enrolledUsers.push(user._id);
    await course.save();

    return handleSuccess(res, 'Curso inscrito', updatedUser, 200);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};

const dropCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return handleHTTPError(res, 'Usuario no encontrado', 404);
    }
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return handleHTTPError(res, 'Curso no encontrado', 404);
    }

    const isCourseEnrolled = user.enrolledCourses
      .map((enroll) => enroll.course._id.toString())
      .includes(course._id.toString());
    if (!isCourseEnrolled) {
      return handleHTTPError(res, 'Curso no inscrito', 400);
    }

    const isCompleted = user.enrolledCourses
      .filter((course) => course.status === 'completado')
      .map((complete) => complete.course._id.toString())
      .includes(course._id.toString());

    if (isCompleted) {
      return handleHTTPError(res, 'Curso ya completado', 400);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.userId,
      { $pull: { enrolledCourses: { course: course._id } } },
      { new: true }
    )
      .select('-password')
      .populate('avatar')
      .populate({
        path: 'wishlistCourses',
        populate: {
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
        },
      })
      .populate({
        path: 'wishlistCourses',
        populate: {
          path: 'instructor',
          model: 'Instructor',
        },
      })
      .populate({
        path: 'enrolledCourses',
        populate: {
          path: 'course',
          model: 'Course',
          populate: {
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
          },
        },
      });

    course.enrolledUsers.pull(user._id);
    await course.save();

    return handleSuccess(res, 'Curso abandonado', updatedUser, 200);
  } catch (error) {
    handleHTTPError(res, error.message);
  }
};


const completeLesson = async (req, res) => {
  try { 
    const { courseId, lessonId } = req.params;
    const user = await UserModel.findById(req.userId).select('-password')
    .populate('avatar')
    .populate({
      path: 'wishlistCourses',
      populate: {
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
      },
    })
    .populate({
      path: 'wishlistCourses',
      populate: {
        path: 'instructor',
        model: 'Instructor',
      },
    })
    .populate({
      path: 'enrolledCourses',
      populate: {
        path: 'course',
        model: 'Course',
        populate: {
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
        },
      },
    });
    if (!user) {
      return handleHTTPError(res, 'Usuario no encontrado', 404);
    }
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return handleHTTPError(res, 'Curso no encontrado', 404);
    }
    const isCourseEnrolled = user.enrolledCourses.find((enroll) => enroll.course._id.toString() === courseId);
    if (!isCourseEnrolled) {
      return handleHTTPError(res, 'Curso no inscrito', 400);
    }
    const lesson = course.modules.map(m => m.lessons).flat().find(l => l._id.toString() === lessonId);
  
    if (!lesson) {
      return handleHTTPError(res, 'Lección no encontrada', 404);
    }

    const isCompletedLesson = user.enrolledCourses.find(enroll => enroll.course._id.toString() === courseId).completeLessons.includes(lesson._id)
    if (isCompletedLesson) {
      return handleHTTPError(res, 'Lección ya completada', 400);
    }

    user.enrolledCourses.find(enroll => enroll.course._id.toString() === courseId).completeLessons.push(lesson._id);
    if(lesson.order === course.totalLessons) {
      user.enrolledCourses.find(enroll => enroll.course._id.toString() === courseId).status = 'completado';
      user.enrolledCourses.find(enroll => enroll.course._id.toString() === courseId).completedAt = new Date();
      user.enrolledCourses.find(enroll => enroll.course._id.toString() === courseId).currentLesson = 1;
    }else {
      user.enrolledCourses.find(enroll => enroll.course._id.toString() === courseId).currentLesson = lesson.order + 1;
    }
    await user.save();
        
    return handleSuccess(res, 'Lección completada', user, 200);

  } catch (error) {
    handleHTTPError(res, error.message);
  }
}


const userController = {
  getUser,
  updateUser,
  changePassword,
  deleteUser,
  addCourseToWishlist,
  removeCourseFromWishlist,
  enrollCourse,
  dropCourse,
  completeLesson
};

module.exports = userController;
