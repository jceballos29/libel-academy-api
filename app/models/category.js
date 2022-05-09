const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');


const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Storage',
    },
    courses:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      }
    ]
  },
  {
    collection: 'categories',
    timestamps: true,
    versionKey: false,
  }
);


categorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});


module.exports = mongoose.model('Category', categorySchema);