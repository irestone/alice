import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import ControlPanel from '../../components/controlPanel'
import Viewport from '../../components/viewport'
import File from '../../components/file'
import Sidebar from '../../components/sidebar'
import Documents from '../../components/widgets/documents'
import Activity from '../../components/activity'
import { noop } from 'lodash'

const Page = dynamic(() => import('../../components/page'), { ssr: false })

const Files: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const file = { id }
  const acitvity: any[] = []
  return (
    <Page title={`FILE_ID ${file.id}`}>
      <ControlPanel />
      <Viewport>
        <File {...file} onChange={noop} />
        <Activity history={acitvity} onComment={noop} />
      </Viewport>
      <Sidebar>
        <Documents />
      </Sidebar>
    </Page>
  )
}

export default Files
