import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import ControlPanel from '../../components/controlPanel'
import Viewport from '../../components/viewport'

const Page = dynamic(() => import('../../components/page'), { ssr: false })

const Index: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  return (
    <Page title={`FILES_DASHBOARD`}>
      <ControlPanel />
      <Viewport>
        <p>files dashboard</p>
      </Viewport>
    </Page>
  )
}

export default Index