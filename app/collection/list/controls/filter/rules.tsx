import { Div, DropdownMenu, Span } from 'lib/primitives'
import { useStorage } from '@common/storage'
import { SFC, styled } from '@common/styles'
import { AttrType, CollectionName, Entry, ID, ItemAttr, NamedEntry } from '@common/types'
import { getOperator } from './operators'
import { filter, find, first } from 'lodash'
import { Button } from '@lib/buttons'
import { AttrField } from '@lib/fields'

export type Rule = Entry & { attr: ID; operator: ID; input?: any }
export type NewRule = { attr: ID; operator: ID; input?: any }

// section #########################################################################################
//  RULES
// #################################################################################################

export const Rule: SFC<{
  rule: Rule
  updRule: (changes: Partial<Rule>) => void
  delRule: () => void
  attrs: CollectionName
}> = (props) => {
  const { rule, updRule, delRule } = props
  const get = useStorage((s) => s.get)
  const attr = get<ItemAttr>(props.attrs, rule.attr)
  const attrs = get<ItemAttr[]>(props.attrs)
  const inputOpts = attr.options ? get<NamedEntry[]>(attr.options) : null
  const InputField = AttrField
  return (
    <Div css={{ d: 'flex', g: '.5rem', input: { bg: 'white' } }}>
      <select value={rule.attr} onChange={(e) => updRule({ attr: e.target.value })}>
        {attrs.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
      <select value={rule.operator} onChange={(e) => updRule({ operator: e.target.value })}>
        {getOperator((op) => op.attrTypes.includes(attr.type)).map((op) => (
          <option key={op.id} value={op.id}>
            {op.name}
          </option>
        ))}
      </select>
      {/* {getOperator(rule.operator).type === 'binary' && (
        <InputField
          value={rule.input}
          onChange={(e: any) => updRule({ input: e.target.value })}
          options={inputOpts}
        />
      )} */}
      <Button onClick={delRule}>убрать</Button>
    </Div>
  )
}

export const Ruleset = styled('div', { p: 8, d: 'flex', fd: 'column', g: 4 })

// section #########################################################################################
//  MENU
// #################################################################################################

export const Menu: SFC<{
  attrs: CollectionName
  addRule: (values: NewRule) => void
}> = (props) => {
  const get = useStorage((s) => s.get)
  const attrs = get(props.attrs) as ItemAttr[]
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>+ add rule</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          {attrs.map((opt) => (
            <DropdownMenu.Item
              key={opt.id}
              onClick={() => console.log(`add rule: ${opt.fullname}`)}
            >
              {opt.fullname}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
