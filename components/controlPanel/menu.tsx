import { Div, SFC, styled } from '../../styles/components'
import { useRouter } from 'next/router'
import { BellIcon } from '@radix-ui/react-icons'

import BellIconSVG from '../../public/assets/bell-icon.svg'
import FolderIconSVG from '../../public/assets/folder-icon.svg'
import TasksIconSVG from '../../public/assets/tasks-icon.svg'
import ProfileIconSVG from '../../public/assets/profile-icon.svg'
import { useCallback } from 'react'
import { useTabs } from './state'

const FolderIcon = styled(FolderIconSVG, { stroke: 'var(--icon-color)' })
const TasksIcon = styled(TasksIconSVG, { fill: 'var(--icon-color)' })
const ProfileIcon = styled(ProfileIconSVG, { fill: 'var(--icon-color)' })
// const BellIcon = styled(BellIconSVG, {
//   stroke: 'var(--icon-color)',
//   strokeWidth: 1.4,
//   fill: 'none',
// })

const Pill = styled('div', {
  display: 'grid',
  placeContent: 'center',
  height: '1.3em',
  minWidth: '1.3em',
  position: 'absolute',
  left: '64%',
  top: '33%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 99999,
  background: '$accent',
  color: '#e6e6e6',
  fontSize: '.75rem',
  lineHeight: 0,
  padding: '0 .24em',
})

const Dot = styled('div', {
  width: '.6rem',
  aspectRatio: 1,
  borderRadius: 99999,
  background: '$accent',
  position: 'absolute',
  right: 0,
  top: '35%',
  transform: 'translate(-50%, -50%)',
})

const Button = styled('button', {
  '--icon-color': '#999',
  '--btn-w': '2rem',
  '--btn-h': '2rem',
  display: 'grid',
  placeContent: 'center',
  width: 'var(--btn-w)',
  height: 'var(--btn-h)',
  position: 'relative',
  '&:hover': { '--icon-color': '#bababa' },
  '&:hover svg': { filter: 'drop-shadow(0 0 .66rem #fff2)' },
})

const Tab = styled('button', {
  '--icon-color': '#999',
  '--btn-w': '4rem',
  '--btn-h': '2rem',
  display: 'grid',
  placeContent: 'center',
  width: 'var(--btn-w)',
  height: 'var(--btn-h)',
  background: '#263039',
  '&:hover': { '--icon-color': '#bababa', background: '#28333d' },
  '&:hover svg': { filter: 'drop-shadow(0 0 .66rem #fff2)' },
  variants: {
    active: {
      true: {
        '--icon-color': '#eee',
        background: '#333d47',
        pointerEvents: 'none',
      },
    },
  },
})

const Group = styled(Div, {
  display: 'flex',
})

const Root = styled(Div, {
  display: 'flex',
  justifyContent: 'space-between',
  color: '#999',
  background: '#232931',
})

const Menu: SFC = () => {
  const tab = useTabs((s) => s.tab)
  const setTab = useTabs((s) => s.set)
  return (
    <Root>
      <Group>
        <Tab active={tab === 'files'} onClick={() => setTab('files')}>
          <FolderIcon css={{ height: 'calc(var(--btn-h) - 10px)' }} />
        </Tab>
        <Tab active={tab === 'tasks'} onClick={() => setTab('tasks')}>
          <TasksIcon css={{ height: 'calc(var(--btn-h) - 16px)' }} />
        </Tab>
      </Group>
      <Group css={{ gap: '.3rem', margin: '0 .3rem' }}>
        <Button>
          <BellIcon
            style={{
              height: 'calc(var(--btn-h) - 14px)',
              width: '100%',
              fill: 'var(--icon-color)',
            }}
          />
          {/* <Pill>12</Pill> */}
          <Dot />
        </Button>
        <Button>
          <ProfileIcon css={{ height: 'calc(var(--btn-h) - 12px)' }} />
        </Button>
      </Group>
    </Root>
  )
}

export default Menu
