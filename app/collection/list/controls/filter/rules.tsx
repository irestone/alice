import { Div, DropdownMenu, Span, Select, Option } from 'lib/primitives'
import { useStorage } from '@common/storage'
import { SFC, styled } from '@common/styles'
import { AttrType, CollectionName, Entry, ID, ItemAttr, NamedEntry } from '@common/types'
import { getOperator } from './operators'
import { filter, find, first } from 'lodash'
import { Button } from '@lib/buttons'
import { AttrField } from '@lib/fields'

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
  const get = useStorage((s) => s.get)
  const attrOptions = attr.options ? get<NamedEntry[]>(attr.options) : null
  const attrOperators = getOperator((op) => op.attrTypes.includes(attr.type))
  const operator = getOperator(rule.operator)
  const SelectOperator = AttrField.select
  const InputField = AttrField[attr.type]
  return (
    <Div css={{ d: 'flex', fd: 'column', g: 8 }}>
      <Div css={{ flex: 1, d: 'flex', jc: 'space-between' }}>
        <Span css={{ fs: 13, lh: 16 / 13, ml: 8, my: 8 }}>{attr.fullname ?? attr.name}</Span>
        <Button icon='close' colors={{ preset: 'no_bg', color: '#aaa' }} onClick={deleteRule} />
      </Div>
      <SelectOperator
        value={rule.operator}
        onChange={(e: any) => updateRule({ operator: e.target.value })}
        options={attrOperators}
        css={{ w: '100%' }}
      />
      {operator.type === 'binary' && (
        <InputField
          value={rule.input}
          onChange={(e: any) => updateRule({ input: e.target.value })}
          options={attrOptions}
        />
      )}
    </Div>
  )
}

export const createRule = (attr: ItemAttr): Rule => {
  const op = getOperator((op) => op.attrTypes.includes(attr.type))[0]
  return { id: new Date().toISOString(), attr: attr.id, operator: op.id }
}
