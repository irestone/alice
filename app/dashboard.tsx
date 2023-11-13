import { useState } from 'react'
import { SFC, styled } from '@common/styles'
import { useStorage } from '@common/storage'
import lodash, { filter, isString, merge, noop } from 'lodash'
import { File, ActivityType } from '@common/types'
import { useRouter } from 'next/navigation'
import { Div } from '@lib/primitives'
import { Button } from '@lib/buttons'
import { Mobile } from '@lib/mobile'
import { FileCard, TaskCard } from '@lib/cards'
import { Section } from '@lib/sections'

const ShowMore: SFC<{
  shown: boolean
  showMore: () => void
  openHistory: () => void
}> = (props) => {
  const text = props.shown ? 'Посмотреть историю' : 'Развернуть'
  const handler = props.shown ? props.openHistory : props.showMore
  return (
    <Div css={{ mt: 8, px: 8, d: 'flex', jc: 'center' }}>
      <Button key='gototasks' colors={{ color: '#999', preset: 'no_bg' }} onClick={handler}>
        {text}
      </Button>
    </Div>
  )
}

export const Dashboard: SFC = () => {
  const router = useRouter()
  const collections = useStorage((s) => ({
    files: s.collections.files,
    tasks: s.collections.tasks,
    activity: s.collections.activity,
    get: s.get,
    upd: s.upd,
    del: s.del,
  }))

  const [moreRecentFiles, setMoreRecentFiles] = useState(false)
  const allRecentFiles = lodash
    .chain(collections.activity)
    .filter({ type: ActivityType.fileSeen, by: 'alice' })
    .map((act) => collections.get<File>('files', act.payload))
    .value()
  const recentFiles = moreRecentFiles ? allRecentFiles : allRecentFiles.slice(0, 5)
  const pinnedFiles = filter(collections.files, 'pinned')
  const pinnedTasks = filter(collections.tasks, 'pinned')

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
              updItem={(v) => collections.upd('files', file.id, v)}
              delItem={() => collections.del('files', file.id)}
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
              updItem={(v) => collections.upd('files', file.id, v)}
              delItem={() => collections.del('files', file.id)}
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
              updItem={(v) => collections.upd('tasks', file.id, v)}
              delItem={() => collections.del('tasks', file.id)}
            />
          ))}
        </Section>
      </Mobile.Body>
    </Mobile.Root>
  )
}
