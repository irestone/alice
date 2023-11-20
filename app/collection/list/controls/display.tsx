import { useState, useRef, ReactNode } from 'react'
import { SFC, styled } from '@common/styles'
import { ID, ItemAttr, NamedEntry } from '@common/types'
import { Button } from '@lib/buttons'
import { CardVariant } from '@lib/cards'
import { Popover } from '@lib/popover'
import { isArray, isEmpty, isPlainObject, xor } from 'lodash'
import { Body, Foot, Head, Row, Search, Section } from './common'

export const Display: SFC<{
  variant: CardVariant
  onVariantChange: (variant: CardVariant) => void
  content: ID[]
  onContentChange: (attrs: ID[]) => void
  attrs: ItemAttr[] | [NamedEntry, ItemAttr[]]
}> = (props) => {
  const { variant, onVariantChange } = props
  const { content, onContentChange } = props
  const { attrs } = props
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
      <Head>
        <Search value={searchValue} onChange={setSearchValue} />
      </Head>
      <Body>
        {!isEmpty(attrs) && isPlainObject(attrs[0]) ? (
          <Section>
            {attrs.map((attr: any) => (
              <Row key={attr.id} attr={attr} />
            ))}
          </Section>
        ) : (
          attrs.map(([module, attrs]: any) => (
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
          ))
        )}
      </Body>
    </Popover>
  )
}
