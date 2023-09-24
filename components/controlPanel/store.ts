import { xor } from 'lodash'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { TContentType } from './types'

interface IControlPanelStoreAPI {
  contentType: TContentType
  setContentType: (ct: TContentType) => void
  selection: string[]
  toggleSelect: (id: string) => void
  clearSelection: () => void
}

export const useControlPanelStore = create<IControlPanelStoreAPI>()(
  devtools(
    (set, get) => ({
      contentType: 'files',
      setContentType: (contentType) => set({ contentType }),
      selection: [],
      toggleSelect: (id: string) => set({ selection: xor(get().selection, [id]) }),
      clearSelection: () => set((s) => ({ ...s, selection: [] })),
    }),
    { name: 'main', store: 'controlPanel' }
  )
)
