import { useState, useRef, ReactNode } from 'react'
import { SFC, styled } from '@common/styles'
import { ID, ItemAttr, Module, NamedEntry } from '@common/types'
import { Button } from '@lib/buttons'
import { CardVariant } from '@lib/cards'
import { Popover } from '@lib/popover'
import lodash, { filter, find, isArray, isEmpty, isPlainObject, reject, xor } from 'lodash'
import { Body, Foot, Head, Row, Search, Section } from './common'
import { useStorage } from '@common/storage'

// todo: keep attr order from props.attrs when

export const Display: SFC<{
  variant: CardVariant
  onVariantChange: (variant: CardVariant) => void
  content: ID[]
  onContentChange: (attrs: ID[]) => void
  attrs: ItemAttr[]
}> = (props) => {
  const { variant, onVariantChange } = props
  const { content, onContentChange } = props

  // @ts-expect-error
  const modules = useStorage((s) => s.collections.modules) as Module[]
  const attrs = filter(props.attrs, 'display')
  const rows = reject(attrs, 'module')
  const sections: [Module, ItemAttr[]] = lodash
    .chain(attrs)
    .filter('module')
    .map('module')
    .flatten()
    .uniq()
    .map((id: string) => {
      const mod = find(modules, { id })
      if (!mod) throw new Error(`MODULE ${id} NOT FOUND`)
      return mod
    })
    .sortBy('order')
    .map((m: Module) => [m, attrs.filter((i) => i.module === m.id)])
    .value() as any

  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  return (
    <Popover
      trigger={
        <Button
          icon={variant === 'normal' ? 'collapse' : 'expand'}
          colors='no_bg'
          onClick={(e) => {
            onVariantChange(variant === 'normal' ? 'condensed' : 'normal')
            setOpen(false)
            e.stopPropagation()
          }}
          onHold={() => setOpen(true)}
        />
      }
      open={open}
      onOpenChange={setOpen}
      modal={true}
      css={{ w: 280, xh: '300px', of: 'auto' }}
    >
      {attrs.length > 10 && (
        <Head>
          <Search value={searchValue} onChange={setSearchValue} />
        </Head>
      )}
      <Body>
        {!isEmpty(rows) && (
          <Section>
            {rows.map((attr) => (
              <Row
                key={attr.id}
                attr={attr}
                actions={
                  <Button
                    colors='default_inversed'
                    active={content.includes(attr.id)}
                    onClick={() => onContentChange(xor(content, [attr.id]))}
                  >
                    switch
                  </Button>
                }
              />
            ))}
          </Section>
        )}
        {sections.map(([module, attrs]: any) => (
          <Section key={module.id} name={module.name}>
            {attrs.map((attr: any) => (
              <Row
                key={attr.id}
                attr={attr}
                actions={
                  <Button
                    colors='default_inversed'
                    active={content.includes(attr.id)}
                    onClick={() => onContentChange(xor(content, [attr.id]))}
                  >
                    switch
                  </Button>
                }
              />
            ))}
          </Section>
        ))}
      </Body>
    </Popover>
  )
}
