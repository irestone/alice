import { concat, filter, map, merge, reject, uniqueId } from 'lodash'

import { TFile, TGroup, TTask } from '../_types'
import stubFiles from './files.json'
import stubTasks from './tasks.json'
import stubGroups from './groups.json'

// section #########################################################################################
//  UTILS
// #################################################################################################

const collection = {
  add: (collection: any[], items: any) => {
    return concat(collection, items)
  },
  update: (collection: any[], ids: string[], changes: any) => {
    return map(collection, (item) => (ids.includes(item.id) ? merge(item, changes) : item))
  },
  delete: (collection: any[], ids: string[]) => {
    return reject(collection, (item) => ids.includes(item.id))
  },
}

// section #########################################################################################
//  DB:FILES
// #################################################################################################

export type NewFileProps = { prop1: string; prop2?: number; prop3?: boolean }

let FILES = stubFiles as TFile[]

const files = {
  get: () => Promise.resolve<TFile[]>(FILES),
  create: ({ prop3 = false, ...restProps }: NewFileProps) => {
    const file: TFile = {
      id: uniqueId(),
      status: 'in_work',
      groups: [],
      pinned: false,
      data: {
        prop3,
        prop4: new Date().toISOString(),
        ...restProps,
      },
    }
    FILES = collection.add(FILES, file)
    return Promise.resolve(file)
  },
  update: (ids: string[], changes: Partial<TFile>) => {
    FILES = collection.update(FILES, ids, changes)
    return Promise.resolve()
  },
  delete: (ids: string[]) => {
    FILES = collection.delete(FILES, ids)
    return Promise.resolve()
  },
}

// section #########################################################################################
//  DB:TASKS
// #################################################################################################

export type NewTaskProps = { name: string; description?: string; files?: string[] }

let TASKS = stubTasks as TTask[]

const tasks = {
  get: () => Promise.resolve<TTask[]>(TASKS),
  create: ({ name, description = '', files = [] }: NewTaskProps) => {
    const task: TTask = {
      id: uniqueId(),
      status: 'in_work',
      files,
      groups: [],
      pinned: false,
      data: {
        name,
        description,
      },
    }
    TASKS = collection.add(TASKS, task)
    return Promise.resolve(task)
  },
  update: (ids: string[], changes: Partial<TTask>) => {
    TASKS = collection.update(TASKS, ids, changes)
    return Promise.resolve()
  },
  delete: (ids: string[]) => {
    TASKS = collection.delete(TASKS, ids)
    return Promise.resolve()
  },
}

// section #########################################################################################
//  DB:GROUPS
// #################################################################################################

export type NewGroupProps = { name: string }

let GROUPS = stubGroups as any as TGroup[]

const groups = {
  get: () => Promise.resolve<TGroup[]>(GROUPS),
  create: ({ name }: NewGroupProps) => {
    const group: TGroup = { id: uniqueId(), name }
    GROUPS = collection.add(GROUPS, group)
    return Promise.resolve(group)
  },
  update: (ids: string[], changes: Partial<TGroup>) => {
    GROUPS = collection.update(GROUPS, ids, changes)
    return Promise.resolve()
  },
  delete: (ids: string[]) => {
    GROUPS = collection.delete(GROUPS, ids)
    return Promise.resolve()
  },
}

// section #########################################################################################
//  EXPORT
// #################################################################################################

const db = { files, tasks, groups }

export default db
