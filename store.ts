import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { TContentType, TFile, TGroup, TTask } from './types'
import db, { NewTaskProps } from './db'

interface IGlobalStoreAPI {
  files: TFile[]
  createFile: (prop1: string) => Promise<TFile>
  updateFiles: (changes: Partial<TFile>, files: string[]) => Promise<void>
  deleteFiles: (files: string[]) => Promise<void>
  tasks: TTask[]
  createTask: (props: NewTaskProps) => Promise<TTask>
  updateTasks: (changes: Partial<TTask>, tasks: string[]) => Promise<void>
  deleteTasks: (tasks: string[]) => Promise<void>
  groups: TGroup[]
  createGroup: (name: string, contentType: TContentType) => Promise<TGroup>
  updateGroup: (changes: Partial<TGroup>, group: string) => Promise<void>
  deleteGroup: (group: string) => Promise<void>
  loaded: boolean
  load: () => Promise<void>
}

export const useGlobalStore = create<IGlobalStoreAPI>()(
  devtools(
    (set) => ({
      files: [],
      createFile: async (prop1: string) => {
        const file = await db.createFile(prop1)
        set({ files: await db.getFiles() })
        return file
      },
      updateFiles: async (changes: Partial<TFile>, files: string[]) => {
        await db.updateFiles(changes, files)
        set({ files: await db.getFiles() })
      },
      deleteFiles: async (files: string[]) => {
        await db.deleteFiles(files)
        set({ files: await db.getFiles() })
      },
      tasks: [],
      createTask: async (props: NewTaskProps) => {
        const task = await db.createTask(props)
        set({ tasks: await db.getTasks() })
        return task
      },
      updateTasks: async (changes: Partial<TTask>, tasks: string[]) => {
        await db.updateTasks(changes, tasks)
        set({ tasks: await db.getTasks() })
      },
      deleteTasks: async (tasks: string[]) => {
        await db.deleteTasks(tasks)
        set({ tasks: await db.getTasks() })
      },
      groups: [],
      createGroup: async (name: string, contentType: TContentType) => {
        const group = await db.createGroup(name, contentType)
        set({ groups: await db.getGroups() })
        return group
      },
      updateGroup: async (changes: Partial<TGroup>, group: string) => {
        await db.updateGroup(changes, group)
        set({ groups: await db.getGroups() })
      },
      deleteGroup: async (group: string) => {
        await db.deleteGroup(group)
        set({ groups: await db.getGroups() })
      },
      loaded: false,
      load: async () => {
        // setTimeout(async () => {
        const [files, tasks, groups] = await Promise.all([
          db.getFiles(),
          db.getTasks(),
          db.getGroups(),
        ])
        set({ files: files, tasks: tasks, groups: groups, loaded: true })
        // }, 3000)
      },
      // computed: {
      //   get pinnedFiles() { return filter(get().files, 'pinned') },
      //   get groupedFiles() { return [] },
      //   get uncategorizedFiles() { return [] },
      // }
    }),
    { name: 'app', store: 'global' }
  )
)
