import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Index = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/files/1')
  })
}

export default Index

// todo: load files, hydrate state and redirect to the first file
// todo(feature): open multiple files and show them as tabs in viewport (like in editors)
