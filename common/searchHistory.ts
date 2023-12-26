import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'
import { concat } from 'lodash'

const SEARCH_HISTORY_LENGTH = 30

type SearchResult = { query: string; href: string }

type State = {
  history: SearchResult[]
  add: (query: string, href: string) => void
}

const init: StateCreator<State> = (set, get) => ({
  history: [],
  add: (query, href) => {
    const history = concat({ query, href }, get().history).slice(0, SEARCH_HISTORY_LENGTH)
    set({ history })
  },
})

export const useSearchHistory = create<State>()(persist(init, { name: 'search-history' }))
