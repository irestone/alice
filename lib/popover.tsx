import { useState, ReactNode } from 'react'
import { SFC, mixin } from '@common/styles'
import { AttrType, NamedEntry } from '@common/types'
import Primitive, { Div, Span } from './primitives'
import { Icon } from './icons'
import { Button, IconName } from './buttons'
import { find } from 'lodash'

export const Popover: SFC<{
  trigger?: ReactNode
  anchor?: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  align?: 'center' | 'start' | 'end'
  modal?: boolean
}> = (props) => {
  return (
    <Primitive.Popover.Root modal={props.modal} open={props.open} onOpenChange={props.onOpenChange}>
      {props.trigger && (
        <Primitive.Popover.Trigger css={{ flexShrink: 0 }}>
          {props.trigger}
        </Primitive.Popover.Trigger>
      )}
      {props.anchor && (
        <Primitive.Popover.Anchor css={{ flexShrink: 0 }}>{props.anchor}</Primitive.Popover.Anchor>
      )}
      <Primitive.Popover.Content
        align={props.align}
        sideOffset={8}
        collisionPadding={8}
        css={{
          '--popover-bg': '#dddddd',
          bg: 'var(--popover-bg)',
          rad: 8,
          c: '$gray100',
          bsh: '0 0 20px rgba(0 0 0 / 0.5)',
          ...props.css,
        }}
      >
        {props.children}
      </Primitive.Popover.Content>
    </Primitive.Popover.Root>
  )
}
