import type { Request, Response } from 'express'
import User from '../models/User'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createSecretToken } from '../utils/SecretToken'

let refreshTokens: string[] = []

export const signin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body
    // Find by email id
    const user: any = await User.findOne({ email })
    if (user === null) {
      return res.status(404).json({ message: 'User not found!' })
    }
    // comaring hashed password
    const passwordMatch: boolean = await bcryptjs.compare(
      password,
      user?.password
    )

    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid Password' })
    }

    // genertae jwt token
    const token = createSecretToken(user._id)
    res.cookie('token', token, {
      httpOnly: false
    })
    res.status(200).json({ message: 'User logged in successfully', user })

    // const refreshToken: string = jwt.sign(
    //   { email: user.email, userId: user._id },
    //   process.env.REFRESH_TOKEN_SECRET
    // )
    // refreshTokens.push(refreshToken)
    // res.status(200).json({ accessToken, refreshToken, user })
  } catch (err) {
    console.log(err)
  }
}

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user !== null) {
      console.log('User already exists')
      res.status(400).json({ message: 'User already exists' })
    } else {
      try {
        const hashedpassword = await bcryptjs.hash(password, 10)
        const name = email.split('@')[0]
        const user = { name, email, password: hashedpassword }
        const newUser = await User.create(user)
        const token = createSecretToken(newUser._id)
        res.cookie('token', token, {
          httpOnly: false
        })
        res.status(201).json({
          message: 'User created successfully',
          success: true,
          user: newUser
        })
      } catch (error) {
        res.status(400).json({ message: error })
        console.log(error)
      }
    }
  } catch (err) {
    res.status(400).json({ message: err })
  }
}

export const refreshToken = (req: Request, res: Response): any => {
  const { token } = req.body
  if (token === null) {
    return res.sendStatus(401)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403)
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err !== null) {
      return res.sendStatus(403)
    }
    const accessToken = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '20m' }
    )
    res.json({ accessToken })
  })
}

export const logout = (req: Request, res: Response): any => {
  const { token } = req.body
  if (token === null) {
    return res.sendStatus(401)
  }
  refreshTokens = refreshTokens.filter((t) => t !== token)
}
