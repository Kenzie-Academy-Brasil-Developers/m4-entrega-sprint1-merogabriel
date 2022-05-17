import { Router } from 'express'

import {
  createUserController,
  loginController,
  getAllUsersController,
  getProfileController,
  updateUserController,
  deleteUserController,
} from '../controllers'

import {
  verifyToken,
  isAdm,
  verifyTypes,
  verifyEmailVacancy,
  verifyIdAuth,
} from '../middlewares'

const router = Router()

router.post('/users', verifyTypes, verifyEmailVacancy, createUserController)
router.post('/login', loginController)
router.get('/users', verifyToken, isAdm, getAllUsersController)
router.get('/users/profile', verifyToken, getProfileController)
router.patch('/users/:uuid', verifyToken, verifyIdAuth, updateUserController)
router.delete('/users/:uuid', verifyToken, verifyIdAuth, deleteUserController)

export default router
