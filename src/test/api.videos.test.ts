import { randomUUID } from 'node:crypto'
import request from 'supertest'
import { app, server } from '../server-with-postgres'
import { usePrisma } from '@utils/prismaClient'
import {
  getPublicVideos,
  user,
  newVideo,
  getVideoByUserId
} from './helper.videos'
import type { Video } from '@my-types/*'
import { usersMock } from '@App/prisma/db/users.mock'
import { videosMock } from '@App/prisma/db/videos.mock'
import { createUsers, createVideos } from '@App/prisma/db/helper.seed'

afterAll(async () => {
  server.close()
  await usePrisma.$disconnect()
})

beforeEach(async () => {
  await usePrisma.videos.deleteMany({})
  await usePrisma.users.deleteMany({})
  await createUsers(usersMock, false)
  await createVideos(videosMock, false)
})

describe('GET /api/videos/public', () => {
  it('responds with a json message', async () => {
    const res = await request(app)
      .get('/api/videos/public')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveLength(getPublicVideos(videosMock).length)
  })

  it('find video about cat Video Maria', async () => {
    const res = await request(app).get('/api/videos/public')
    const videos = res.body.map((video: Video) => video.title)
    expect(videos).toContain('Dog video maria public')
  })
})

describe('POST /api/videos', () => {
  it('create a video responds with json', async () => {
    const resSignIn = await request(app).post('/api/users/sign-in').send(user)
    const { token } = resSignIn.body

    await request(app)
      .post('/api/videos')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newVideo)
      .expect('Content-Type', /json/)
      .expect(201)

    const res = await request(app).get('/api/videos/public')
    const videos = res.body.map((video: Video) => video.title)
    expect(videos).toContain(newVideo.title)
  })

  it('failed to create a new video missing properties', async () => {
    const resSignIn = await request(app).post('/api/users/sign-in').send(user)
    const { token } = resSignIn.body

    const newVideo = {
      title: 'Test video'
    }
    await request(app)
      .post('/api/videos')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newVideo)
      .expect('Content-Type', /json/)
      .expect(400)
      .then((res) => {
        expect(res.body.error).toMatch(/is required/i)
      })
  })
})

describe('GET /api/videos', () => {
  it('get a videos for user registrate', async () => {
    const resSignIn = await request(app).post('/api/users/sign-in').send(user)
    const { token } = resSignIn.body
    const res = await request(app)
      .get('/api/videos')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveLength(videosMock.length)
  })

  it('get a videos for user registrate without token', async () => {
    await request(app)
      .get('/api/videos')
      .expect('Content-Type', /json/)
      .expect(401)
      .then((res) => {
        expect(res.body.error).toMatch(/please sign in to continue/i)
      })
  })

  it('get a single video with id mistake', async () => {
    const resSignIn = await request(app).post('/api/users/sign-in').send(user)
    const { token } = resSignIn.body

    const id = randomUUID()
    const res = await request(app)
      .get(`/api/videos/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    expect(res.body.error).toMatch(/video not found/i)
  })
})

describe('PUT /api/videos', () => {
  it('update a own video', async () => {
    const resSignIn = await request(app).post('/api/users/sign-in').send(user)
    const { token, id: userId } = resSignIn.body
    const video = getVideoByUserId(userId, videosMock)

    const updateVideo = {
      title: 'Title from test jest',
      description: 'video from tests jest'
    }
    await request(app)
      .put(`/api/videos/${video.id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(updateVideo)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    const res2 = await request(app)
      .get(`/api/videos/${video.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res2.body.title).toEqual(updateVideo.title)
    expect(res2.body.description).toEqual(updateVideo.description)
  })

  it('update a video with random id', async () => {
    const resSignIn = await request(app).post('/api/users/sign-in').send(user)
    const { token } = resSignIn.body

    const id = randomUUID()
    await request(app)
      .put(`/api/videos/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body.error).toMatch(/video not found/i)
      })
  })
})

describe('DELETE /api/videos', () => {
  it('delete a own video', async () => {
    const resSignIn = await request(app).post('/api/users/sign-in').send(user)
    const { token, id: userId } = resSignIn.body
    const video = getVideoByUserId(userId, videosMock)

    await request(app)
      .delete(`/api/videos/${video.id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toMatch(/video deleted/i)
      })
  })

  it('delete a video without authorization header', async () => {
    const idVideo = randomUUID()
    await request(app).delete(`/api/videos/${idVideo}`).expect(401)
  })

  it('delete a video with random id', async () => {
    const resSignIn = await request(app).post('/api/users/sign-in').send(user)
    const { token } = resSignIn.body

    const id = randomUUID()
    await request(app)
      .delete(`/api/videos/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.error).toMatch(/video not found/i)
      })
  })
})
