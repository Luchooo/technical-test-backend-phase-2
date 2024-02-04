import { createApp } from './index'
import { videoModel } from '@models/local-file-system/videos/videos.model'
import { userModel } from '@models/postgres/users.model'

export const { app, server } = createApp({ videoModel, userModel })
