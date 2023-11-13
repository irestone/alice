import { Layout } from '@app/layout'
import { Collection } from '@app/collection'

export default function TasksPage() {
  return (
    <Layout title='Tasks'>
      <Collection category='tasks' />
    </Layout>
  )
}
