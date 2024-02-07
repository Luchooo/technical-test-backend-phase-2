import { usePrisma } from '@utils/prismaClient'
import { videos } from './videos.mock'
import { users } from './users.mock'
import { print } from '@config/logger'
import type { Video, User } from '@my-types/*'
import { hashPassword } from '@utils/hashPassword'

export const initializeDB = async ({
  videos,
  users
}: {
  videos: Video[]
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
          passwordHash: await hashPassword(user.password),
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

initializeDB({ videos, users })
  .then(async () => {
    await usePrisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await usePrisma.$disconnect()
    process.exit(1)
  })
