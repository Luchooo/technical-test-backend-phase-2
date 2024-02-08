import type { UserModel } from './types/user.types'
import type { VideoModel } from './types/video.types'

export * from './types/user.types'
export * from './types/video.types'

export interface Models {
  userModel: UserModel
  videoModel: VideoModel
}

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
      }
    }
  }
}
