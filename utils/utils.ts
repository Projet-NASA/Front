import { useRouter } from 'vue-router'

export function checkTokenAndRedirect() {
  const router = useRouter()
  const sessionId = localStorage.getItem('sessionId')

  if( sessionId === null) {
    console.log(sessionId)
    router.push('/login')
  }
}
