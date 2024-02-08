/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { type VideoModel } from '@my-types/*'
import { videoController } from '@controllers/videos.ctrl'
import { requireAuthen } from '@App/middleware/require-authen.middleware'

export const videosRouter = (videosModel: VideoModel): Router => {
  const videosRouter = Router()
  const videoCtrl = videoController(videosModel)

  videosRouter.get('/public', videoCtrl.getAllPublic)
  videosRouter.get('/', requireAuthen, videoCtrl.getAll)
  videosRouter.get('/:id', requireAuthen, videoCtrl.getById)
  videosRouter.post('/', requireAuthen, videoCtrl.create)
  videosRouter.delete('/:id', requireAuthen, videoCtrl.delete)
  videosRouter.put('/:id', requireAuthen, videoCtrl.update)
  return videosRouter
}
