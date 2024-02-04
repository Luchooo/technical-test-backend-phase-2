import { PrismaClient } from '@prisma/client'
import { videos } from '@models/local-file-system/videos/videos.mock'
import { print } from '@config/logger'

const prisma = new PrismaClient()

const main = async (): Promise<void> => {
  try {
    for (const videoData of videos) {
      await prisma.videos.upsert({
        where: { id: videoData.id },
        update: {},
        create: {
          id: videoData.id,
          title: videoData.title,
          description: videoData.description,
          url: videoData.url,
          isPublic: videoData.isPublic
        }
      })
    }

    print.info('Videos inserted successfully')
  } catch (e) {
    print.error(e)
    throw new Error('Failed to insert videos')
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
