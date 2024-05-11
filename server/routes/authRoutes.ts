import {
  signin,
  signup,
  refreshToken,
  logout
} from '../controllers/authController'
import { Router } from 'express'

const router = Router()

router.post('/signin', signin)
router.post('/signup', signup)
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.post('/refreshtoken', refreshToken)
router.post('/logout', logout)
export default router
