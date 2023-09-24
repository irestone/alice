import { useEffect } from 'react'
import { useRouter } from 'next/router'

const HomePage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/files')
  }, [router])
}

export default HomePage
