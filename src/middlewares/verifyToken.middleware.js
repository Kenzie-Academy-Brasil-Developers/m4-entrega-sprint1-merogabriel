import dotenv from 'dotenv'
import { verify } from 'jsonwebtoken'

dotenv.config()

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Missing authorization headers' })
  }

  return verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: err })
    } else {
      req.decoded = decoded
      return next()
    }
  })
}

export default verifyToken
