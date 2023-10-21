import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { produce } from 'immer'

import { TFile, TGroup, TTask } from './_types'
import db, { NewFileProps, NewGroupProps, NewTaskProps } from './db'
import { forEach, isArray, zip } from 'lodash'

// section #########################################################################################
//  UTILS
// #################################################################################################

const createDataRefresher = (db: any, set: any) => {
  return async (target: string | string[]) => {
    if (isArray(target)) {
      const targets = target
      const itemGroups = await Promise.all(targets.map((name) => db[name].get()))
      const itemsPerTarget = zip(targets, itemGroups)
      set(
        produce((s: any) => {
          forEach(itemsPerTarget, ([target, items]) => {
            s.data[target as string].items = items
          })
        })
      )
    } else {
      const items = await db[target].get()
      set(
        produce((s: any) => {
          s.data[target].items = items
        })
      )
    }
  }
}

// section #########################################################################################
//  STORE
// #################################################################################################

interface IGlobalStore {
  data: {
    files: {
      items: TFile[]
      create: (props: NewFileProps) => Promise<TFile>
      update: (ids: string[], changes: Partial<TFile>) => Promise<void>
      delete: (ids: string[]) => Promise<void>
    }
    tasks: {
      items: TTask[]
      create: (props: NewTaskProps) => Promise<TTask>
      update: (ids: string[], changes: Partial<TTask>) => Promise<void>
      delete: (ids: string[]) => Promise<void>
    }
    groups: {
      items: TGroup[]
      create: (props: NewGroupProps) => Promise<TGroup>
      update: (ids: string[], changes: Partial<TGroup>) => Promise<void>
      delete: (ids: string[]) => Promise<void>
    }
    loaded: boolean
    load: () => Promise<void>
  }
}

export const useGlobalStore = create<IGlobalStore>()(
  devtools(
    (set) => {
      const refresh = createDataRefresher(db, set)
      return {
        data: {
          files: {
            items: [],
            create: async (props) => {
              const file = await db.files.create(props)
              await refresh('files')
              return file
            },
            update: async (ids, changes) => {
              await db.files.update(ids, changes)
              await refresh('files')
            },
            delete: async (ids) => {
              await db.files.delete(ids)
              await refresh('files')
            },
          },
          tasks: {
            items: [],
            create: async (props) => {
              const task = await db.tasks.create(props)
              await refresh('tasks')
              return task
            },
            update: async (ids, changes) => {
              await db.tasks.update(ids, changes)
              await refresh('tasks')
            },
            delete: async (ids) => {
              await db.tasks.delete(ids)
              await refresh('tasks')
            },
          },
          groups: {
            items: [],
            create: async (props) => {
              const group = await db.groups.create(props)
              await refresh('groups')
              return group
            },
            update: async (ids, changes) => {
              await db.groups.update(ids, changes)
              await refresh('groups')
            },
            delete: async (ids) => {
              await db.groups.delete(ids)
              await refresh('groups')
            },
          },
          loaded: false,
          load: async () => {
            await refresh(['files', 'tasks', 'groups'])
            set(
              produce((s) => {
                s.data.loaded = true
              })
            )
          },
        },
        // computed: {
        //   get pinnedFiles() { return filter(get().files, 'pinned') },
        //   get groupedFiles() { return [] },
        //   get uncategorizedFiles() { return [] },
        // }
      }
    },
    { name: 'app', store: 'global' }
  )
)
