import USERS_DB from '../database'

const verifyIdAuth = (req, res, next) => {
  const decodedUser = USERS_DB.find((u) => u.email === req.decoded.email)
  const paramsUser = USERS_DB.find((u) => u.uuid === req.params.uuid)

  req.user = paramsUser

  if (decodedUser && decodedUser.isAdmin) {
    return next()
  }

  if (decodedUser != paramsUser) {
    return res.status(403).json({ message: 'Missing admin permissions' })
  }

  return next()
}

export default verifyIdAuth
