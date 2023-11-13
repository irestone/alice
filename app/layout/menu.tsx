import { merge } from 'lodash'
import { SFC, styled } from '@common/styles'
import { cq } from '@common/utils'
import { RouteLink } from 'lib/primitives'
import { usePathname } from 'next/navigation'
import { Button } from '@lib/buttons'

const Search = styled('div', {
  height: 32,
  borderRadius: 999,
  background: '#555',
  [cq(1400)]: {},
  variants: {
    position: {
      static: {
        flex: 1,
      },
      absolute: {
        width: 640,
        position: 'absolute',
        left: 0,
        right: 0,
        margin: 'auto',
      },
    },
  },
})

const Main = styled('div', { d: 'flex', g: 16 })

const Extra = styled('div', { d: 'flex', g: 16, flex: 1, jc: 'flex-end' })

const Root = styled('div', {
  container: 'menu',
  gridArea: 'menu',
  display: 'flex',
  px: 16,
  py: 16,
  g: 16,
  bg: '#101010',
  '& > *': { width: '40px !important' },
  variants: {
    handheld: {
      true: {
        borderTop: '1px solid #2a2a2a',
        justifyContent: 'space-around',
        g: 0,
        px: 16,
        py: 6,
      },
    },
    mobile: {
      true: {
        borderTop: '1px solid #2a2a2a',
        px: 16,
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
      </Root>
    )
  }

  return (
    <Root mobile={d('mobile')}>
      <Main>
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
      </Main>
      <Extra>
        {d('small') && <Search position='static' />}
        {d('normal') && <Search position='absolute' />}
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
      </Extra>
    </Root>
  )
}
// export const Menu: SFC<{ display: TMenuDisplay }> = (props) => {
//   const d = (d: TMenuDisplay) => props.display === d
//   const { pathname: route } = useRouter()

//   if (d('handheld')) {
//     return (
//       <Root handheld>
//         <RouteLink href='/'>
//           <Button icon='home' size='l' active={route === '/'} />
//         </RouteLink>
//         <RouteLink href='/files'>
//           <Button icon='files' size='l' active={route.startsWith('/files')} />
//         </RouteLink>
//         <RouteLink href='/tasks'>
//           <Button icon='tasks' size='l' active={route.startsWith('/tasks')} />
//         </RouteLink>
//         <RouteLink href='/subscriptions'>
//           <Button icon='subscriptions' size='l' active={route.startsWith('/subscriptions')} />
//         </RouteLink>
//         <RouteLink href='/profile'>
//           <Button icon='profile' size='l' active={route.startsWith('/profile')} />
//         </RouteLink>
//       </Root>
//     )
//   }

//   return (
//     <Root>
//       <Main>
//         <RouteLink href='/'>
//           <Button icon='home' active={route === '/'} />
//         </RouteLink>
//         <RouteLink href='/files'>
//           <Button icon='files' active={route.startsWith('/files')}>
//             Каталог
//           </Button>
//         </RouteLink>
//         <RouteLink href='/tasks'>
//           <Button icon='tasks' active={route.startsWith('/tasks')}>
//             Задания
//           </Button>
//         </RouteLink>
//       </Main>
//       <Extra>
//         {d('small') && <Search position='static' />}
//         {d('normal') && <Search position='absolute' />}
//         <Button icon='subscriptions' colors={noIdleBgStyle} />
//         <Button icon='profile' colors={noIdleBgStyle} />
//       </Extra>
//     </Root>
//   )
// }
