import request from 'supertest'
import { app, server } from '../server-with-postgres'

afterAll(() => {
  server.close()
})

describe('GET /api/users', () => {
  it.only('responds with a json message', async () => {
    await request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  })
})
