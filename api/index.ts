import { createApp } from '../src/index'
import { userModel, videoModel } from '../src/models/postgres/index.model'

const { app } = createApp({ userModel, videoModel })
export default app
