import { ReactNode, useState, Children } from 'react'
import { SFC, mixin } from '@common/styles'
import Primitive, { Div, H2, Span } from '@lib/primitives'
import { noop } from 'lodash'
import { Icon } from '@lib/icons'

export const Section: SFC<{
  title: string
  actions?: ReactNode[]
  stickyHead?: boolean
  stickHeadAt?: number
  collapsible?: boolean
  defaultOpen?: boolean
  counter?: boolean
}> = (props) => {
  const [open, setOpen] = useState(props.defaultOpen ?? true)
  const toggle = props.collapsible ? () => setOpen((s) => !s) : noop
  const stickyHead = props.stickyHead ?? true
  return (
    <Primitive.Section css={{ isolation: 'isolate' }}>
      <Div
        css={{
          d: 'flex',
          jc: 'space-between',
          ai: 'center',
          h: 40,
          bg: '$gray100',
          px: 32,
          ...mixin(stickyHead, {
            position: 'sticky',
            top: props.stickHeadAt ?? 0,
            bsh: '0 4px 16px rgb(0 0 0 / 0.5)',
            // bsh: '0 8px 24px rgb(0 0 0 / 0.4)',
            zIndex: 1,
          }),
        }}
      >
        <H2
          css={{
            d: 'flex',
            ai: 'center',
            h: '100%',
            fs: 13,
            ls: '0.05em',
            fw: 200,
            tt: 'uppercase',
            flex: 1,
            us: 'none',
          }}
          onClick={toggle}
        >
          <Span
            css={{
              w: 24,
              d: 'grid',
              pc: 'center',
              flexShrink: 0,
            }}
          >
            <Icon.ChevronFilled
              css={{
                d: props.collapsible ? 'block' : 'none',
                s: 15,
                c: 'cyan',
                rotate: open ? '180deg' : '90deg',
              }}
            />
          </Span>
          <Span>{props.title}</Span>
          {props.counter && (
            <Span css={{ fs: 13, fw: 400, c: 'cyan', ml: 8 }}>
              {Children.count(props.children)}
            </Span>
          )}
        </H2>
        <Div css={{ display: 'flex', gap: 8 }}>{props.actions}</Div>
      </Div>
      {open && (
        <Div css={{ display: 'flex', flexDirection: 'column', gap: 8, px: 16, py: 8 }}>
          {props.children}
        </Div>
      )}
    </Primitive.Section>
  )
}
