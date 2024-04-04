import { supabase } from '../utils/supabase'

export async function getPosts() {
  const { data, error } = await supabase.from('posts').select('*')
  if (error) throw error
  return data
}