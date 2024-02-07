/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import type { AuthModel } from '@my-types/'
import { authController } from '@controllers/auth.ctrl'

export const authRouter = (authModel: AuthModel): Router => {
  const authRouter = Router()
  const authCtrl = authController(authModel)

  authRouter.post('/', authCtrl.signIn)
  return authRouter
}
