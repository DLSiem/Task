import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    items: [
      {
        title: {
          type: String,
          required: true
        },
        done: {
          type: Boolean,
          default: false
        },
        description: {
          type: String
        }
      }
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public'
    }
  },
  {
    timestamps: true
  }
)

const Task = mongoose.model('Task', taskSchema)

export default Task
