import { supabase } from '../../utils/supabase'

export default async (
  req: any,
  res: {
    status: (arg0: number) => {
      (): any
      new (): any
      json: { (arg0: any[]): any; new (): any }
    }
  }
) => {
  const { data, error } = await supabase.from('posts').select('*')

  if (error) {
    // return res.status(500).json({ error: error.message })
  }

  return res.status(200).json(data)
}
