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

type ItemGroup = [Group, any[]]

const specialGroups: Record<string, Group> = {
  pinned: { id: 'pinned', name: 'Закрепленные' },
  ungrouped: { id: 'ungrouped', name: 'Без группы' },
}

const collectCustomGroupIds = (items: any[]) => {
  return lodash.chain(items).map('groups').flatten().uniq().sortBy().value()
}

const findGroup = (groups: Group[], predicate: any) => {
  const group = find(groups, predicate)
  if (!group) throw new Error(`GROUP NOT FOUND`)
  return group
}

export const groupBy = (items: any[], groups: Group[], grouping: ID): ItemGroup[] => {
  if (grouping === 'custom') {
    return [
      [specialGroups.pinned, items.filter((el) => el.pinned)],
      ...(collectCustomGroupIds(items).map((id) => {
        return [findGroup(groups, { id }), items.filter((el) => el.groups.includes(id))]
      }) as ItemGroup[]),
      [specialGroups.ungrouped, items.filter((el) => !el.pinned && isEmpty(el.groups))],
    ].filter(([_, items]) => !isEmpty(items)) as any
  }
  console.error('Uncommon grouping needs implementation')
  return []
}
