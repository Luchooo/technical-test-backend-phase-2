import type { UserModel } from './types/user.types'
import type { AuthModel } from './types/auth.types'
import type { VideoModel } from './types/video.types'

export * from './types/user.types'
export * from './types/auth.types'
export * from './types/video.types'

export interface Models {
  authModel: AuthModel
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
