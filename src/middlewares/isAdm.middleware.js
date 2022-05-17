import USERS_DB from '../database'

const isAdm = (req, res, next) => {
  const decodedUser = USERS_DB.find((u) => u.email === req.decoded.email)

  if (!decodedUser.isAdmin) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next()
}

export default isAdm
