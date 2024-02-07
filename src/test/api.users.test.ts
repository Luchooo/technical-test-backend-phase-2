import request from 'supertest'
import { app, server } from '../server-with-postgres'
import { usePrisma } from '@utils/prismaClient'
import { hashPassword } from '@utils/hashPassword'
import { getUsers, newUser, initialUser } from './helper.users'

afterAll(async () => {
  server.close()
  await usePrisma.$disconnect()
})

beforeEach(async () => {
  await usePrisma.users.deleteMany({})
  const passwordHash = await hashPassword('root')
  initialUser.passwordHash = passwordHash
  await usePrisma.users.create({
    data: initialUser
  })
})

describe('POST /api/users', () => {
  it('create a new user', async () => {
    const usersDBStart = await getUsers()
    await request(app)
      .post('/api/users')
      .send(newUser)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    const usersDBAfter = await getUsers()
    expect(usersDBAfter).toHaveLength(usersDBStart.length + 1)
    const usernames = usersDBAfter.map((user) => user.username)
    expect(usernames).toContain(newUser.username)
  })

  it('create a user already taken', async () => {
    const newUser = {
      username: 'luchooo1234',
      email: 'luchooo123@gmail.com',
      password: 'root123',
      avatarUrl: 'https://nobita.me/data.com'
    }
    await request(app)
      .post('/api/users')
      .send(newUser)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body.error).toMatch(/email or username already taken/i)
      })
  })
})
