import User from '../models/User'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const userVerification = (req, res): any => {
  console.log('req.Cookies ::')
  console.log(req.rawHeaders[3].split('=')[1])
  const token = req.rawHeaders[3].split('=')[1]

  if (token === undefined || token === null) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err !== null) {
      return res.status(403).json({ message: 'Forbidden', status: false })
    } else {
      const user = await User.findById(decoded.id)
      if (user !== null) {
        return res
          .status(200)
          .json({ message: 'User verified', status: true, user })
      } else {
        return res
          .status(404)
          .json({ message: 'User not found', status: false })
      }
    }
  })
}
