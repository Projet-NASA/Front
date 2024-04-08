export interface Post {
  id: string
  createdAt: string
  message: string
  like: number
  userliked: { userId: string }[]
}
