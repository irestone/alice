import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import Page from '../../components/page'
import ControlPanel from '../../components/controlPanel'
import Viewport from '../../components/viewport'

const FilesPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  return (
    <Page title={`FILES_DASHBOARD`}>
      <ControlPanel contentType='files' />
      <Viewport>
        <p>files dashboard</p>
      </Viewport>
    </Page>
  )
}

export default FilesPage
