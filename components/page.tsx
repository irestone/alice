import Head from 'next/head'

import { SFC, styled } from '../styles/components'

const Root = styled('div', {
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
})

const Layout: SFC<{ title: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Root>{children}</Root>
    </>
  )
}

export default Layout
