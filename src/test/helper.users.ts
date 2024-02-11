import type {
  UserPayload,
  UserDB,
  SignInPayload,
  ResponseUserTkn
} from '@my-types/*'
import { usePrisma } from '@utils/prismaClient'

export const getUsers = async (): Promise<UserDB[]> => {
  return await usePrisma.users.findMany({})
}

export const newUser: UserPayload = {
  username: 'luchoootest',
  email: 'luchoootest@gmail.com',
  password: '12345678',
  avatarUrl: 'https://gravatar.com/avatar/72220e77f27bfab25cab6629b3b006bf'
}

export const userDB: SignInPayload = {
  email: 'luchooo@gmail.com',
  password: 'luchooo123'
}

export const allowedProperties = [
  'id',
  'username',
  'email',
  'token',
  'avatarUrl'
]

export const validateRes = (
  body: ResponseUserTkn
): { totalProps: string[]; extraProps: string[] } => {
  const extraProps: string[] = []
  const totalProps: string[] = []
  Object.keys(body).forEach((key) => {
    if (allowedProperties.includes(key)) {
      totalProps.push(key)
    } else {
      extraProps.push(key)
    }
  })

  return { totalProps, extraProps }
}
