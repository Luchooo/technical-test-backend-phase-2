import request from 'supertest'
import { app, server } from '../server-with-postgres'
import { usePrisma } from '@utils/prismaClient'
import {
  getUsers,
  userDB,
  newUser,
  validateRes,
  allowedProperties
} from './helper.users'
import { createUsers } from '@App/prisma/db/helper.seed'
import { usersMock } from '@App/prisma/db/users.mock'

afterAll(async () => {
  server.close()
  await usePrisma.$disconnect()
})

beforeEach(async () => {
  await usePrisma.videos.deleteMany({})
  await usePrisma.users.deleteMany({})
  await createUsers(usersMock, true)
})

describe('POST /api/users/sign-in', () => {
  it('sign-in user', async () => {
    await request(app)
      .post('/api/users/sign-in')
      .send(userDB)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  })

  it('validate props to sign-in user response api', async () => {
    const res = await request(app)
      .post('/api/users/sign-in')
      .send(userDB)
      .expect('Content-Type', /json/)
      .expect(200)

    const { totalProps, extraProps } = validateRes(res.body)
    expect(totalProps).toHaveLength(allowedProperties.length)
    expect(extraProps).toHaveLength(0)
  })

  it('sign-in user missing email and password', async () => {
    await request(app)
      .post('/api/users/sign-in')
      .send({})
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then((res) => {
        expect(res.body.error).toMatch(/\"email\" is required/i)
      })
  })

  it('sign-in user with password smaller than 8 digits', async () => {
    await request(app)
      .post('/api/users/sign-in')
      .send({ ...userDB, password: '123' })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then((res) => {
        expect(res.body.error).toMatch(/\"password\" length must be/i)
      })
  })
})

describe('POST /api/users/sign-up', () => {
  it('create a new user', async () => {
    const usersDBStart = await getUsers()
    await request(app)
      .post('/api/users/sign-up')
      .send(newUser)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    const usersDBAfter = await getUsers()
    expect(usersDBAfter).toHaveLength(usersDBStart.length + 1)
    const usernames = usersDBAfter.map((user) => user.username)
    expect(usernames).toContain(newUser.username)
  })

  it('validate response to sign-up user', async () => {
    const res = await request(app)
      .post('/api/users/sign-up')
      .send(newUser)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    const { totalProps, extraProps } = validateRes(res.body)
    expect(totalProps).toHaveLength(allowedProperties.length)
    expect(extraProps).toHaveLength(0)
  })

  it('create a user already taken', async () => {
    await request(app)
      .post('/api/users/sign-up')
      .send({
        ...userDB,
        username: 'myuser',
        password: 'root1234',
        avatarUrl: 'http://example.com'
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body.error).toMatch(/already taken/i)
      })
  })
})
