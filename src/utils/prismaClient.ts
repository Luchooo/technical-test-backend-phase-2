import { PrismaClient, Prisma } from '@prisma/client'

const datasourceUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL

const usePrisma = new PrismaClient({
  datasourceUrl
})

export { Prisma, usePrisma }
