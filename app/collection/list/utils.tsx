import react from 'react'
import {
  CollectionName,
  Entry,
  Group,
  ID,
  ItemAttr,
  Item,
  Court,
  File,
  NamedEntry,
  EnforcementProceeding,
  Region,
  BailiffDept,
  Task,
  TaskPriority,
} from '@common/types'
import { Rule } from './controls/filter/rules'
import { useStorage } from '@common/storage'
import { getOperator } from './controls/filter/operators'
import lodash, { find, isArray, isEmpty, isNull, isPlainObject, map } from 'lodash'

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
      const result = getValue(item, attr)
      return op.compare(isArray(result) ? map(result, 'value') : result.value, rule.input)
    })
  }
}

// section #########################################################################################
//  GROUPING
// #################################################################################################

type GroupEntry = [NamedEntry, Item[]]

const specialGroups: Record<string, NamedEntry> = {
  pinned: { id: 'pinned', name: 'Закрепленные' },
  ungrouped: { id: 'ungrouped', name: 'Без группы' },
  undefined: { id: 'undefined', name: 'Не указано' },
  noProceedings: { id: 'noProceedings', name: 'Нет запущенных производств' },
}

export const useGrouping = (items: Item[], grouping: ID): GroupEntry[] => {
  const get = useStorage((s) => s.get)
  const getValue = useStorage((s) => s.getValue)
  switch (grouping) {
    case 'custom': {
      const pinned = [specialGroups.pinned, items.filter((i) => i.pinned)]
      const ungrouped = [
        specialGroups.ungrouped,
        items.filter((i) => !i.pinned && isEmpty(i.groups)),
      ]
      const custom = lodash
        .chain(items)
        .map('groups')
        .flatten()
        .uniq()
        .map((id) => get<Group>('groups', id))
        .sortBy((group) => group.name.toLowerCase())
        .map((group) => [group, items.filter((i) => i.groups.includes(group.id))])
        .value()
      return [pinned, ...custom, ungrouped].filter(([_, items]) => !isEmpty(items)) as GroupEntry[]
    }
    case 'courts': {
      const files = items as File[]
      const defined = lodash
        .chain(files)
        .map((f) => f.cases.court)
        .uniq()
        .reject(isNull)
        .map((id: string) => get<Court>('courts', id))
        .sortBy((court: any) => court.name.toLowerCase())
        .map((court: any) => [court, files.filter((f) => f.cases.court === court.id)])
        .value() as GroupEntry[]
      const undefined = [specialGroups.undefined, files.filter((f) => isNull(f.cases.court))]
      return [...defined, undefined].filter(([_, items]) => !isEmpty(items)) as GroupEntry[]
    }
    case 'regions': {
      const regionAttr = get<ItemAttr>(
        'fileAttrs',
        'files:enforcementProceedings->enforcementProceedings:region'
      )
      const getRegions = (file: File) => map(getValue(file, regionAttr), 'value')
      const files = items as File[]
      const proc = lodash
        .chain(files)
        .map(getRegions)
        .flatten()
        .uniq()
        .map((id) => get<Region>('regions', id))
        .sortBy((region: any) => region.name.toLowerCase())
        .map((region) => [region, files.filter((f) => getRegions(f).includes(region.id))])
        .value() as GroupEntry[]
      const noproc = [specialGroups.noProceedings, files.filter((f) => isEmpty(getRegions(f)))]
      return [...proc, noproc].filter(([_, items]) => !isEmpty(items)) as GroupEntry[]
    }
    case 'bailiff_depts': {
      const btAttr = get<ItemAttr>(
        'fileAttrs',
        'files:enforcementProceedings->enforcementProceedings:bailiffDept'
      )
      const getBTs = (file: File) => map(getValue(file, btAttr), 'value')
      const files = items as File[]
      const proc = lodash
        .chain(files)
        .map(getBTs)
        .flatten()
        .uniq()
        .map((id) => get<BailiffDept>('bailiffDepts', id))
        .sortBy((bt: any) => bt.name.toLowerCase())
        .map((bt) => [bt, files.filter((f) => getBTs(f).includes(bt.id))])
        .value() as GroupEntry[]
      const noproc = [specialGroups.noProceedings, files.filter((f) => isEmpty(getBTs(f)))]
      return [...proc, noproc].filter(([_, items]) => !isEmpty(items)) as GroupEntry[]
    }
    case 'priorities': {
      const tasks = items as Task[]
      return lodash
        .chain(tasks)
        .map((t) => t.priority)
        .uniq()
        .map((id: string) => get<TaskPriority>('taskPriorities', id))
        .sortBy('level')
        .map((priority: any) => [priority, tasks.filter((t) => t.priority === priority.id)])
        .value() as GroupEntry[]
    }
    default: {
      throw new Error(`Unknown grouping variant: "${grouping}"`)
    }
  }
}
