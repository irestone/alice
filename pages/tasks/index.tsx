import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import Page from '../../components/page'
import ControlPanel from '../../components/controlPanel'
import Viewport from '../../components/viewport'

const TasksPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  return (
    <Page title={`TASKS_DASHBOARD`}>
      <ControlPanel contentType='tasks' />
      <Viewport>
        <p>tasks dashboard</p>
      </Viewport>
    </Page>
  )
}

export default TasksPage
