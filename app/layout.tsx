'use client'

import Head from 'next/head'
import { BarLoader } from 'react-spinners'

import { SFC, Breakpoint, styled } from '@common/styles'
import { mq, useMediaQueries } from '@common/utils'
import { useStorage } from '@common/storage'
import { Div, Span } from '@lib/primitives'

import { Menu, TMenuDisplay } from './layout/menu'

// section #########################################################################################
//  LOADER
// #################################################################################################

const Loader: SFC = () => (
  <Div
    css={{
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2.5rem',
    }}
  >
    <Div css={{ textTransform: 'uppercase', fontSize: '2rem', fontWeight: 200 }}>
      <Span css={{ fontWeight: 500 }}>Alice</Span> Management System
    </Div>
    <BarLoader color='#0078D4' width='24rem' />
  </Div>
)

// section #########################################################################################
//  LAYOUT
// #################################################################################################

export const Viewport = styled('div', {
  container: 'viewport',
  gridArea: 'viewport',
  overflow: 'hidden',
})

const Root = styled('div', {
  container: 'page',
  display: 'grid',
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  [mq(Breakpoint.handheld, Breakpoint.small)]: {
    gridTemplateAreas: '"viewport" "menu"',
    gridTemplateRows: '1fr auto',
  },
  [mq(Breakpoint.small)]: {
    gridTemplateAreas: '"menu" "viewport"',
    gridTemplateRows: 'auto 1fr',
  },
})

// section #########################################################################################
//  MAIN
// #################################################################################################

export const Layout: SFC<{ title: string }> = (props) => {
  const initialized = useStorage((s) => s.initialized)
  const mq = useMediaQueries()
  const ready = initialized && mq(1) // mq(1) checks if viewport has been measured

  if (!ready) return <Loader />

  const menuDisplay: TMenuDisplay = mq(Breakpoint.handheld, Breakpoint.mobile)
    ? 'handheld'
    : mq(Breakpoint.mobile, Breakpoint.small)
    ? 'mobile'
    : mq(Breakpoint.small, Breakpoint.normal)
    ? 'small'
    : 'normal'

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Root>
        <Menu display={menuDisplay} />
        <Viewport>{props.children}</Viewport>
      </Root>
    </>
  )
}

// export const Main = styled('div', {
//   flex: '999 1 780px',
//   bgc: 'cyan',
// })

// export const Related = styled('div', {
//   flex: '1 0 420px',
//   display: 'flex',
//   flexDirection: 'column',
//   gap: 16,
//   bg: 'yellow',
// })

// export const Viewport = styled('main', {
//   container: 'viewport',
//   gridArea: 'viewport',
//   overflow: 'auto',
//   display: 'flex',
//   flexWrap: 'wrap',
//   alignItems: 'start',
//   scrollbarSize: 8,
//   scrollbarTrackColor: '#232323',
//   scrollbarThumbColor: '#666',
//   scrollbarThumbColorHovered: '#777',
//   bg: 'blue',
// })

// const Root = styled('div', {
//   container: 'page',
//   display: 'grid',
//   height: '100%',
//   overflow: 'hidden',
//   position: 'relative',
//   [mq(0, 1000)]: {
//     gridTemplateAreas: '"viewport" "menu"',
//     gridTemplateRows: '1fr auto',
//   },
//   [mq(1000, 1300)]: {
//     gridTemplateAreas: '"menu" "viewport"',
//     gridTemplateRows: 'auto 1fr',
//   },
//   [mq(1300)]: {
//     gridTemplateAreas: '"menu menu" "panel viewport"',
//     gridTemplateColumns: '480px 1fr',
//     gridTemplateRows: 'auto 1fr',
//   },
// })

// interface IPage {
//   title: string
//   // tab: TCategory
//   // setTab: (tab: TCategory) => void
// }

// export const Page: SFC<IPage> = ({ title, children }) => {
//   // const tab='files'
//   // const setTab={(tab) => router.push(`/${tab}`, { scroll: false } as any)}
//   // setting up useGobalStore
//   //todo show a loader while loading
//   const hasDataLoaded = useGlobalStore((api) => api.data.loaded)
//   const loadData = useGlobalStore((api) => api.data.load)
//   useEffect(() => {
//     if (!hasDataLoaded) loadData()
//   }, [hasDataLoaded, loadData])

//   // setting up useWindowSizeStore for useMediaQueries to work properly
//   const [bpref, measure] = useMeasure()
//   const setWindowSize = useWindowSizeStore((s) => s.setWindowSize)
//   useEffect(() => {
//     setWindowSize({ width: measure.width, height: measure.height })
//   }, [setWindowSize, measure])

//   const mq = useMediaQueries()
//   const menuDisplay: TMenuDisplay = mq(0, 1000) ? 'mobile' : mq(1000, 1300) ? 'small' : 'normal'
//   const panelDisplay: TPanelDisplay = mq(1300) ? 'static' : 'overlay'
//   const [isPanelVisible, setIsPanelVisible] = useState(false)

//   useEffect(() => {
//     setIsPanelVisible(panelDisplay === 'static')
//   }, [panelDisplay])

//   return (
//     <>
//       <Head>
//         <title>{title}</title>
//       </Head>
//       <Root ref={bpref}>
//         <Menu display={menuDisplay} />
//         {/* <Panel
//           display={panelDisplay}
//           visible={isPanelVisible}
//           hide={() => setIsPanelVisible(false)}
//         /> */}
//         <Viewport>{children}</Viewport>
//       </Root>
//     </>
//   )
// }
