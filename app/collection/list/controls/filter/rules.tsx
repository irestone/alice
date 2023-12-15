import { Div, DropdownMenu, Span, Select, Option } from 'lib/primitives'
import { useStorage } from '@common/storage'
import { SFC, styled } from '@common/styles'
import { AttrType, CollectionName, Entry, ID, ItemAttr, NamedEntry } from '@common/types'
import { getOperator } from './operators'
import { filter, find, first } from 'lodash'
import { Button } from '@lib/buttons'
import { Field } from '@lib/fields'

export type Rule = Entry & { attr: ID; operator: ID; input?: any }
export type NewRule = { attr: ID; operator: ID; input?: any }

export const Rule: SFC<{
  rule: Rule
  updateRule: (changes: Partial<Rule>) => void
  deleteRule: () => void
  attrs: ItemAttr[]
}> = (props) => {
  const { rule, updateRule, deleteRule } = props
  const attr = find(props.attrs, { id: rule.attr })
  if (!attr) throw new Error(`attr not found ${rule.attr}`)
  const operator = getOperator(rule.operator)
  const operators = getOperator((op) => op.attrTypes.includes(attr.type))
  const get = useStorage((s) => s.get)
  const inputOptions = attr.options ? get<NamedEntry[]>(attr.options) : undefined
  return (
    <Div css={{ d: 'flex', fd: 'column', g: 8 }}>
      <Div css={{ flex: 1, d: 'flex', jc: 'space-between' }}>
        <Span css={{ fs: 13, lh: 16 / 13, ml: 8, my: 8 }}>{attr.fullname ?? attr.name}</Span>
        <Button icon='close' colors={{ preset: 'no_bg', color: '#aaa' }} onClick={deleteRule} />
      </Div>
      <Field
        type='select'
        value={rule.operator}
        onChange={(v) => updateRule({ operator: v })}
        options={operators}
        sortOptions={false}
        css={{ w: '100%' }}
      />
      {operator.type === 'binary' && (
        <Field
          type={attr.type}
          value={rule.input}
          onChange={(v) => updateRule({ input: v })}
          options={inputOptions}
        />
      )}
    </Div>
  )
}

export const createRule = (attr: ItemAttr): Rule => {
  const operator = getOperator((op) => op.attrTypes.includes(attr.type))[0].id
  return { id: new Date().toISOString(), attr: attr.id, operator }
}
