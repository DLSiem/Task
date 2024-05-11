// Controller for user related operations

import type { Request, Response } from 'express'
import User from '../models/User'

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    res.status(500).send(error)
  }
}
