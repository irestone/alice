import { StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Category, ID } from '@common/types'
import { CardVariant } from '@lib/cards'
import { Rule } from '@app/collection/list/controls'

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
    status: 'working',
    grouping: 'custom',
    expandedGroups: [],
    variant: 'normal',
    content: [
      'files:general.fullname',
      'files:general.birthday',
      'files:general.inn',
      'files:general.snils',
      'files:general.regions',
      'files:general.notion',
    ],
    filtering: false,
    filter: [],
    set: (values) => set((s) => ({ ...s, files: { ...s.files, ...values } })),
  },
  tasks: {
    status: 'working',
    grouping: 'custom',
    expandedGroups: [],
    variant: 'normal',
    content: ['tasks:description'],
    filtering: false,
    filter: [],
    set: (values) => set((s) => ({ ...s, tasks: { ...s.tasks, ...values } })),
  },
})

export const useState = create<State>()(devtools(init))
export const useSettings = (module: Category) => useState((s) => s[module])
