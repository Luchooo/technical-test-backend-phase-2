import type { NextFunction, Request, Response } from 'express'

export interface LoggedIn {
  id: string
  username: string
}

export interface SignInPayload {
  email: string
  password: string
}

export interface AuthModel {
  signIn: ({ payload }: { payload: SignInPayload }) => Promise<LoggedIn>
}

export interface AuthController {
  signIn: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
