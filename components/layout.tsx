import { useEffect } from 'react'
import Head from 'next/head'
import { BarLoader } from 'react-spinners'

import { useGlobalStore } from '../_store'
import { SFC, styled } from '../_styles'
import { Div, Span } from './_primitives'

export const Viewport = styled('main', {
  flex: 1,
  padding: '1rem',
  borderLeft: '1px solid #2c2c2c',
  borderRight: '1px solid #2c2c2c',
  background: '#1f1f1f',
  overflow: 'auto',
  scrollbarSize: 8,
  scrollbarTrackColor: '#232323',
  scrollbarThumbColor: '#666',
  scrollbarThumbColorHovered: '#777',
})

export const Sidebar = styled('aside', {
  display: 'flex',
  flexDirection: 'column',
  width: '32rem',
  background: '#181818',
  overflowX: 'hidden',
  overflowY: 'auto',
  scrollbarSize: 8,
  scrollbarTrackColor: '#232323',
  scrollbarThumbColor: '#666',
  scrollbarThumbColorHovered: '#777',
})

// section #########################################################################################
//  PAGE
// #################################################################################################

const PageLoader: SFC = () => {
  return (
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
}

const Root = styled('div', {
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
})

interface IPage {
  title: string
}

export const Page: SFC<IPage> = ({ title, children }) => {
  const isDataLoaded = useGlobalStore((api) => api.data.loaded)
  const loadData = useGlobalStore((api) => api.data.load)

  useEffect(() => {
    if (!isDataLoaded) loadData()
  }, [isDataLoaded, loadData])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Root>{isDataLoaded ? children : <PageLoader />}</Root>
    </>
  )
}
