import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userVerification } from './middlewares/AuthMiddleware'

// import { verifyToken } from './utils/verifyToken'

const app = express()
const port = process.env.PORT ?? 3000

dotenv.config()

app.use(express.json())

app.use('/auth', authRoutes)

app.post('/', userVerification)

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)

mongoose
  .connect(process.env.MONGOOSE_URL ?? '')
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
      console.log(`Express is listening at http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error)
  })

app.use(cookieParser())
