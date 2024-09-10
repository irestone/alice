import { merge } from 'lodash'
import { SFC, styled } from '@common/styles'
import { cq } from '@common/utils'
import { RouteLink } from 'lib/primitives'
import { usePathname } from 'next/navigation'
import { Button } from '@lib/buttons'

const Search = styled('input', {
  flex: 1,
  h: 40,
  lh: 40,
  bdrad: 999,
  bd: '1px solid #444',
  bg: 'rgb(255 255 255 / 0.03)',
  c: 'white',
  px: 16,
  '&:focus': {
    bg: 'rgb(255 255 255 / 0.05)',
  },
  variants: {
    centered: {
      true: { w: 640, pos: 'absolute', l: 0, r: 0, m: 'auto' },
    },
  },
})

const ButtonGroup = styled('div', { d: 'flex', g: 16 })

const Root = styled('nav', {
  container: 'menu',
  gridArea: 'menu',
  display: 'flex',
  px: 16,
  py: 16,
  g: 16,
  jc: 'space-between',
  bg: '#101010',
  variants: {
    handheld: {
      true: {
        borderTop: '1px solid #2a2a2a',
        py: 6,
      },
    },
    mobile: {
      true: {
        borderTop: '1px solid #2a2a2a',
        py: 8,
      },
    },
  },
})

// section #########################################################################################
//  MAIN
// #################################################################################################

export type TMenuDisplay = 'handheld' | 'mobile' | 'small' | 'normal'

export const Menu: SFC<{ display: TMenuDisplay }> = (props) => {
  const d = (d: TMenuDisplay) => props.display === d
  const pathname = usePathname()

  if (d('handheld')) {
    return (
      <Root handheld>
        <ButtonGroup css={{ flex: 1, g: 0, jc: 'space-around' }}>
          <Button icon='home' size={1} colors='no_bg' href='/' active={pathname === '/'} caption>
            Главная
          </Button>
          <Button
            icon='catalog'
            size={1}
            colors='no_bg'
            href='/files'
            active={pathname?.startsWith('/files')}
            caption
          >
            Каталог
          </Button>
          <Button
            icon='task'
            size={1}
            colors='no_bg'
            href='/tasks'
            active={pathname?.startsWith('/tasks')}
            caption
          >
            Задания
          </Button>
          <Button
            icon='subscribe'
            size={1}
            colors='no_bg'
            href='/subscriptions'
            active={pathname?.startsWith('/subscriptions')}
            caption
          >
            Подписки
          </Button>
          <Button
            icon='profile'
            size={1}
            colors='no_bg'
            href='/profile'
            active={pathname?.startsWith('/profile')}
            caption
          >
            Профиль
          </Button>
        </ButtonGroup>
      </Root>
    )
  }

  //todo remove Root's mobile prop and just use css
  // todo make 'if (mobile)' w 2 button groups and w/o search then default return for larger screens
  return (
    <Root mobile={d('mobile')}>
      <ButtonGroup>
        <Button icon='home' size={1} colors='no_bg' href='/' active={pathname === '/'} />
        <Button
          icon='catalog'
          size={1}
          colors='active_bg'
          href='/files'
          active={pathname?.startsWith('/files')}
        >
          Каталог
        </Button>
        <Button
          icon='checklist'
          size={1}
          colors='active_bg'
          href='/tasks'
          active={pathname?.startsWith('/tasks')}
        >
          Задания
        </Button>
      </ButtonGroup>
      {d('small') && <Search centered={d('normal')} />}
      {d('normal') && <Search centered={d('normal')} />}
      <ButtonGroup>
        <Button
          icon='subscribe'
          size={1}
          colors='no_bg'
          href='/subscriptions'
          active={pathname?.startsWith('/subscriptions')}
        />
        <Button
          icon='profile'
          size={1}
          colors='no_bg'
          href='/profile'
          active={pathname?.startsWith('/profile')}
        />
      </ButtonGroup>
    </Root>
  )
}
