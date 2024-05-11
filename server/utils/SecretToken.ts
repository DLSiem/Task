import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const createSecretToken = (id: any): any => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}
