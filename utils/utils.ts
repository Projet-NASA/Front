import { useRouter } from 'vue-router'

export function checkTokenAndRedirect() {
  const router = useRouter()
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  if (token === null || userId === null) {
    console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem('userId'))
    router.push('/login')
  }
}
