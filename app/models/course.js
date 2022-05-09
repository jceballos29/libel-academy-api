/** @format */

const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    level: {
      type: String,
      enum: ['Principiante', 'Intermedio', 'Avanzado'],
      required: true,
    },
    duration: {
      hours: { type: Number, required: true },
      minutes: { type: Number, required: true },
      seconds: { type: Number, required: true },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    images: {
      common: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Storage',
        required: true,
      },
      featured: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Storage',
        required: true,
      },
    },
    trailer: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Instructor',
      required: true,
    },
    enrolledUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    modules: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        name: { type: String, required: true },
        order: { type: Number, required: true },
        lessons: [
          {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            name: { type: String, required: true },
            description: { type: String, required: true },
            order: { type: Number, required: true },
            video: { type: String, required: true },
            duration: { type: String, required: true },
          },
        ],
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    totalLessons: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    certificate: { type: Boolean, default: false },
    whatYouLearn: { type: String, required: true },
    materials: [String],
    requirements: [String],
    whoShouldTake: [String],
  },
  {
    collection: 'courses',
    timestamps: true,
    versionKey: false,
  }
);

courseSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Course', courseSchema);
