import { StateCreator, create as zustand } from 'zustand'
import { devtools } from 'zustand/middleware'
import * as constant from './storage/static'
import * as database from './storage/db'
import { produce } from 'immer'
import lodash, {
  cond,
  filter,
  find,
  first,
  flatten,
  isArray,
  isEmpty,
  isObject,
  isString,
  map,
} from 'lodash'
import {
  Activity,
  CollectionName,
  Enforcement,
  File,
  Group,
  MutCollectionName,
  Target,
  Task,
  Item,
  ItemAttr,
  ID,
} from '@common/types'

interface Storage {
  collections: {
    files: File[]
    enforcements: Enforcement[]
    tasks: Task[]
    groups: Group[]
    activity: Activity[]
  }
  load: (name?: MutCollectionName) => Promise<void>
  initialized: boolean
  init: () => Promise<void>
  get: <T = unknown>(cname: CollectionName, target?: Target) => T
  add: <T = unknown>(cname: MutCollectionName, values: Partial<T>) => Promise<T>
  upd: <T = unknown>(cname: MutCollectionName, target: Target, values: Partial<T>) => void
  del: <T = unknown>(cname: MutCollectionName, target: Target) => void
  getValue: (item: Item, attr: ItemAttr) => { item: Item; path: string; value: any }
}

const init: StateCreator<Storage> = (set, get) => ({
  collections: {
    files: [],
    enforcements: [],
    tasks: [],
    groups: [],
    activity: [],
    ...constant,
  },
  load: async (name?: MutCollectionName) => {
    if (name) {
      const collection = await database[name].get()
      const recipe = (s: Storage) => void (s.collections[name] = collection as any)
      set(produce(recipe))
    } else {
      const [files, enforcements, tasks, groups, activity] = await Promise.all([
        database.files.get(),
        database.enforcements.get(),
        database.tasks.get(),
        database.groups.get(),
        database.activity.get(),
      ])
      const recipe = (s: Storage) => {
        s.collections.files = files
        s.collections.enforcements = enforcements
        s.collections.tasks = tasks
        s.collections.groups = groups
        s.collections.activity = activity
      }
      set(produce(recipe))
    }
  },
  initialized: false,
  init: async () => {
    if (!get().initialized) {
      await get().load()
      set({ initialized: true })
    }
  },
  get: (cname: CollectionName, target?: Target) => {
    const [c, t] = [cname, target] as any
    // @ts-expect-error
    const collection = get().collections[c]
    if (!t) return collection
    const elements = cond([
      [() => isString(t), () => find(collection, { id: t })],
      [() => isArray(t), () => filter(collection, (el) => t.includes(el.id))],
      [() => isObject(t), () => filter(collection, t)],
    ])()
    if (!elements) console.error(`NOT FOUND: ${cname} collection with target ${target}`)
    return elements
  },
  add: async (cname, values) => {
    const [c, v] = [cname, values] as any
    const created = await cond<Promise<any>>([
      [() => c === 'files', () => database.files.create(v)],
      [() => c === 'enforcements', () => database.enforcements.create()],
      [() => c === 'tasks', () => database.tasks.create(v)],
      [() => c === 'groups', () => database.groups.create(v)],
    ])()
    await get().load(cname)
    return created
  },
  upd: async (cname, target, values) => {
    const [c, t, v] = [cname, target, values] as any
    // @ts-expect-error
    const collection = get().collections[c]
    const elements = cond([
      [() => isString(t), () => [find(collection, { id: t })]],
      [() => isArray(t), () => filter(collection, (el) => t.includes(el.id))],
      [() => isObject(t), () => filter(collection, t)],
    ])()
    const ids = map(elements, 'id')
    await cond<Promise<any>>([
      [() => c === 'files', () => database.files.update(ids, v)],
      [() => c === 'enforcements', () => database.enforcements.update(ids, v)],
      [() => c === 'tasks', () => database.tasks.update(ids, v)],
      [() => c === 'groups', () => database.groups.update(ids, v)],
    ])()
    await get().load(cname)
  },
  del: async (cname, target) => {
    const [c, t, v] = [cname, target] as any
    // @ts-expect-error
    const collection = get().collections[c]
    const elements = cond([
      [() => isString(t), () => [find(collection, { id: t })]],
      [() => isArray(t), () => filter(collection, (el) => t.includes(el.id))],
      [() => isObject(t), () => filter(collection, t)],
    ])()
    const ids = map(elements, 'id')
    await cond<Promise<any>>([
      [() => c === 'files', () => database.files.delete(ids)],
      [() => c === 'enforcements', () => database.enforcements.delete(ids)],
      [() => c === 'tasks', () => database.tasks.delete(ids)],
      [() => c === 'groups', () => database.groups.delete(ids)],
    ])()
    await get().load(cname)
  },
  getValue: (item: Item, attr: ItemAttr) => {
    const [[_, path], ...rest] = attr.path.split('->').map((chunk) => chunk.split(':'))
    const value = lodash.get(item, path)
    if (isEmpty(rest)) return { item, path, value }
    const iter = (chunks: string[][], i: number, id: ID): any => {
      const [cname, path] = chunks[i] as [CollectionName, string]
      const item = get().get<Item>(cname, id)
      const value = lodash.get(item, path)
      const j = i + 1
      if (j === chunks.length) return { item, path, value }
      const res = isArray(value) ? value.map((v) => iter(chunks, j, v)) : iter(chunks, j, value)
      return !isArray(res) || !isArray(first(res)) ? res : flatten(res)
    }
    const res = isArray(value) ? value.map((v) => iter(rest, 0, v)) : iter(rest, 0, value)
    return !isArray(res) || !isArray(first(res)) ? res : flatten(res)
  },
})

export const useStorage = zustand<Storage>()(devtools(init)) //todo persist

// update('groups', 'id1', { name: 'new' })
// update('groups', ['id1', 'id2'], { name: 'new' })
// update('groups', { name: 'old' }, { name: 'new' })
// update({ src: 'groups', target: 'id1' }, { name: 'new' })
// update({ src: 'groups', target: ['id1', 'id2'] }, { name: 'new' })
// update({ src: 'groups', target: { name: 'old'} }, { name: 'new' })
