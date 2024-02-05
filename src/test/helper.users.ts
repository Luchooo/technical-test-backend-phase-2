import { type CreateUser, type UserDB } from '@my-types/*'
import { usePrisma } from '@utils/prismaClient'

export const getUsers = async (): Promise<UserDB[]> => {
  return await usePrisma.users.findMany({})
}

export const newUser: CreateUser = {
  username: 'maria123',
  email: 'maria123@gmail.com',
  password: 'root123',
  avatarUrl: 'https://nobita.me/data.com'
}

export const initialUser = {
  username: 'luchooo123',
  email: 'luchooo123@gmail.com',
  passwordHash: '',
  avatarUrl: 'https://nobita.me/data/resource_icons/0/86.jpg'
}
