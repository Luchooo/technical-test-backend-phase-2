import { PrismaClient } from '@prisma/client'

const datasourceUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL

export const prisma = new PrismaClient({
  datasourceUrl
})
