/** @format */

const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const instructorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Storage',
      default: '6274314765fbdfb193061527',
    },
    email: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    website: { type: String, required: false, default: null },
    social: {
      facebook: { type: String, required: false, default: null },
      twitter: { type: String, required: false, default: null },
      instagram: { type: String, required: false, default: null },
      linkedin: { type: String, required: false, default: null },
    },
    phrase: {
      type: String,
      required: false,
      default:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis.',
    },
    bio: {
      type: String,
      required: false,
      default:
        'Teaching is my passion and hobby, so I am super lucky to have a job in education. I am understanding, patient, and aware of how to talk to beginner students. During a lesson, I focus on you and your abilities. Your learning needs will be met through goal making, proper preparation, and teaching.',
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      }
    ]
  },
  {
    collection: 'instructors',
    timestamps: true,
    versionKey: false,
  }
);

instructorSchema.plugin(mongooseDelete, {
  deletedAtField: 'deletedAt',
  overrideMethods: true,
});

module.exports = mongoose.model('Instructor', instructorSchema);
