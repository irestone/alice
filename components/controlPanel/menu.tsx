import { useCallback } from 'react'
import { Div, RouteLink, SFC, styled } from '../../styles/components'
import { BellIcon } from '@radix-ui/react-icons'

import FolderIconSVG from '../../public/assets/folder-icon.svg'
import TasksIconSVG from '../../public/assets/tasks-icon.svg'
import ProfileIconSVG from '../../public/assets/profile-icon.svg'
import { useRouter } from 'next/router'

const FolderIcon = styled(FolderIconSVG, { stroke: 'var(--icon-color)' })
const TasksIcon = styled(TasksIconSVG, { fill: 'var(--icon-color)' })
const ProfileIcon = styled(ProfileIconSVG, { fill: 'var(--icon-color)' })

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

const Tab = styled(RouteLink, {
  '--icon-color': '#999',
  '--btn-w': '4rem',
  '--btn-h': '2rem',
  display: 'grid',
  placeContent: 'center',
  width: 'var(--btn-w)',
  height: 'var(--btn-h)',
  background: '#263039',
  '&:hover svg': { filter: 'drop-shadow(0 0 .66rem #fff2)' },
  variants: {
    active: {
      true: {
        '--icon-color': '#eee',
        background: '#333d47',
      },
      false: {
        '&:hover': { '--icon-color': '#bababa', background: '#28333d' },
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
  const { pathname } = useRouter()
  const isActiveTab = useCallback((href: string) => pathname.startsWith(href), [pathname])
  return (
    <Root>
      <Group>
        <Tab href='/files' active={isActiveTab('/files')}>
          <FolderIcon css={{ height: 'calc(var(--btn-h) - 10px)' }} />
        </Tab>
        <Tab href='/tasks' active={isActiveTab('/tasks')}>
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
