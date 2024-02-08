import { usePrisma } from '@utils/prismaClient'
import { print } from '@config/logger'
import type { Video, User } from '@my-types/*'
import { hashPassword } from '@utils/hashPassword'

export const createUsers = async (
  usersMock: User[],
  showConsoleMsg: boolean
): Promise<void> => {
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
    if (showConsoleMsg) print.info('Users inserted successfully')
  } catch (e) {
    print.error(e)
    throw new Error('Failed to insert users')
  }
}

export const createVideos = async (
  videosMock: Video[],
  showConsoleMsg: boolean
): Promise<void> => {
  try {
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
    if (showConsoleMsg) print.info('Videos inserted successfully')
  } catch (e) {
    print.error(e)
    throw new Error('Failed to insert videos')
  }
}
