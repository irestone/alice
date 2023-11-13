import { SFC, styled } from '@common/styles'
import { Icon } from '@lib/icons'
import Primitive from '@lib/primitives'

// part ==========================================
//  TRIGGER
// ===============================================

export const Trigger: SFC<{ highlight?: boolean }> = ({ highlight: hl }) => (
  <Primitive.Popover.Trigger
    css={{
      '--icon-color': hl ? 'cyan' : '#aaa',
      height: '1.68rem',
      aspectRatio: 1,
      padding: '.22rem',
      borderRadius: 4,
      background: '#35434f',
      border: hl ? '1px solid cyan' : 'var(--bd)',
      '&:hover': {
        background: '#3a4855',
      },
    }}
  >
    <Icon.Filter css={{ stroke: 'var(--icon-color)' }} />
  </Primitive.Popover.Trigger>
)

// part ==========================================
//  POPOVER
// ===============================================

const Arrow = styled(Primitive.Popover.Arrow, { fill: '#595959' })

const Close: SFC = () => (
  <Primitive.Popover.Close
    css={{
      fontSize: '.8rem',
      height: 'calc(1em + 0.3rem)',
      aspectRatio: 1,
      padding: '.1rem',
      borderRadius: 2,
      position: 'absolute',
      top: '.2rem',
      right: '.2rem',
      '&:hover': { background: '#fff1' },
      svg: { width: '100%', height: '100%' },
    }}
  >
    <Icon.Close css={{ width: '100%', height: '100%', fill: '#aaa' }} />
  </Primitive.Popover.Close>
)

const Head = styled('h4', {
  textTransform: 'uppercase',
  fontWeight: 350,
  fontSize: '.75rem',
  padding: '0 0 .2rem',
  borderBottom: '1px solid #595959',
})

const Body = styled('div')

const Container: SFC = (props) => (
  <Primitive.Popover.Portal>
    <Primitive.Popover.Content
      align='start'
      sideOffset={4}
      collisionPadding={10}
      arrowPadding={4}
      css={{
        minWidth: '10rem',
        padding: '.3rem',
        borderRadius: 4,
        background: '#414447',
        border: '1px solid #595959',
        color: '#bababa',
        fontSize: '.9rem',
        fontWeight: '200',
      }}
    >
      {props.children}
    </Primitive.Popover.Content>
  </Primitive.Popover.Portal>
)

export const Popover: SFC = (props) => (
  <Container>
    <Head>Фильтры</Head>
    <Body>{props.children}</Body>
    <Arrow />
    <Close />
  </Container>
)

// part ==========================================
//  ROOT
// ===============================================

export const Root = Primitive.Popover.Root
