import type { NextFunction, Request, Response } from 'express'
import type { VideoModel } from '@my-types/*'
import { videoController } from '@controllers/videos/videos.ctrl'

export const handleGetAllVideos =
  (videosModel: VideoModel) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query
    const videoCtrl = videoController(videosModel)

    if (userId !== undefined) {
      void videoCtrl.getAllByUserId(req, res, next)
    } else {
      void videoCtrl.getAll(req, res, next)
    }
  }
