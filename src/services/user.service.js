import { hash, compare } from 'bcrypt'
import { v4 } from 'uuid'
import dotenv from 'dotenv'
import USERS_DB from '../database'
import { userWOPassword, getDate } from '../utils'
import { sign } from 'jsonwebtoken'

dotenv.config()

const createUserService = async ({ body }) => {
  body.uuid = v4()
  body.createdOn = getDate()
  body.updatedOn = getDate()
  body.password = await hash(body.password, 10)

  if (!body.isAdmin) {
    body.isAdmin = false
  }

  USERS_DB.push(body)

  const newUser = userWOPassword(body)

  return newUser
}

const loginService = async ({ body }) => {
  const foundUser = USERS_DB.find((user) => user.email === body.email)

  if (!foundUser) {
    return { status: 401, message: { message: 'Wrong email/password' } }
  }

  if (!(await compare(body.password, foundUser.password))) {
    return { status: 401, message: { message: 'Wrong email/password' } }
  }

  const token = sign({ email: foundUser.email }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  })

  return { status: 200, message: { token } }
}

const getAllUsersService = () => {
  const users = USERS_DB.map((u) => {
    return userWOPassword(u)
  })

  return users
}

const getProfileService = (decoded) => {
  const user = USERS_DB.find(
    ({ email }) => email.toLowerCase() === decoded.email.toLowerCase()
  )
  return userWOPassword(user)
}

const updateUserService = ({ user, body }, res) => {
  if (body.isAdmin) {
    return res.status(400).json({ err: "You can't update isAdmin key." })
  }

  body.updatedOn = getDate()

  Object.assign(user, body)

  return userWOPassword({ ...user, ...body })
}

const deleteUserService = ({ user }) => {
  const userIndex = USERS_DB.indexOf(user)
  USERS_DB.splice(userIndex, 1)
  return
}

export {
  createUserService,
  loginService,
  getAllUsersService,
  getProfileService,
  updateUserService,
  deleteUserService,
}
