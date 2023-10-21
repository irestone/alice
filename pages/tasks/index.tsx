import type { NextPage } from 'next'

import { Page, Viewport } from '../../components/layout'
import ControlPanel from '../../components/controlPanel'

const TasksPage: NextPage = () => {
  return (
    <Page title={`TASKS_DASHBOARD`}>
      <ControlPanel tab='tasks' />
      <Viewport>
        <p>tasks dashboard</p>
      </Viewport>
    </Page>
  )
}

export default TasksPage
