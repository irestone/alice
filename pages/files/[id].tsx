import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { find, noop } from 'lodash'

import { useGlobalStore } from '../../_store'
import { Page, Sidebar, Viewport } from '../../components/layout'
import ControlPanel from '../../components/controlPanel'
import File from '../../components/file'
import Activity from '../../components/widgets/activity'
import Documents from '../../components/widgets/documents'

// const Page = dynamic(() => import('../../components/page'), { ssr: false })

const FilePage: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const files = useGlobalStore((s) => s.data.files.items)
  const file = find(files, { id })

  if (!file) {
    return (
      <Page title={`FILE_NOT_FOUND`}>
        <ControlPanel tab='files' />
        <Viewport>FILE NOT FOUND</Viewport>
      </Page>
    )
  }

  return (
    <Page title={`FILE_ID ${file.id}`}>
      <ControlPanel tab='files' />
      <Viewport>
        <File file={file} update={noop} />
        <Activity history={[]} onComment={noop} />
      </Viewport>
      <Sidebar>
        <Documents />
      </Sidebar>
    </Page>
  )
}

export default FilePage
