import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { find, noop } from 'lodash'

import { useGlobalStore } from '../../_store'
import { Page, Sidebar, Viewport } from '../../components/layout'
import ControlPanel from '../../components/controlPanel'
import Task from '../../components/task'
import Activity from '../../components/widgets/activity'

const TaskPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const tasks = useGlobalStore((api) => api.data.tasks.items)
  const task = find(tasks, { id })

  if (!task) {
    return (
      <Page title={`TASK_NOT_FOUND`}>
        <ControlPanel tab='tasks' />
        <Viewport>TASK NOT FOUND</Viewport>
      </Page>
    )
  }

  return (
    <Page title={`TASK_ID ${task.id}`}>
      <ControlPanel tab='tasks' />
      <Viewport>
        <Task task={task} update={noop} />
        <Activity history={[]} onComment={noop} />
      </Viewport>
    </Page>
  )
}

export default TaskPage
