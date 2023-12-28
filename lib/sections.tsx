import { ReactNode, useState, Children } from 'react'
import { SFC, mixin, styled } from '@common/styles'
import { Div, H2, Span } from '@lib/primitives'
import { noop } from 'lodash'
import { Icon } from '@lib/icons'

const Counter = styled('div', { fs: 13, fw: 400, c: 'cyan', ml: 8, flexShrink: 0 })
const Title = styled('h2', {
  fs: 13,
  ls: '0.05em',
  fw: 200,
  tt: 'uppercase',
  ws: 'nowrap',
  of: 'hidden',
  tof: 'ellipsis',
})

const Chevron: SFC<{ visible?: boolean; open?: boolean }> = (props) => {
  const visibility = props.visible ? 'visible' : 'hidden'
  const rotate = props.open ? '180deg' : '90deg'
  return (
    <Div css={{ s: 24, d: 'grid', pc: 'center', flexShrink: 0 }}>
      <Icon.ChevronFilled css={{ visibility, rotate, s: 15, c: 'cyan' }} />
    </Div>
  )
}

const Handle = styled('div', {
  d: 'flex',
  ai: 'center',
  h: '100%',
  flex: 1,
  us: 'none',
  of: 'hidden',
})

const Actions = styled('div', { d: 'flex', g: 8 })

const Head = styled('div', {
  d: 'flex',
  jc: 'space-between',
  ai: 'center',
  h: 40,
  g: 16,
  px: 32,
  bg: '$gray100',
  variants: {
    sticky: {
      true: { pos: 'sticky', t: 0, bsh: '0 4px 16px rgb(0 0 0 / 0.5)', z: 1 },
    },
  },
})

const Body = styled('div', { d: 'flex', fd: 'column', g: 8, px: 16, py: 8 })
const Root = styled('section', { isolation: 'isolate' })

export const Section: SFC<{
  title: string
  actions?: ReactNode
  stickyHead?: boolean
  stickHeadAt?: number
  collapsible?: boolean
  defaultOpen?: boolean
  counter?: boolean
}> = (props) => {
  const [open, setOpen] = useState(props.defaultOpen ?? true)
  return (
    <Root>
      <Head sticky={props.stickyHead ?? true} css={{ t: props.stickHeadAt ?? 0 }}>
        <Handle onClick={props.collapsible ? () => setOpen(!open) : noop}>
          <Chevron visible={props.collapsible} open={open} />
          <Title>{props.title}</Title>
          {props.counter && <Counter>{Children.count(props.children)}</Counter>}
        </Handle>
        <Actions>{props.actions}</Actions>
      </Head>
      {open && <Body>{props.children}</Body>}
    </Root>
  )
}
