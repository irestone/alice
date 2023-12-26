import { useState, useRef, ReactNode } from 'react'
import { SFC, styled } from '@common/styles'
import { ID, ItemAttr, Module, NamedEntry } from '@common/types'
import { Button } from '@lib/buttons'
import { CardVariant } from '@lib/cards'
import { Popover } from '@lib/popover'
import lodash, { filter, find, isArray, isEmpty, isPlainObject, map, reject, xor } from 'lodash'
import { Body, Foot, Head, NoResults, Row, Search, Section } from './common'
import { useStorage } from '@common/storage'
import Fuse from 'fuse.js'

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
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  // @ts-expect-error
  const modules = useStorage((s) => s.collections.modules) as Module[]
  const attrs = props.attrs
    .filter((attr) => attr.display)
    .map((attr) => (attr.fullname ? attr : { ...attr, fullname: attr.name }))
  const fuse = new Fuse(attrs, { keys: ['fullname'], threshold: 0.4, ignoreLocation: true })

  const rows = isEmpty(query) ? reject(attrs, 'module') : map(fuse.search(query), 'item')
  const sections: [Module, ItemAttr[]] = isEmpty(query)
    ? (lodash
        .chain(attrs)
        .filter('module')
        .map('module')
        .flatten()
        .uniq()
        .map((id: string) => {
          const m = find(modules, { id })
          if (!m) throw new Error(`MODULE ${id} NOT FOUND`)
          return m
        })
        .sortBy('order')
        .map((m: Module) => [m, attrs.filter((attr) => attr.module === m.id)])
        .value() as any)
    : []

  return (
    <Popover
      trigger={
        <Button
          icon={variant === 'normal' ? 'collapse' : 'expand'}
          colors='no_bg'
          onClick={(e) => {
            const nextVariant = variant === 'normal' ? 'condensed' : 'normal'
            onVariantChange(nextVariant)
            if (nextVariant === 'normal' && isEmpty(content)) setOpen(true)
            e.stopPropagation()
          }}
          onHold={() => {
            setOpen(true)
            onVariantChange('normal')
          }}
        />
      }
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (!o && isEmpty(content)) onVariantChange('condensed')
      }}
      modal={true}
      css={{ w: 280, xh: '300px', of: 'auto' }}
    >
      {attrs.length > 10 && (
        <Head>
          <Search value={query} onChange={setQuery} />
        </Head>
      )}
      <Body>
        {query && isEmpty(rows) && isEmpty(sections) && <NoResults />}
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
