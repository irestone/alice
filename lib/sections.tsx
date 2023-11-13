import { ReactNode, useState, Children } from 'react'
import { SFC } from '@common/styles'
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
  return (
    <Primitive.Section css={{ px: 16, isolation: 'isolate' }}>
      <Div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 40,
          background: '$gray100',
          px: 16,
          ...(props.stickyHead ?? true
            ? {
                position: 'sticky',
                top: props.stickHeadAt ?? 0,
                zIndex: 1,
              }
            : {}),
        }}
      >
        <H2
          css={{
            flex: 1,
            d: 'flex',
            ai: 'center',
            h: '100%',
            fs: 15,
            fw: 500,
            userSelect: 'none',
          }}
          onClick={toggle}
        >
          <Icon.Chevron
            css={{
              s: 15,
              opacity: props.collapsible ? 1 : 0,
              rotate: open ? '180deg' : '90deg',
              '--color': 'cyan',
            }}
          />
          <Span css={{ mx: 4, tt: 'uppercase', fs: 13 }}>{props.title}</Span>
          {props.counter && (
            <Span css={{ fs: 13, fw: 400, c: 'cyan', ml: 4 }}>
              {Children.count(props.children)}
            </Span>
          )}
        </H2>
        <Div css={{ display: 'flex', gap: 8 }}>{props.actions}</Div>
      </Div>
      {open && (
        <Div css={{ display: 'flex', flexDirection: 'column', gap: 8, py: 8 }}>
          {props.children}
        </Div>
      )}
    </Primitive.Section>
  )
}
