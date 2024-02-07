/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Response, Request } from 'express'
import jwt from 'jsonwebtoken'
import constants from '../constants'

export const requireAuthen = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | undefined => {
  const auth = req.get('authorization')

  if (auth === undefined) {
    return res.status(401).json({
      message: constants.ERROR_MESSAGE.UN_AUTHORIZED
    })
  }

  let token = null
  if (auth.toLocaleLowerCase().startsWith('bearer')) {
    token = auth.substring(7)
  }

  if (constants.TOKEN_SETTING.SECRET === undefined) {
    return res.status(500).json({
      message: constants.ERROR_MESSAGE.JWT_SECRET_MISSING
    })
  }
  if (token === null) {
    return res.status(401).json({
      message: constants.ERROR_MESSAGE.UN_AUTHORIZED
    })
  }
  const { id } = jwt.verify(
    token,
    constants.TOKEN_SETTING.SECRET
  ) as jwt.JwtPayload

  req.user = {
    id
  }
  next()
  return undefined
}
