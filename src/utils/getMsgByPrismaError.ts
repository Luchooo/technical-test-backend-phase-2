import type { Prisma } from '@prisma/client'
import { print } from '@config/logger'

export const getMsgByPrismaError = (
  e: Prisma.PrismaClientKnownRequestError
): string => {
  // Unique fields
  if (e.code === 'P2002') {
    if (
      e.meta !== undefined &&
      e.meta.target !== undefined &&
      Array.isArray(e.meta.target)
    ) {
      return e.meta.target
        .map((field: string) => `The ${field} it's already taken`)
        .join(' or ')
    }
  }

  print.error('Uncaught msg from Prisma Client ' + e.message)
  return e.message
}
