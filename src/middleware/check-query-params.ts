/* eslint-disable @typescript-eslint/no-explicit-any */
import constants from '@App/constants'
import type { NextFunction, Response, Request } from 'express'

export const checkQueryParams = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | undefined => {
  const { userId } = req.query
  const authenticatedUserId = req.user.id

  if (userId !== undefined && userId !== authenticatedUserId) {
    return res.status(403).json({
      error: constants.ERROR_MESSAGE.FORBIDDEN
    })
  }

  next()
  return undefined
}
