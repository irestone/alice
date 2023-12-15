import { StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Category, ID } from '@common/types'
import { CardVariant } from '@lib/cards'
import { Rule } from '@app/collection/list/controls'
import { persist, createJSONStorage } from 'zustand/middleware'
import { merge } from 'lodash'

type Settings = {
  status: ID
  grouping: ID
  expandedGroups: ID[]
  variant: CardVariant
  content: ID[]
  filtering: boolean
  filter: Rule[]
}
type Setter = (values: Partial<Settings>) => void
type State = Record<Category, Settings & { set: Setter }>

const init: StateCreator<State> = (set) => ({
  files: {
    status: 'current',
    grouping: 'courts',
    expandedGroups: [],
    variant: 'normal',
    content: [],
    filtering: false,
    filter: [],
    set: (values) => set((s) => ({ ...s, files: { ...s.files, ...values } })),
  },
  tasks: {
    status: 'current',
    grouping: 'custom',
    expandedGroups: [],
    variant: 'normal',
    content: [],
    filtering: false,
    filter: [{ id: 'default', attr: 'tasks:description', operator: 'contains', input: 'pr' }],
    set: (values) => set((s) => ({ ...s, tasks: { ...s.tasks, ...values } })),
  },
})

const defaultSettings = {
  files: {
    content: [
      'files:general.birthday',
      'files:general.address',
      'files:general.regions',
      'files:general.notion',
    ],
  },
  tasks: {
    content: ['tasks:description', 'tasks:priority', 'tasks:files'],
  },
}

export const useState = create<State>()(
  persist(init, {
    name: 'settings',
    merge: (cache, state) => merge(state, cache ?? defaultSettings),
  })
)
export const useSettings = (module: Category) => useState((s) => s[module])
