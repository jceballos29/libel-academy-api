const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const storageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    filename: { type: String, required: true },
  },
  {
    collection: 'storage',
    timestamps: true,
    versionKey: false
  }
)

storageSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' })
module.exports = mongoose.model('Storage', storageSchema)