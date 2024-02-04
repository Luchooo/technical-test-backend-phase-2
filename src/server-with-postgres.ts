import { createApp } from './index'
import { videoModel } from '@models/postgres/videos.model'
import { userModel } from '@models/postgres/users.model'

export const { app, server } = createApp({ videoModel, userModel })
