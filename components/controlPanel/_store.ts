import { xor } from 'lodash'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { produce } from 'immer'

import { FILE_STATUS, TASK_STATUS, TCategory } from '../../_types'
import { TRule } from './filter'
import { FILES_GROUPING, TASKS_GROUPING } from './groups'

// section #########################################################################################
//  SETTINGS
// #################################################################################################

export type TCategorySettings = {
  status: FILE_STATUS | TASK_STATUS
  filter: TRule[]
  grouping: FILES_GROUPING | TASKS_GROUPING
  expandedGroups: string[]
}

export type TSettings = Record<TCategory, TCategorySettings>

const getDefaultSettings = (): TSettings => {
  return {
    files: {
      status: FILE_STATUS.IN_WORK,
      grouping: FILES_GROUPING.CUSTOM,
      filter: [],
      expandedGroups: [],
    },
    tasks: {
      status: TASK_STATUS.IN_WORK,
      grouping: TASKS_GROUPING.CUSTOM,
      filter: [],
      expandedGroups: [],
    },
  }
}

const getInitialSettings = (): TSettings => {
  return getDefaultSettings()
}

interface ISettingsStoreAPI {
  settings: TSettings
  setSettings: (setter: (settings: TSettings) => void) => void
}

// todo: persist
export const useSettings = create<ISettingsStoreAPI>()(
  devtools(
    (set) => ({
      settings: getInitialSettings(),
      setSettings: (setter) =>
        set(
          produce((s) => {
            setter(s.settings)
          })
        ),
    }),
    { name: 'settings', store: 'controlPanel' }
  )
)

// section #########################################################################################
//  CONTROL PANEL
// #################################################################################################

interface IControlPanelStoreAPI {
  selection: string[]
  toggleSelect: (id: string) => void
  clearSelection: () => void
}

export const useControlPanelStore = create<IControlPanelStoreAPI>()(
  devtools(
    (set, get) => ({
      selection: [],
      toggleSelect: (id: string) => set({ selection: xor(get().selection, [id]) }),
      clearSelection: () => set((s) => ({ ...s, selection: [] })),
    }),
    { name: 'main', store: 'controlPanel' }
  )
)
