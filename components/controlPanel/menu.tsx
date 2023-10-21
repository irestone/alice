import { useRouter } from 'next/router'
import { BellIcon } from '@radix-ui/react-icons'

import { SFC, styled } from '../../_styles'
import { Div, RouteLink } from '../_primitives'
import { FolderIcon, ProfileIcon, TasksIcon } from '../_icons'

const FilesTabIcon = styled(FolderIcon, { stroke: 'var(--icon-color)' })
const TasksTabIcon = styled(TasksIcon, { fill: 'var(--icon-color)' })
const ProfileButtonIcon = styled(ProfileIcon, { fill: 'var(--icon-color)' })

const Dot = styled('div', {
  width: '.6rem',
  aspectRatio: 1,
  borderRadius: 99999,
  background: '$accent',
  position: 'absolute',
  right: '10%',
  top: '35%',
  transform: 'translate(-50%, -50%)',
})

const Button = styled('button', {
  '--icon-color': '#999',
  '--w': '2.4rem',
  '--h': '2.4rem',
  display: 'grid',
  placeContent: 'center',
  width: 'var(--w)',
  height: 'var(--h)',
  position: 'relative',
  '&:hover': { '--icon-color': '#bababa' },
  '&:hover svg': { filter: 'drop-shadow(0 0 .66rem #fff2)' },
})

const Tab = styled(RouteLink, {
  '--icon-color': '#999',
  '--h': '2.4rem',
  display: 'flex',
  alignItems: 'center',
  paddingRight: '.6rem',
  height: 'var(--h)',
  background: '#263039',
  textTransform: 'uppercase',
  fontSize: '.77rem',
  fontWeight: 450,
  // letterSpacing: '.05em',
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

export const Menu: SFC = () => {
  const router = useRouter()
  return (
    <Root>
      <Group>
        <Tab href='/files' active={router.pathname.startsWith('/files')}>
          <FilesTabIcon css={{ height: 'calc(var(--h) - 14px)', width: 'calc(var(--h))' }} />
          Картотека
        </Tab>
        <Tab href='/tasks' active={router.pathname.startsWith('/tasks')}>
          <TasksTabIcon css={{ height: 'calc(var(--h) - 20px)', width: 'calc(var(--h))' }} />
          Задания
        </Tab>
      </Group>
      <Group css={{ gap: '.3rem', margin: '0 .3rem' }}>
        <Button>
          <BellIcon
            style={{
              height: 'calc(var(--h) - 20px)',
              width: '100%',
              fill: 'var(--icon-color)',
            }}
          />
          <Dot />
        </Button>
        <Button>
          <ProfileButtonIcon css={{ height: 'calc(var(--h) - 17px)' }} />
        </Button>
      </Group>
    </Root>
  )
}
