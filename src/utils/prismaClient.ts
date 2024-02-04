import { PrismaClient } from '@prisma/client'
import { PrismaClient as PrismaClientTest } from '../../prisma/db-test/generated/test-client'

export const prisma =
  process.env.NODE_ENV === 'test' ? new PrismaClientTest() : new PrismaClient()
