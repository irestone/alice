import { concat, filter, map, merge, uniqueId } from 'lodash'

import { TContentType, TFile, TGroup, TTask } from '../types'
import stubFiles from './files.json'
import stubTasks from './tasks.json'
import stubGroups from './groups.json'

// section #########################################################################################
//  FILES
// #################################################################################################

let FILES: TFile[] = stubFiles

const getFiles = () => Promise.resolve<TFile[]>(FILES)

const createFile = (prop1: string) => {
  const file: TFile = {
    id: uniqueId(),
    pinned: false,
    groups: [],
    prop1,
    prop3: false,
    prop4: new Date().toISOString(),
  }
  FILES = concat(FILES, file)
  return Promise.resolve(file)
}

const updateFiles = (changes: Partial<TFile>, files: string[]) => {
  FILES = map(FILES, (item) => (files.includes(item.id) ? merge(changes, item) : item))
  return Promise.resolve()
}

const deleteFiles = (files: string[]) => {
  FILES = filter(FILES, ({ id }) => !files.includes(id))
  return Promise.resolve()
}

// section #########################################################################################
//  TASKS
// #################################################################################################

let TASKS: TTask[] = stubTasks

const getTasks = () => Promise.resolve<TTask[]>(TASKS)

export type NewTaskProps = {
  name: string
  description?: string
  files?: string[]
}

const createTask = ({ name, description = '', files = [] }: NewTaskProps) => {
  const task: TTask = { id: uniqueId(), files, name, description, groups: [], pinned: false }
  TASKS = concat(TASKS, task)
  return Promise.resolve(task)
}

const updateTasks = (changes: Partial<TTask>, tasks: string[]) => {
  TASKS = map(TASKS, (item) => (tasks.includes(item.id) ? merge(changes, item) : item))
  return Promise.resolve()
}

const deleteTasks = (tasks: string[]) => {
  TASKS = filter(TASKS, ({ id }) => !tasks.includes(id))
  return Promise.resolve()
}

// section #########################################################################################
//  GROUPS
// #################################################################################################

let GROUPS: TGroup[] = stubGroups as any

const getGroups = () => Promise.resolve<TGroup[]>(GROUPS)

const createGroup = (name: string, contentType: TContentType) => {
  const group: TGroup = { id: uniqueId(), contentType, name }
  GROUPS = concat(GROUPS, group)
  return Promise.resolve(group)
}

const updateGroup = (changes: Partial<TGroup>, group: string) => {
  GROUPS = GROUPS.map((item) => (item.id === group ? merge(changes, item) : item))
  return Promise.resolve()
}

const deleteGroup = (group: string) => {
  GROUPS = filter(GROUPS, ({ id }) => id !== group)
  return Promise.resolve()
}

// section #########################################################################################
//  EXPORT
// #################################################################################################

const db = {
  getFiles,
  createFile,
  updateFiles,
  deleteFiles,
  getTasks,
  createTask,
  updateTasks,
  deleteTasks,
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
}

export default db
