import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { find, noop } from 'lodash'

import Page from '../../components/page'
import ControlPanel from '../../components/controlPanel'
import Viewport from '../../components/viewport'
import File from '../../components/file'
import Sidebar from '../../components/sidebar'
import Documents from '../../components/widgets/documents'
import Activity from '../../components/activity'
import { useGlobalStore } from '../../store'

// const Page = dynamic(() => import('../../components/page'), { ssr: false })

const FilePage: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const files = useGlobalStore((api) => api.files)
  const file = find(files, { id })

  if (!file) {
    return (
      <Page title={`FILE_NOT_FOUND`}>
        <ControlPanel contentType='files' />
        <Viewport>FILE NOT FOUND</Viewport>
      </Page>
    )
  }

  return (
    <Page title={`FILE_ID ${file.id}`}>
      <ControlPanel contentType='files' />
      <Viewport>
        <File {...file} onChange={noop} />
        <Activity history={[]} onComment={noop} />
      </Viewport>
      <Sidebar>
        <Documents />
      </Sidebar>
    </Page>
  )
}

export default FilePage
