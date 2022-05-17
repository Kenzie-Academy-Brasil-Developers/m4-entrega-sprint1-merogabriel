import USERS_DB from '../database'

const verifyEmailVacancy = (req, res, next) => {
  const foundUser = USERS_DB.find(
    ({ email }) => email.toLowerCase() === req.body.email.toLowerCase()
  )

  if (foundUser) {
    return res.status(400).json({ message: 'E-mail already registered' })
  }

  return next()
}

export default verifyEmailVacancy
