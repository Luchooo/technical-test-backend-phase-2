import { usePrisma } from '@utils/prismaClient'
import { videosMock } from './videos.mock'
import { usersMock } from './users.mock'
import { print } from '@config/logger'
import type { Video, User } from '@my-types/*'
import { hashPassword } from '@utils/hashPassword'

export const initializeDB = async ({
  videosMock,
  usersMock
}: {
  videosMock: Video[]
  usersMock: User[]
}): Promise<void> => {
  try {
    for (const user of usersMock) {
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

    for (const videoData of videosMock) {
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

initializeDB({ videosMock, usersMock })
  .then(async () => {
    await usePrisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await usePrisma.$disconnect()
    process.exit(1)
  })
