import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SFC } from '@common/styles'
import { useStorage } from '@common/storage'
import lodash, { filter, sortBy } from 'lodash'
import { File, ActivityType } from '@common/types'
import { Button } from '@lib/buttons'
import { Mobile } from '@lib/mobile'
import { FileCard, TaskCard } from '@lib/cards'
import { Section } from '@lib/sections'
import { useSettings } from '@common/settings'

export const Dashboard: SFC = () => {
  const router = useRouter()
  const storage = useStorage((s) => ({
    activity: s.collections.activity,
    files: s.collections.files,
    tasks: s.collections.tasks,
    get: s.get,
    upd: s.upd,
    del: s.del,
  }))
  const filesSettings = useSettings('files')
  const tasksSettings = useSettings('tasks')

  const [moreRecentFiles, setMoreRecentFiles] = useState(false)
  const allRecentFiles = lodash
    .chain(storage.activity)
    .filter({ type: ActivityType.fileSeen, by: 'alice' })
    .map((act) => storage.get<File>('files', act.payload))
    .value()
  const recentFiles = moreRecentFiles ? allRecentFiles : allRecentFiles.slice(0, 5)
  const pinnedFiles = sortBy(filter(storage.files, 'pinned'), filesSettings.sorting)
  const pinnedTasks = sortBy(filter(storage.tasks, 'pinned'), tasksSettings.sorting)

  return (
    <Mobile.Root>
      <Mobile.Head title='Alice MS' />
      <Mobile.Body>
        <Section
          title='Последние файлы'
          stickyHead={false}
          actions={[
            <Button key='history' icon='history' colors={{ preset: 'no_bg', color: 'cyan' }}>
              История
            </Button>,
          ]}
        >
          {recentFiles.map((file) => (
            <FileCard
              key={file.id}
              item={file}
              updateItem={(v) => storage.upd('files', file.id, v)}
              deleteItem={() => storage.del('files', file.id)}
              variant='condensed'
            />
          ))}
          {!moreRecentFiles && (
            <Button
              colors={{ preset: 'no_bg', color: 'cyan' }}
              onClick={() => setMoreRecentFiles(true)}
            >
              развернуть
            </Button>
          )}
        </Section>
        <Section
          title='Закрепленные файлы'
          stickyHead={false}
          actions={[
            <Button
              key='files'
              icon='link'
              colors={{ preset: 'no_bg', color: 'cyan' }}
              onClick={() => router.push('/files')}
            >
              Файлы
            </Button>,
          ]}
        >
          {pinnedFiles.map((file) => (
            <FileCard
              key={file.id}
              item={file}
              updateItem={(v) => storage.upd('files', file.id, v)}
              deleteItem={() => storage.del('files', file.id)}
            />
          ))}
        </Section>
        <Section
          title='Закрепленные задания'
          stickyHead={false}
          actions={[
            <Button
              key='tasks'
              icon='link'
              colors={{ preset: 'no_bg', color: 'cyan' }}
              onClick={() => router.push('/tasks')}
            >
              Задания
            </Button>,
          ]}
        >
          {pinnedTasks.map((file) => (
            <TaskCard
              key={file.id}
              item={file}
              updateItem={(v) => storage.upd('tasks', file.id, v)}
              deleteItem={() => storage.del('tasks', file.id)}
            />
          ))}
        </Section>
      </Mobile.Body>
    </Mobile.Root>
  )
}
