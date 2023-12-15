import { useState, useEffect, useMemo, useCallback } from 'react'
import { SFC, mixin, styled } from '@common/styles'
import { AttrType, ID, NamedEntry } from '@common/types'
import Primitive, { Div, Input } from './primitives'
import { Icon } from './icons'
import { Button, IconName } from './buttons'
import { filter, find, isArray, isEmpty, isString, map, sortBy, xor } from 'lodash'

// section #########################################################################################
//  ATTR FIELDS
// #################################################################################################

type Props = {
  value: any
  onChange: (value: any) => void
  placeholder?: string
}

const StyledInput = styled('input', {
  w: '100%',
  h: 32,
  p: 8,
  rad: 4,
  fs: 13,
  lh: 1,
  bg: '#fff',
})

const TextField: SFC<Props> = (props) => {
  return (
    <StyledInput
      type='text'
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      css={props.css}
    />
  )
}

const NumberField: SFC<Props> = (props) => {
  return (
    <StyledInput
      type='number'
      value={props.value}
      onChange={(e) => props.onChange(Number(e.target.value))}
      placeholder={props.placeholder}
      css={props.css}
    />
  )
}

const Checkbox: SFC<Props> = (props) => {
  return (
    <StyledInput
      type='checkbox'
      value={props.value}
      onChange={(e) => props.onChange(Boolean(e.target.value))}
      css={props.css}
    />
  )
}

const DateField: SFC<Props> = (props) => {
  const value = useMemo(() => {
    const date = new Date(props.value)
    const YYYY = date.getFullYear()
    const MM = (date.getMonth() + 1).toString().padStart(2, '0')
    const DD = date.getDate().toString().padStart(2, '0')
    const hh = date.getHours().toString().padStart(2, '0')
    const mm = date.getMinutes().toString().padStart(2, '0')
    return `${YYYY}-${MM}-${DD}T${hh}:${mm}`
  }, [props.value])

  const onChange = useCallback(
    (e: any) => {
      try {
        props.onChange(new Date(e.target.value).toISOString())
      } catch (err) {
        console.error(err)
      }
    },
    [props]
  )

  return <StyledInput type='datetime-local' value={value} onChange={onChange} css={props.css} />
}

// part ==========================================
//  SELECT
// ===============================================

const SelectContent = styled(Primitive.Popover.Content, {
  xw: '80dvw',
  xh: '300px',
  of: 'auto',
  bg: '$gray800',
  rad: 8,
  p: 4,
  c: '$gray100',
  d: 'flex',
  fd: 'column',
  g: 1,
  bsh: '0 0 20px rgba(0 0 0 / 0.5)',
  z: 1,
})

const SelectItem = styled(Primitive.Button, {
  d: 'flex',
  ai: 'center',
  g: 8,
  p: '12px 44px 12px 6px',
  rad: 4,
  fs: 16,
  lh: 1,
  cursor: 'pointer',
  userSelect: 'none',
  // '&:hover': { bg: '#cfcfcf' },
  variants: {
    selected: {
      true: {
        bg: '#cfcfcf',
      },
    },
  },
})

const SelectCheckmark = styled(Icon.Checkmark, {
  s: 13,
  variants: {
    checked: {
      true: { c: '#232323' },
      false: { c: 'transparent' },
    },
  },
})

const Select: SFC<Props & { options: NamedEntry[]; sortOptions?: boolean | string }> = (props) => {
  const { value, onChange } = props
  const sort = props.sortOptions ?? true
  const options = sort ? sortBy(props.options, isString(sort) ? sort : 'name') : props.options
  const selected = find(options, { id: value })
  const isSelected = (id: any) => value === id
  const [open, setOpen] = useState(false)
  return (
    <Primitive.Popover.Root open={open} onOpenChange={setOpen} modal={true}>
      <Primitive.Popover.Trigger css={{ flexShrink: 0 }}>
        <Button corners={4} chevron css={{ w: '100%', jc: 'space-between' }}>
          {selected ? selected.name : 'не выбрано'}
        </Button>
      </Primitive.Popover.Trigger>
      <SelectContent align='start' sideOffset={8} collisionPadding={8}>
        {options.map((opt) => {
          return (
            <SelectItem
              key={opt.id}
              selected={isSelected(opt.id)}
              onClick={() => {
                onChange(opt.id)
                setOpen(false)
              }}
            >
              <SelectCheckmark checked={isSelected(opt.id)} />
              {opt.name}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Primitive.Popover.Root>
  )
}

// part ==========================================
//  MULTI SELECT
// ===============================================

const MultiSelect: SFC<Props & { options: NamedEntry[]; sortOptions?: boolean | string }> = (
  props
) => {
  const { value, onChange } = props
  const sort = props.sortOptions ?? true
  const options = sort ? sortBy(props.options, isString(sort) ? sort : 'name') : props.options
  const selected = useMemo(() => {
    return isArray(value) ? filter(options, ({ id }: any) => value.includes(id)) : []
  }, [value, options])
  const isSelected = (id: any) => isArray(value) && value.includes(id)
  const [open, setOpen] = useState(false)
  const [onlySelected, setOnlySelected] = useState(!isEmpty(selected))
  useEffect(() => {
    if (isEmpty(selected)) setOnlySelected(false)
  }, [selected])
  return (
    <Primitive.Popover.Root open={open} onOpenChange={setOpen} modal={true}>
      <Primitive.Popover.Trigger css={{ flexShrink: 0 }}>
        <Button corners={4} chevron css={{ w: '100%', jc: 'space-between' }}>
          {!isEmpty(selected) ? map(selected, 'name').join(', ') : 'не выбрано'}
        </Button>
      </Primitive.Popover.Trigger>
      <SelectContent align='start' sideOffset={8} collisionPadding={8}>
        {(onlySelected && !isEmpty(selected) ? selected : options).map((opt) => {
          return (
            <SelectItem
              key={opt.id}
              selected={isSelected(opt.id)}
              onClick={() => onChange(xor(value, [opt.id]))}
            >
              <SelectCheckmark checked={isSelected(opt.id)} />
              {opt.name}
            </SelectItem>
          )
        })}
        {!isEmpty(selected) && (
          <Button
            icon='checklist'
            colors={{ background: 'rgb(0 0 0 / 0.15)', active: { color: 'cyan' } }}
            active={onlySelected}
            css={{ pos: 'absolute', in: '8px 8px auto auto' }}
            onClick={() => setOnlySelected(!onlySelected)}
          />
        )}
      </SelectContent>
    </Primitive.Popover.Root>
  )
}

// part ==========================================
//  EXPORT
// ===============================================

const fieldsByType: Record<AttrType, SFC<any>> = {
  string: TextField,
  number: NumberField,
  boolean: Checkbox,
  date: DateField,
  select: Select,
  multi_select: MultiSelect,
}

export const Field: SFC<{
  type: AttrType
  value: any
  onChange: (value: any) => void
  placeholder?: string
  multiline?: boolean
  options?: NamedEntry[]
  sortOptions?: boolean | string
  colors?: 'light' | 'dark'
}> = (props) => {
  const F = fieldsByType[props.type]
  return <F {...props} />
}

// section #########################################################################################
//  CONTROL FIELDS
// #################################################################################################

export const ControlSelect: SFC<{
  value: string
  placeholder?: string
  onChange: (value: string) => void
  options: NamedEntry[]
  icon?: IconName
}> = (props) => {
  const option = find(props.options, { id: props.value })
  const [open, setOpen] = useState(false)
  return (
    <Primitive.Popover.Root open={open} onOpenChange={setOpen} modal={true}>
      <Primitive.Popover.Trigger css={{ flexShrink: 0 }}>
        <Button icon={props.icon} corners='smooth' chevron>
          {option?.name}
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
