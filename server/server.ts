import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import { verifyToken } from './utils/verifyToken'

const app = express()
const port = process.env.PORT ?? 3000

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', verifyToken, (req, res) => {
  res.send('Hello World!')
})
app.use('/auth', authRoutes)

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
