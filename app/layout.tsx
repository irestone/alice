'use client'

import Head from 'next/head'
import { BarLoader } from 'react-spinners'

import { SFC, Breakpoint, styled } from '@common/styles'
import { mq, useMediaQueries } from '@common/utils'
import { useStorage } from '@common/storage'
import { Button, Div, Span } from '@lib/primitives'

import { Menu, TMenuDisplay } from './layout/menu'
import { Mobile } from '@lib/mobile'

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
  const mobileSearch = useStorage((s) => s.mobileSearch)
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
      {mobileSearch && <Mobile.Search />}
    </>
  )
}
