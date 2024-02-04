/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Router } from 'express'
import { videoController } from '@controllers/videos.ctrl'
import { type VideoModel } from '@my-types/*'

export const createVideosRouter = (videosModel: VideoModel): Router => {
  const videosRouter = express.Router()
  const videoCtrl = videoController(videosModel)

  videosRouter.get('/public', videoCtrl.getAllPublic)
  videosRouter.get('/', videoCtrl.getAll)
  videosRouter.get('/:id', videoCtrl.getById)
  videosRouter.post('/', videoCtrl.create)
  videosRouter.delete('/:id', videoCtrl.delete)
  videosRouter.put('/:id', videoCtrl.update)
  return videosRouter
}
