import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import File from '../../components/file'

const Layout = dynamic(() => import('../../components/layout'), { ssr: false })

const Files: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const file = { id }
  return (
    <Layout title={`FILE_ID ${file.id}`}>
      <File {...file} />
    </Layout>
  )
}

export default Files
