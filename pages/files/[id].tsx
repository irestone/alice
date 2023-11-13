import { Layout } from '@app/layout'
import { Collection } from '@app/collection'
import { useRouter } from 'next/navigation'

export default function FilePage() {
  const router = useRouter()
  return (
    <Layout title='File'>
      <Collection category='files' item={router.query.id as string} />
    </Layout>
  )
}
