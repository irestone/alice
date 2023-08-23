import Head from 'next/head'

import { Div, SFC, styled } from '../styles/components'
import ControlPanel from './controlPanel'
import Viewport from './viewport'
import Sidebar from './sidebar'

const Root = styled(Div, {
  display: 'grid',
  gridTemplateColumns: 'auto minmax(36rem, 1fr) minmax(27rem, 32rem)',
  gridTemplateRows: '1fr',
  height: '100%',
  overflow: 'hidden',
  fontFamily: 'var(--font-regular)',
  fontSize: '.9rem',
  fontWeight: 300,
  letterSpacing: '.03em',
})

const Layout: SFC<{ title: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Root>
        <ControlPanel />
        <Viewport>{children}</Viewport>
        <Sidebar />
      </Root>
    </>
  )
}

export default Layout
