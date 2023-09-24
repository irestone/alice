import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { find, noop } from 'lodash'

import Page from '../../components/page'
import ControlPanel from '../../components/controlPanel'
import Viewport from '../../components/viewport'
import Task from '../../components/task'
import Activity from '../../components/activity'
import { useGlobalStore } from '../../store'

const TaskPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const tasks = useGlobalStore((api) => api.tasks)
  const task = find(tasks, { id })

  if (!task) {
    return (
      <Page title={`TASK_NOT_FOUND`}>
        <ControlPanel contentType='tasks' />
        <Viewport>TASK NOT FOUND</Viewport>
      </Page>
    )
  }

  return (
    <Page title={`TASK_ID ${task.id}`}>
      <ControlPanel contentType='tasks' />
      <Viewport>
        <Task {...task} onChange={noop} />
        <Activity history={[]} onComment={noop} />
      </Viewport>
    </Page>
  )
}

export default TaskPage
