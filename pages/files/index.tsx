import { Layout } from '@app/layout'
import { Collection } from '@app/collection'

export default function FilesPage() {
  return (
    <Layout title='Files'>
      <Collection category='files' />
    </Layout>
  )
}
