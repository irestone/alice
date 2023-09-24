import { useEffect } from 'react'
import Head from 'next/head'

import { Div, SFC, Span, styled } from '../styles/components'
import { useGlobalStore } from '../store'
import { BarLoader } from 'react-spinners'

const Root = styled('div', {
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
})

const Loader: SFC = () => {
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

const Page: SFC<{ title: string }> = ({ title, children }) => {
  const loaded = useGlobalStore((api) => api.loaded)
  const load = useGlobalStore((api) => api.load)

  useEffect(() => {
    if (!loaded) load()
  }, [loaded, load])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Root>{loaded ? children : <Loader />}</Root>
    </>
  )
}

export default Page
