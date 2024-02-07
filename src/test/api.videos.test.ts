import { randomUUID } from 'node:crypto'
import request from 'supertest'
import { app, server } from '../server-with-postgres'
import { usePrisma } from '@utils/prismaClient'
import { getPublicVideos } from './helper.videos'
import { type Video } from '@my-types/*'
import { initializeDB } from '@App/prisma/db/seed'
import { users } from '@App/prisma/db/users.mock'
import { videos } from '@App/prisma/db/videos.mock'

afterAll(async () => {
  server.close()
  await usePrisma.$disconnect()
})

beforeEach(async () => {
  await usePrisma.users.deleteMany({})
  await usePrisma.videos.deleteMany({})
  await initializeDB({ users, videos })
})

describe('GET /api/videos/public', () => {
  it('responds with a json message', async () => {
    const res = await request(app)
      .get('/api/videos/public')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body).toHaveLength(getPublicVideos(res.body).length)
  })

  it('find video about cat Video Maria', async () => {
    const res = await request(app).get('/api/videos/public')
    const videos = res.body.map((video: Video) => video.title)
    expect(videos).toContain('Test dog video maria public')
  })
})

describe('POST /api/videos', () => {
  it('create a video responds with json', async () => {
    const newVideo = {
      title: 'HTTP cat 🍰',
      description: '🎢 video from http extension',
      url: 'https://www.youtube.com/shorts/lrajbjOPWjo',
      isPublic: true
    }
    await request(app)
      .post('/api/videos')
      .send(newVideo)
      .expect('Content-Type', /json/)
      .expect(201)

    const res = await request(app).get('/api/videos/public')
    const videos = res.body.map((video: Video) => video.title)
    expect(videos).toContain(newVideo.title)
    expect(res.body).toHaveLength(getPublicVideos(res.body).length)
  })

  it('failed to create a new video missing properties', async () => {
    const newVideo = {
      title: 'Test video'
    }
    await request(app)
      .post('/api/videos')
      .send(newVideo)
      .expect('Content-Type', /json/)
      .expect(400)
  })
})

describe('GET /api/videos', () => {
  it('get a single video', async () => {
    const res = await request(app).get('/api/videos/public')
    const { id } = res.body[0]

    await request(app)
      .get(`/api/videos/${id}`)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  })

  it('get a single video', async () => {
    const id = randomUUID()
    const res = await request(app)
      .get(`/api/videos/${id}`)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    expect(res.body.error).toMatch(/video not found/i)
  })
})

describe('PUT /api/videos', () => {
  it('update a video', async () => {
    const res = await request(app).get('/api/videos/public')
    const { id } = res.body[0]

    const updateVideo = {
      title: 'Title from test jest',
      description: 'video from tests jest'
    }
    await request(app)
      .put(`/api/videos/${id}`)
      .send(updateVideo)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    const res2 = await request(app).get(`/api/videos/${id}`)
    expect(res2.body.title).toEqual(updateVideo.title)
    expect(res2.body.description).toEqual(updateVideo.description)
  })

  it('update a video with random id', async () => {
    const id = randomUUID()
    await request(app)
      .put(`/api/videos/${id}`)
      .send({})
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body.error).toMatch(/record to update not found/i)
      })
  })
})

describe('DELETE /api/videos', () => {
  it('delete a video', async () => {
    const res = await request(app).get('/api/videos/public')
    const { id } = res.body[0]

    await request(app)
      .delete(`/api/videos/${id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toMatch(/video deleted/i)
      })
  })

  it('delete a video with random id', async () => {
    const id = randomUUID()
    await request(app)
      .delete(`/api/videos/${id}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.error).toMatch(/record to delete does not exist/i)
      })
  })
})
