import { ReactNode, useState } from 'react'
import { CollectionName, Entry, ItemAttr, Module, NamedEntry } from '@common/types'
import { Rule, createRule } from './filter/rules'
import { SFC, styled } from '@common/styles'
import lodash, { filter, find, isEmpty, isPlainObject, map, noop, reject } from 'lodash'
import { Button } from '@lib/buttons'
import { Popover } from '@lib/popover'
import { Body, Foot, Head, Root, Row, Search, Section } from './common'
import { update } from '@common/utils'
import { useStorage } from '@common/storage'
import Fuse from 'fuse.js'

// section #########################################################################################
//  FILTER
// #################################################################################################

export const Filter: SFC<{
  applied: boolean
  onAppliedChange: (applied: boolean) => void
  rules: Rule[]
  onRulesChange: (rules: Rule[]) => void
  attrs: ItemAttr[]
}> = (props) => {
  const { applied, onAppliedChange } = props
  const { rules, onRulesChange } = props
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  // @ts-expect-error
  const modules = useStorage((s) => s.collections.modules) as Module[]
  const attrs = props.attrs
    .filter((attr) => attr.filter)
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
          const mod = find(modules, { id })
          if (!mod) throw new Error(`MODULE ${id} NOT FOUND`)
          return mod
        })
        .sortBy('order')
        .map((m: Module) => [m, attrs.filter((i) => i.module === m.id)])
        .value() as any)
    : []

  const [view, setView] = useState<'attrs' | 'rules'>(isEmpty(props.rules) ? 'attrs' : 'rules')
  const onAddRule = (attr: any) => {
    onRulesChange([...rules, createRule(attr)])
    setView('rules')
  }
  return (
    <Popover
      trigger={
        <Button
          icon='filter'
          colors={{ preset: 'no_bg', active: { background: '#dddddd', color: '#131313' } }}
          corners='smooth'
          active={applied}
          onClick={(e) => {
            const nextApplied = !applied
            onAppliedChange(nextApplied)
            if (nextApplied && isEmpty(rules)) setOpen(true)
            e.stopPropagation()
          }}
          onHold={() => {
            setOpen(true)
            onAppliedChange(true)
          }}
        />
      }
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (!o && isEmpty(rules)) onAppliedChange(false)
      }}
      modal={true}
      css={{ w: 280, xh: '300px', of: 'auto' }}
    >
      {view === 'rules' && !isEmpty(rules) ? (
        <Root>
          <Body>
            {rules.map((r) => (
              <Section key={r.id}>
                <Rule
                  rule={r}
                  updateRule={(c) => onRulesChange(update(rules, { id: r.id }, c, true) as any)}
                  deleteRule={() => onRulesChange(reject(rules, { id: r.id }))}
                  attrs={attrs}
                />
              </Section>
            ))}
          </Body>
          <Foot>
            <Button icon='plus' onClick={() => setView('attrs')}>
              Добавить
            </Button>
          </Foot>
        </Root>
      ) : (
        <Root>
          {attrs.length > 10 && (
            <Head>
              <Search value={query} onChange={setQuery} />
            </Head>
          )}
          <Body>
            {!isEmpty(rows) && (
              <Section>
                {rows.map((attr: any) => (
                  <Row
                    key={attr.id}
                    attr={attr}
                    actions={
                      <Button
                        icon='plus'
                        colors={{ preset: 'no_bg', color: '#ccc', background: '#eaeaea' }}
                        corners='round'
                        onClick={() => onAddRule(attr)}
                      />
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
                        icon='plus'
                        colors={{ preset: 'no_bg', color: '#ccc', background: '#eaeaea' }}
                        corners='round'
                        onClick={() => onAddRule(attr)}
                      />
                    }
                  />
                ))}
              </Section>
            ))}
          </Body>
          {!isEmpty(rules) && (
            <Foot>
              <Button icon='back' onClick={() => setView('rules')}>
                Назад
              </Button>
            </Foot>
          )}
        </Root>
      )}
    </Popover>
  )
}
