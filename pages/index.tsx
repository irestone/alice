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

const Layout = styled(Div, {
  display: 'grid',
  gridTemplateColumns: 'var(--navbar-width) var(--collection-width) 1fr',
  height: '100%',
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
    <Div css={{ borderRight: '1px solid $gray300', overflow: 'auto' }}>
      <Header css={{ position: 'sticky', top: 0, boxShadow: 'rgb(255 255 255 / 4%) 0px 0px 50px' }}>
        <Heading4
          css={{
            padding: '1rem',
            paddingLeft: '2rem',
            background: '$accent',
            textTransform: 'uppercase',
            fontSize: '.9rem',
            fontWeight: '500',
            letterSpacing: '.08em',
            display: 'flex',
            justifyContent: 'space-between',
            boxShadow: 'rgb(25 29 33 / 30%) 0px 0px 50px',
            position: 'relative',
            zIndex: 1,
            borderBottom: '1px solid #438cc3',
          }}
        >
          Должники
          <Div css={{ display: 'flex', gap: '1rem' }}>
            <Button>+</Button>
          </Div>
        </Heading4>
        <Div
          css={{
            padding: '1rem',
            // background: ' #292A2D',
            background: 'linear-gradient(to bottom, #324655, #292A2D)',
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
      <Layout>
        <Navbar />
        <Collection />
        <Panel />
      </Layout>
    </>
  )
}

export default Home
