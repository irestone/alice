import { ReactNode, useState } from 'react'
import { CollectionName, Entry, ItemAttr, NamedEntry } from '@common/types'
import { SFC, styled } from '@common/styles'
import { Div, H3, Input } from '@lib/primitives'
import { Icon } from '@lib/icons'
import { isEmpty, isPlainObject } from 'lodash'
import { Button } from '@lib/buttons'

export const Search: SFC<{ value: string; onChange: (v: string) => void }> = (props) => {
  return (
    <Div css={{ pos: 'relative', w: '100%' }}>
      <Input
        type='text'
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        css={{
          w: '100%',
          rad: 999,
          p: '8px 28px 8px 26px',
          bd: '1px solid #ededed',
          bg: '#eaeaea',
          '&:focus': { borderColor: '#eaeaea', bsh: '0 0 16px rgba(0 0 0 / 0.2)' },
          '&:focus + *': { '--color': '#bbb' },
        }}
      />
      <Icon.Search
        css={{
          s: 12,
          pos: 'absolute',
          in: '0 auto 0 10px',
          m: 'auto',
          c: '#cecece',
          pe: 'none',
        }}
      />
      {!isEmpty(props.value) && (
        <Button
          icon='close'
          colors={{ preset: 'no_bg', color: '#bbb' }}
          size={-1}
          css={{ pos: 'absolute', in: '0 6px 0 auto', m: 'auto' }}
          onClick={() => props.onChange('')}
        />
      )}
    </Div>
  )
}

export const Row: SFC<{ attr: ItemAttr; actions?: ReactNode }> = ({ attr, actions }) => (
  <Div css={{ d: 'flex', jc: 'space-between', ai: 'center', g: 16, px: 8 }}>
    <Div css={{ flex: 1, fs: 13, lh: 16 / 13 }}>{attr.fullname ?? attr.name}</Div>
    {actions && <Div css={{ d: 'flex', g: 8, flexShrink: 0 }}>{actions}</Div>}
  </Div>
)

export const Section: SFC<{ name?: string }> = ({ name, children, css }) => (
  <Div css={{ d: 'flex', fd: 'column', g: 8, '& + &': { mt: 16 }, ...css }}>
    {name && <H3 css={{ fs: 16, m: 8, xw: 'calc(100% - 32px)' }}>{name}</H3>}
    {children}
  </Div>
)

export const NoResults: SFC = () => (
  <Div css={{ px: 8, fs: 13, lh: 16 / 13 }}>Нет результатов поиска</Div>
)

export const Head = styled('div', { p: 8, pb: 0, pos: 'sticky', t: 0 })
export const Body = styled('div', { p: 8, py: 16 })
export const Foot = styled('div', { p: 8, pt: 0, pos: 'sticky', b: 0 })
export const Root = styled('div')
