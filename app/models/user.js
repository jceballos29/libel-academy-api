/** @format */

const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    username: { type: String, required: true, unique: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Storage',
      default: null,
    },

    birthDate: { type: Date, required: true },

    country: { type: String, required: true },

    city: { type: String, required: true },

    phone: { type: String, required: true },

    bio: {
      type: String,
      required: false,
      default:
        'Soy una persona misteriosa que aún no completa su biografía. Una cosa si es segura: ¡me encanta el diseño en 3D!',
    },

    website: { type: String, required: false, default: null },

    social: {
      facebook: { type: String, required: false, default: null },
      twitter: { type: String, required: false, default: null },
      instagram: { type: String, required: false, default: null },
      linkedin: { type: String, required: false, default: null },
    },
    enrolledCourses: [
      {
        course:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course',
        },
        status: {
          type: String,
          enum: ['en proceso', 'completado', 'eliminado'],
          default: 'en proceso',
        },
        completeLessons: [
          { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
        ],
        currentLesson: {type: Number, default: 1},
        completedAt: {type: Date, default: null},
      }
    ],
    wishlistCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
    chart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ]
  },
  {
    collection: 'users',
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('User', userSchema);
