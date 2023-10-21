import type { NextPage } from 'next'

import { Page, Viewport } from '../../components/layout'
import ControlPanel from '../../components/controlPanel'

const FilesPage: NextPage = () => {
  return (
    <Page title={`FILES_DASHBOARD`}>
      <ControlPanel tab='files' />
      <Viewport>
        <p>files dashboard</p>
      </Viewport>
    </Page>
  )
}

export default FilesPage
