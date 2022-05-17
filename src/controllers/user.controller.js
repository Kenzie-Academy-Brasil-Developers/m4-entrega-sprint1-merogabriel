import {
  createUserService,
  loginService,
  getAllUsersService,
  getProfileService,
  updateUserService,
  deleteUserService,
} from '../services'

const createUserController = async (req, res) => {
  const newUser = await createUserService(req)
  return res.status(201).json(newUser)
}

const loginController = async (req, res) => {
  const { status, message } = await loginService(req)
  return res.status(status).json(message)
}

const getAllUsersController = (req, res) => {
  const users = getAllUsersService()
  return res.status(200).json({ users: users })
}

const getProfileController = (req, res) => {
  const user = getProfileService(req.decoded)
  return res.status(200).json(user)
}

const updateUserController = (req, res) => {
  const updatedUser = updateUserService(req, res)
  return res.status(200).json(updatedUser)
}

const deleteUserController = (req, res) => {
  deleteUserService(req, res)
  return res.status(200).json({ mensagem: 'User deleted with success' })
}

export {
  createUserController,
  loginController,
  getAllUsersController,
  getProfileController,
  updateUserController,
  deleteUserController,
}
