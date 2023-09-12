import { xor } from 'lodash'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ISelection {
  selection: string[]
  toggle: (id: string) => void
  clear: () => void
}

export const useSelection = create<ISelection>()(
  devtools(
    (set) => ({
      selection: [],
      toggle: (id: string) => {
        set((state) => ({ ...state, selection: xor(state.selection, [id]) }))
      },
      clear: () => set((s) => ({ ...s, selection: [] })),
    }),
    { name: 'selection', store: 'controlPanel' }
  )
)
