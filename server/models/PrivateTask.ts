import mongoose from 'mongoose'

const privateTask = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    descriptions: {
      type: String,
      maxlength: 100
    }
  },
  {
    timestamps: true
  }
)

const PrivateTask = mongoose.model('PrivateTask', privateTask)

export default PrivateTask
