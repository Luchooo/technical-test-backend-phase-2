import { usePrisma } from '@utils/prismaClient'
import { type VideoSeed, videos } from './videos.mock'
import { users } from './users.mock'
import { print } from '@config/logger'
import { type User } from '@my-types/*'

const main = async ({
  videos,
  users
}: {
  videos: VideoSeed[]
  users: User[]
}): Promise<void> => {
  try {
    for (const user of users) {
      await usePrisma.users.upsert({
        where: { id: user.id },
        update: {},
        create: {
          id: user.id,
          username: user.username,
          email: user.email,
          passwordHash: user.password,
          avatarUrl: user.avatarUrl
        }
      })
    }
    print.info('Users inserted successfully')

    for (const videoData of videos) {
      await usePrisma.videos.upsert({
        where: { id: videoData.id },
        update: {},
        create: {
          id: videoData.id,
          title: videoData.title,
          description: videoData.description,
          url: videoData.url,
          isPublic: videoData.isPublic,
          usersId: videoData.usersId
        }
      })
    }

    print.info('Videos inserted successfully')
  } catch (e) {
    print.error(e)
    throw new Error('Failed to insert videos')
  }
}

main({ videos, users })
  .then(async () => {
    await usePrisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await usePrisma.$disconnect()
    process.exit(1)
  })
