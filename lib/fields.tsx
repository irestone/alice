import { useState } from 'react'
import { SFC, mixin } from '@common/styles'
import { AttrType, NamedEntry } from '@common/types'
import Primitive, { Div, Input } from './primitives'
import { Icon } from './icons'
import { Button, IconName } from './buttons'
import { find } from 'lodash'

export const Select: SFC<{
  value: string
  placeholder?: string
  onChange: (value: string) => void
  options: NamedEntry[]
  icon?: IconName
}> = (props) => {
  const option = find(props.options, { id: props.value })
  const [open, setOpen] = useState(false)
  return (
    <Primitive.Popover.Root open={open} onOpenChange={setOpen}>
      <Primitive.Popover.Trigger css={{ flexShrink: 0 }}>
        <Button icon={props.icon} corners='smooth'>
          {option?.name}
          <Icon.Chevron css={{ c: '#eaeaea', s: 9, rotate: '180deg' }} />
        </Button>
      </Primitive.Popover.Trigger>
      <Primitive.Popover.Content
        align='start'
        sideOffset={8}
        css={{
          bg: '$gray800',
          rad: 8,
          p: 4,
          c: '$gray100',
          d: 'flex',
          fd: 'column',
          g: 1,
          bsh: '0 0 20px rgba(0 0 0 / 0.5)',
        }}
      >
        {props.options.map((opt) => {
          const active = opt.id === option?.id
          return (
            <Primitive.Button
              key={opt.id}
              css={{
                d: 'flex',
                ai: 'center',
                g: 8,
                py: 12,
                pl: 6,
                pr: 10,
                rad: 4,
                fs: 16,
                lh: 1,
                cursor: 'pointer',
                '&:hover': { bg: '#cfcfcf' },
                ...mixin(active, { bg: '#cfcfcf' }),
              }}
              onClick={() => {
                props.onChange(opt.id)
                setOpen(false)
              }}
            >
              <Icon.Checkmark css={{ s: 13, '--color': active ? '#232323' : 'transparent' }} />
              {opt.name}
            </Primitive.Button>
          )
        })}
      </Primitive.Popover.Content>
    </Primitive.Popover.Root>
  )
}

export const AttrField: Record<AttrType, (...args: any) => any> = {
  string: (props) => (
    <Input
      type='text'
      {...props}
      css={{ h: 32, bg: '#fff', rad: 4, px: 8, py: 8, fs: 13, lh: 1, ...props.css }}
    />
  ),
  number: (props) => (
    <Input
      type='number'
      {...props}
      css={{ h: 32, bg: '#fff', rad: 4, px: 8, py: 8, fs: 13, lh: 1, ...props.css }}
    />
  ),
  boolean: (props) => (
    <Input
      type='checkbox'
      {...props}
      css={{ h: 32, bg: '#fff', rad: 4, px: 8, py: 8, fs: 13, lh: 1, ...props.css }}
    />
  ),
  date: (props) => (
    <Input
      type='date'
      {...props}
      css={{ h: 32, bg: '#fff', rad: 4, px: 8, py: 8, fs: 13, lh: 1, ...props.css }}
    />
  ),
  select: (props) => (
    <Primitive.Select
      {...props}
      css={{ h: 32, bg: '#fff', rad: 4, px: 4, py: 8, fs: 13, lh: 1, bd: 'none', ...props.css }}
    >
      {props.options.map((opt: any) => (
        <Primitive.Option key={opt.id} value={opt.id}>
          {opt.name}
        </Primitive.Option>
      ))}
    </Primitive.Select>
  ),
  multi_select: (props) => (
    <Primitive.Select
      {...props}
      css={{ h: 32, bg: '#fff', rad: 4, px: 4, py: 8, fs: 13, lh: 1, bd: 'none', ...props.css }}
    >
      {props.options.map((opt: any) => (
        <Primitive.Option key={opt.id} value={opt.id}>
          {opt.name}
        </Primitive.Option>
      ))}
    </Primitive.Select>
  ),
}
