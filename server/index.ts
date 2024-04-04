import { getPosts } from '../services/db'

export default async function handler(req: any, res: { json: (arg0: any) => any }) {
  const posts = await getPosts()
  return res.json(posts)
}