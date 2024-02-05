/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Router } from 'express'
import { userController } from '@controllers/users.ctrl'
import { type UserModel } from '@my-types/*'

export const createUsersRouter = (usersModel: UserModel): Router => {
  const usersRouter = express.Router()
  const userCtrl = userController(usersModel)

  usersRouter.post('/', userCtrl.create)
  return usersRouter
}
