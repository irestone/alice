import { Layout } from '@app/layout'
import { Collection } from '@app/collection'
import { useRouter } from 'next/navigation'

export default function TaskPage() {
  const router = useRouter()
  return (
    <Layout title='Task'>
      <Collection category='tasks' item={router.query.id as string} />
    </Layout>
  )
}
