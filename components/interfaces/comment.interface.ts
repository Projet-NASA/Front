import type { User } from './user.interface'

export interface Comment {
  id: string
  createdAt: string
  message: string
  postId: string
  user: User
}
