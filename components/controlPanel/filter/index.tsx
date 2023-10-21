import { every, flatten, isEmpty, map, merge, property, reject } from 'lodash'

import { SFC } from '../../../_styles'
import { PROPERTY, Property, TProperty } from './_utils'
import { Popover, Root } from './layout'
import Trigger from './trigger'
import {
  NewRuleMenu,
  NewRuleMenuItem,
  Rule,
  Ruleset,
  TRule,
  getOperator,
  getProperty,
} from './rules'

interface IFilter {
  value: TRule[]
  onChange: (value: TRule[]) => void
  properties: PROPERTY[]
}

const Filter: SFC<IFilter> = ({ value: rules, onChange: setRules, properties }) => {
  const addRule = (property: TProperty) => {
    console.log(`NEW RULE FOR: ${property.label}`)
  }

  const updateRule = (id: string, changes: Partial<TRule>) => {
    const newRules = map(rules, (rule) => (rule.id === id ? merge(rule, changes) : rule))
    setRules(newRules)
  }

  const removeRule = (id: string) => {
    const newRules = reject(rules, { id })
    setRules(newRules)
  }

  return (
    <Root>
      <Trigger highlight={!isEmpty(rules)} />
      <Popover>
        <Ruleset>
          {rules.map((rule) => (
            <Rule
              key={rule.id}
              rule={rule}
              update={(changes) => updateRule(rule.id, changes)}
              remove={() => removeRule(rule.id)}
            />
          ))}
        </Ruleset>
        <NewRuleMenu>
          {properties.map((key) => (
            <NewRuleMenuItem key={key} onSelect={() => addRule(Property[key])}>
              {Property[key].label}
            </NewRuleMenuItem>
          ))}
        </NewRuleMenu>
      </Popover>
    </Root>
  )
}

// section #########################################################################################
//  UTILS
// #################################################################################################

// Simply checks if every rule in a set is applied
// There might be advanced tree-like rulesets later
const producePredicate = (rules: TRule[], path: string | string[] = '') => {
  return (item: any): boolean => {
    return every(rules, (rule) => {
      const compare = getOperator(rule).comparator
      const getValue = property(flatten([path, getProperty(rule).key]))
      return compare(getValue(item), rule.input)
    })
  }
}

export { Filter, producePredicate }
export { PROPERTY, fileProperties, taskProperties } from './_utils'
export type { TRule } from './rules'
