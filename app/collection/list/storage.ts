import { StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { produce } from 'immer'
import { Category, ID } from '@common/types'
import { Rule } from './controls'
import { merge } from 'lodash'
import { CardVariant } from '@lib/cards'

type Settings = {
  status: ID
  filter: Rule[]
  grouping: ID
  expandedGroups: ID[]
  cardVariant: CardVariant
  // cardAttrs: ID[]
}
type Setter = (values: Partial<Settings>) => void
type State = Record<Category, Settings & { set: Setter }>

const init: StateCreator<State> = (set) => ({
  files: {
    status: 'working',
    grouping: 'custom',
    filter: [],
    expandedGroups: [],
    cardVariant: 'normal',
    // cardAttrs: [],
    set: (values) => set(produce((s: State) => void merge(s, values))),
  },
  tasks: {
    status: 'working',
    grouping: 'custom',
    filter: [],
    expandedGroups: [],
    cardVariant: 'normal',
    // cardAttrs: [],
    set: (values) => set(produce((s: State) => void merge(s, values))),
  },
})

export const useState = create<State>()(devtools(init))
export const useSettings = (cat: Category) => useState((s) => s[cat])
