import { every, flatten, get, isEmpty, property } from 'lodash'
import { SFC } from '@common/styles'
import { CollectionName, ItemAttr, File, Task, Entry } from '@common/types'
import { Collection } from '@common/utils'
import { useStorage } from '@common/storage'
import { Popover, Root, Trigger } from './filter/layout'
import { Menu, Rule, Ruleset } from './filter/rules'
import { getOperator } from './filter/operators'

// section #########################################################################################
//  UTILS
// #################################################################################################

/**
 * Produces a predicate function that checks if every rule in a set is applied.
 * (!) There might be advanced tree-like rulesets later.
 * @param rules a set of rules to generate a predicate function for
 * @returns predicate function to be used in `array.filter()`
 */
export const useFilterPredicate = (rules: Rule[], attrs: CollectionName) => {
  const get = useStorage((s) => s.get)
  const getValue = (item: Entry, path: string) => {
    return null //todo implement
  }
  return (item: Entry): boolean => {
    return rules.every((rule) => {
      const attr = get<ItemAttr>(attrs, rule.attr)
      const op = getOperator(rule.operator)
      return op.compare(getValue(item, attr.path), rule.input)
    })
  }
}

// section #########################################################################################
//  FILTER
// #################################################################################################

export const Filter: SFC<{
  rules: Rule[]
  setRules: (rules: Rule[]) => void
  attrs: CollectionName
}> = (props) => {
  const { rules, setRules, attrs } = props
  return (
    <Root>
      <Trigger highlight={!isEmpty(rules)} />
      <Popover>
        <Ruleset>
          {rules.map((rule) => (
            <Rule
              key={rule.id}
              rule={rule}
              updRule={(v) => setRules(Collection.update(rules, [rule.id], v))}
              delRule={() => setRules(Collection.delete(rules, [rule.id]))}
              attrs={attrs}
            />
          ))}
        </Ruleset>
        <Menu attrs={attrs} addRule={(v) => setRules(Collection.add(rules, v))} />
      </Popover>
    </Root>
  )
}
