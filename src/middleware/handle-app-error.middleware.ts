import type { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'joi'
import { print } from '@config/logger'
import ErrorKnow from '@utils/errorKnow'
import { Prisma } from '@utils/prismaClient'
import { getMsgByPrismaError } from '@utils/getMsgByPrismaError'
import { JsonWebTokenError } from 'jsonwebtoken'
import constants from '@App/constants'

const handleValidationError = (error: ValidationError, res: Response): void => {
  print.error('Error validation schema: ' + error.message)
  res.status(400).json({
    error: error.message,
    fields: error.details[0].path
  })
}

const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError,
  res: Response
): void => {
  const msg = getMsgByPrismaError(error)
  print.error('Error with prisma client: ' + msg)
  res.status(400).json({ error: msg })
}

const handleErrorKnow = (error: ErrorKnow, res: Response): void => {
  print.error('Error know: ' + error.message)
  res.status(400).json({ error: error.message })
}

const handleJWTError = (error: JsonWebTokenError, res: Response): void => {
  print.error('Error jwt: ' + error.message)
  res.status(401).json({ error: constants.ERROR_MESSAGE.UN_AUTHORIZED })
}

const handleDefaultError = (error: Error, res: Response): void => {
  print.error('Error unknow: ' + error.message)
  res.status(500).end()
}

const chooseHandler = (error: Error, res: Response): void => {
  if (error instanceof ValidationError) {
    handleValidationError(error, res)
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    handlePrismaError(error, res)
  } else if (error instanceof ErrorKnow) {
    handleErrorKnow(error, res)
  } else if (error instanceof JsonWebTokenError) {
    handleJWTError(error, res)
  } else {
    handleDefaultError(error, res)
  }
}

export const handleAppError = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  chooseHandler(error, res)
}
