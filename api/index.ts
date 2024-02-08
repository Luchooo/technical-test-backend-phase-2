import { createApp } from '../build/index'
import { userModel } from '../build/models/postgres/users.model'
import { videoModel } from '../build/models/postgres/videos.model'

const { app } = createApp({ userModel, videoModel })
export default app
