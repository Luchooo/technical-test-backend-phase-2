import { Prisma } from '@utils/prismaClient'
import { type Response } from 'express'
export const handleError = async (
  res: Response,
  e: Error | unknown
): Promise<void> => {
  try {
    let errorMsg = 'Unknow error'
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).send({ e })
    } else {
      if (e instanceof Error) errorMsg = e.message
      console.error(errorMsg)
      res.status(400).json({ error: errorMsg })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
