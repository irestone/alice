import type { NextPage } from 'next'
import Head from 'next/head'
import {
  Aside,
  Button,
  Div,
  Header,
  Heading4,
  Input,
  Item,
  List,
  Main,
  Nav,
  SFC,
  Span,
  styled,
} from '../styles/components'
import { Roboto, Inter } from '@next/font/google'

// const regularFont = Roboto({
// subsets: ['cyrillic'],
// weight: ['100', '300', '400', '500', '700', '900'],
// variable: '--font-regular',
// })

const regularFont = Inter({
  subsets: ['cyrillic'],
  variable: '--font-regular',
})

const Layout = styled(Div, {
  display: 'grid',
  gridTemplateColumns: 'var(--navbar-width) var(--collection-width) 1fr',
  height: '100%',
  fontFamily: 'var(--font-regular)',
  fontSize: '.9rem',
  fontWeight: 300,
  letterSpacing: '.03em',
})

const Navbar: SFC = () => {
  return (
    <Nav
      css={{
        borderRight: '1px solid $gray300',
        background: '#121212',
        color: '#999',
      }}
    >
      <Div
        css={{
          width: '100%',
          aspectRatio: 1,
          display: 'grid',
          placeContent: 'center',
          position: 'relative',
        }}
        title='Уведомления (3)'
      >
        a
        <Div
          css={{
            position: 'absolute',
            left: '69%',
            top: '63%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 99999,
            background: '$accent',
            color: '#e6e6e6',
            fontSize: '.55rem',
            padding: '.3em .7em',
            display: 'grid',
            placeContent: 'center',
          }}
        >
          3
        </Div>
      </Div>
      <Div
        css={{
          width: '100%',
          aspectRatio: 1,
          display: 'grid',
          placeContent: 'center',
          borderLeft: '3px solid $accent',
          color: '#e6e6e6',
        }}
        title='Список должников'
      >
        b
      </Div>
      <Div
        css={{ width: '100%', aspectRatio: 1, display: 'grid', placeContent: 'center' }}
        title='Задачи'
      >
        c
      </Div>
      <Div
        css={{ width: '100%', aspectRatio: 1, display: 'grid', placeContent: 'center' }}
        title='Сотрудники'
      >
        acc
      </Div>
    </Nav>
  )
}

const Collection: SFC = () => {
  return (
    <Div
      css={{
        borderRight: '1px solid $gray300',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#121212',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '$gray300',
          '&:hover': {
            background: '$gray400',
          },
        },
      }}
    >
      <Header css={{ position: 'sticky', top: 0, boxShadow: 'rgb(255 255 255 / 3%) 0px 0px 50px' }}>
        <Heading4
          css={{
            padding: '1rem',
            // paddingLeft: '2rem',
            // background: ' #292A2D',
            background: '#293239',
            // background: '$accent',
            textTransform: 'uppercase',
            fontSize: '.82rem',
            // fontWeight: '600',
            fontWeight: '150',
            // letterSpacing: '.13em',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            boxShadow: 'rgb(25 29 33 / 30%) 0px 0px 50px',
            position: 'relative',
            zIndex: 1,
            // borderBottom: '1px solid $gray300',
            borderBottom: '1px solid #44525d',
            // borderBottom: '1px solid #438cc3',
            color: '$gray900',
            minHeight: '4.5rem',
          }}
        >
          Должники
          <Div css={{ display: 'flex', gap: '1rem' }}>
            <Button
              css={{
                fontSize: '.65rem',
                fontWeight: '100',
                color: '$gray700',
                border: '1px solid $gray700',
                padding: '.4em .6em',
                borderRadius: 4,
              }}
            >
              + добавить
            </Button>
          </Div>
        </Heading4>
        <Div
          css={{
            padding: '.6rem 1rem',
            // background: ' #292A2D',
            // background: 'linear-gradient(to bottom, #324655, #292A2D)',
            background: 'linear-gradient(to bottom, #324655, #2b2f35)',
            borderBottom: '1px solid $gray300',
            fontSize: '.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Input
            placeholder='поиск'
            css={{
              display: 'block',
              padding: '.5rem 1rem',
              flex: 1,
              borderRadius: 999,
              border: '1px solid $gray400',
              background: '#1d2023',
              color: '$gray900',
            }}
          />
          <Button css={{ color: '#999' }}>F</Button>
        </Div>
      </Header>
      <List css={{ fontSize: '.9rem' }}>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 1</Item>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 2</Item>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 3</Item>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 4</Item>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 1</Item>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 2</Item>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 3</Item>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 3</Item>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 1</Item>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 2</Item>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 3</Item>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 4</Item>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 1</Item>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 2</Item>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 3</Item>
        <Item css={{ padding: '1rem', height: '5rem' }}>карточка должника 3</Item>
      </List>
    </Div>
  )
}

const Panel: SFC = () => {
  return <Div css={{ padding: '1rem', background: '$gray200' }}>основная панель</Div>
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Alice: Madness</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout className={`${regularFont.variable}`}>
        <Navbar />
        <Collection />
        <Panel />
      </Layout>
    </>
  )
}

export default Home
