import type { User } from './user.interface'

export interface Post {
  id: string
  createdAt: string
  message: string
  like: number
  userliked: { userId: string }[]
  user: User
  comments: Comment[]
}
