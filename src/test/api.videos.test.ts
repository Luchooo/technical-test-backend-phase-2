import request from 'supertest'
import { app, server } from '../server-with-local'
import { Video } from '@my-types/*'

afterAll(() => {
  server.close()
})

describe('GET /api/videos/public', () => {
  it('responds with a json message', async () => {
    await request(app)
      .get('/api/videos/public')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  })

  it('there are two videos public', async () => {
    const response = await request(app).get('/api/videos/public')
    expect(response.body).toHaveLength(2)
  })

  it('find video about cat Video Maria', async () => {
    const response = await request(app).get('/api/videos/public')
    const videos = response.body.map((video: Video) => video.title)
    expect(videos).toContain('Dog video maria public')
  })
})

describe('GET /api/videos', () => {
  it('get a single video', async () => {
    await request(app)
      .get('/api/videos/879916e3-76f2-438f-b987-8a7bcae45963')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  })

  it('get a single video', async () => {
    await request(app)
      .get('/api/videos/id-fail')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
  })
})

describe('POST /api/videos', () => {
  it('create a video responds with json', async () => {
    const newVideo = {
      title: 'HTTP cat',
      description: 'video from http extension',
      url: 'https://www.youtube.com/shorts/lrajbjOPWjo',
      isPublic: true
    }
    await request(app)
      .post('/api/videos')
      .send(newVideo)
      .expect('Content-Type', /json/)
      .expect(200)

    const response = await request(app).get('/api/videos/public')
    expect(response.body).toHaveLength(3)
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

describe('PUT /api/videos', () => {
  it('update a video', async () => {
    const updateVideo = {
      title: 'Title from test',
      description: 'video from tests'
    }
    await request(app)
      .put('/api/videos/879916e3-76f2-438f-b987-8a7bcae45963')
      .send(updateVideo)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    const res = await request(app).get(
      '/api/videos/879916e3-76f2-438f-b987-8a7bcae45963'
    )

    expect(res.body.title).toEqual('Title from test')
    expect(res.body.description).toEqual('video from tests')
  })

  it('update a unknow video', async () => {
    await request(app)
      .put('/api/videos/unknow')
      .send({})
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body.error).toMatch(/video not found/i)
      })
  })
})

describe('DELETE /api/videos', () => {
  it('delete a video', async () => {
    const res = await request(app).delete(
      '/api/videos/879916e3-76f2-438f-b987-8a7bcae45963'
    )
    expect(res.status).toEqual(200)
    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.body['message']).toMatch(/video deleted/i)
  })

  it('delete a unknow video', async () => {
    const res = await request(app).delete('/api/videos/unknow')
    expect(res.status).toEqual(400)
    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.body['error']).toMatch(/video not found/i)
  })
})
