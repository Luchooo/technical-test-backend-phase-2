import request from 'supertest'
import app from '../index'

describe('GET /api/emojis', () => {
  it('responds with a json message a', (done) => {
    request(app)
      .get('/api/emojis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, ['😀', '✔️'], done)
  })
})
