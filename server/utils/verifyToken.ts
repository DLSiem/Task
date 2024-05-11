import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers.authorization
  console.log('authHeader ::', authHeader)
  if (authHeader !== undefined) {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.decode(token, { complete: true })
    console.log('decoded header ::', decoded?.header)
    console.log('decoded payload ::', decoded?.payload)
    console.log('token ::', token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err !== null) {
        console.log('token Error ::', err)
        return res.sendStatus(403)
      }
      ;(req as any).user = user
      next()
    })
  } else {
    res.sendStatus(401)
  }
}
