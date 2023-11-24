import react from 'react'
import { CollectionName, Entry, Group, ID, ItemAttr, Item } from '@common/types'
import { Rule } from './controls/filter/rules'
import { useStorage } from '@common/storage'
import { getOperator } from './controls/filter/operators'
import lodash, { find, isEmpty, isPlainObject } from 'lodash'

// section #########################################################################################
//  FILTERING
// #################################################################################################

/**
 * Produces a predicate function that checks if every rule in a set is applied.
 * (!) There might be advanced tree-like rulesets later.
 * @param rules a set of rules to generate a predicate function for
 * @returns predicate function to be used in `array.filter()`
 */
export const useFilterPredicate = (rules: Rule[], attrs: CollectionName) => {
  const get = useStorage((s) => s.get)
  const getValue = useStorage((s) => s.getValue)
  return (item: Item): boolean => {
    return rules.every((rule) => {
      const attr = get<ItemAttr>(attrs, rule.attr)
      const op = getOperator(rule.operator)
      return op.compare(getValue(item, attr).value, rule.input)
    })
  }
}

// section #########################################################################################
//  GROUPING
// #################################################################################################

type GroupEntry = [Group, Item[]]

const specialGroups: Record<string, Group> = {
  pinned: { id: 'pinned', name: 'Закрепленные' },
  ungrouped: { id: 'ungrouped', name: 'Без группы' },
}

export const groupBy = (items: Item[], groups: Group[], grouping: ID): GroupEntry[] => {
  if (grouping === 'custom') {
    const pinned = [specialGroups.pinned, items.filter((i) => i.pinned)]
    const ungrouped = [specialGroups.ungrouped, items.filter((i) => !i.pinned && isEmpty(i.groups))]
    const custom = lodash
      .chain(items)
      .map('groups')
      .flatten()
      .uniq()
      .map((id) => {
        const group = find(groups, { id })
        if (!group) throw new Error(`GROUP ${id} NOT FOUND`)
        return group
      })
      .sortBy('name')
      .map((g) => [g, items.filter((i) => i.groups.includes(g.id))])
      .value()
    return [pinned, ...custom, ungrouped].filter(([_, items]) => !isEmpty(items)) as GroupEntry[]
  }
  console.error('Uncommon grouping needs implementation')
  return []
}
