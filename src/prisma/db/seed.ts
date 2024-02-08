import { usePrisma } from '@utils/prismaClient'
import type { Video, User } from '@my-types/*'
import { usersMock } from './users.mock'
import { videosMock } from './videos.mock'
import { createUsers, createVideos } from './helper.seed'

export const initializeDB = async (
  createUsersFn: (usersMock: User[], showConsoleMsg: boolean) => Promise<void>,
  createVideosFn: (
    videosMock: Video[],
    showConsoleMsg: boolean
  ) => Promise<void>,
  usersMock: User[],
  videosMock: Video[],
  showConsoleMsg: boolean
): Promise<void> => {
  try {
    await createUsersFn(usersMock, showConsoleMsg)
    await createVideosFn(videosMock, showConsoleMsg)
    await usePrisma.$disconnect()
  } catch (e) {
    console.error(e)
    await usePrisma.$disconnect()
  }
}

void initializeDB(createUsers, createVideos, usersMock, videosMock, true)
