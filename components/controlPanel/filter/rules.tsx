import { SFC, styled } from '../../../_styles'
import {
  Button,
  Div,
  RadixDropdownMenuContent,
  RadixDropdownMenuItem,
  RadixDropdownMenuPortal,
  RadixDropdownMenuRoot,
  RadixDropdownMenuTrigger,
  Span,
} from '../../_primitives'
import { OPERATOR, Operator, PROPERTY, Property, TPropertyType } from './_utils'

// section #########################################################################################
//  INPUT FIELDS
// #################################################################################################

const inputFieldsByPropertyType: Record<TPropertyType, any> = {
  text: () => <input type='text' />,
  number: () => <input type='number' />,
  select: () => (
    <select>
      <option value='a'>a</option>
      <option value='b'>b</option>
    </select>
  ),
  multi_select: () => (
    <select>
      <option value='a'>a</option>
      <option value='b'>b</option>
    </select>
  ),
  checkbox: () => <input type='checkbox' />,
}

// section #########################################################################################
//  RULES SET
// #################################################################################################

export type TRule = {
  id: string
  property: PROPERTY
  operator: OPERATOR
  input?: any
}

export const getProperty = (rule: TRule) => Property[rule.property]
export const getOperator = (rule: TRule) => Operator[rule.operator]

interface IRule {
  rule: TRule
  update: (changes: Partial<TRule>) => void
  remove: () => void
}

export const Rule: SFC<IRule> = ({ rule, update, remove }) => {
  const InputField = inputFieldsByPropertyType[getProperty(rule).type]
  return (
    <Div css={{ display: 'flex', gap: '.5rem', input: { background: 'white' } }}>
      <Span>{getProperty(rule).label}</Span>
      <select
        value={getOperator(rule).key}
        onChange={(e) => update({ operator: e.target.value as OPERATOR })}
      >
        {getProperty(rule).operators.map((key) => (
          <option key={key} value={key}>
            {Operator[key].label}
          </option>
        ))}
      </select>
      {getOperator(rule).type === 'binary' && (
        <InputField
          value={rule.input}
          onChange={(e: any) => update({ input: e.target.value })}
          options={getProperty(rule).options}
        />
      )}
      <Button onClick={remove}>убрать</Button>
    </Div>
  )
}

export const Ruleset = styled('div', {
  padding: '.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '.3rem',
})

// section #########################################################################################
//  NEW RULE MENU
// #################################################################################################

export const NewRuleMenu: SFC = ({ children }) => {
  return (
    <RadixDropdownMenuRoot>
      <RadixDropdownMenuTrigger>+ new rule</RadixDropdownMenuTrigger>
      <RadixDropdownMenuPortal>
        <RadixDropdownMenuContent>{children}</RadixDropdownMenuContent>
      </RadixDropdownMenuPortal>
    </RadixDropdownMenuRoot>
  )
}

export const NewRuleMenuItem = RadixDropdownMenuItem
