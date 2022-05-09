/** @format */

const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  },
  {
    collection: 'reviews',
    timestamps: true,
    versionKey: false,
  }
);

reviewSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Review', reviewSchema);
