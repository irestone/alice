import { StateCreator, create as zustand } from 'zustand'
import { devtools } from 'zustand/middleware'
import { produce } from 'immer'
import lodash, { first, flatten, isArray, isEmpty, isString, map } from 'lodash'
import {
  Activity,
  CollectionName,
  File,
  Group,
  Target,
  Task,
  Item,
  ItemAttr,
  ID,
  BailiffDept,
  Court,
  EnforcementNote,
  EnforcementProceeding,
} from '@common/types'
import { getTarget } from './utils'
import * as database from './storage/db'
import * as constant from './storage/static'

type GetValueFn = <T = any>(
  item: Item,
  attr: ItemAttr | string
) => { item: Item; path: string; value: T } | { item: Item; path: string; value: T }[]

interface Storage {
  collections: {
    activity: Activity[]
    bailiffDepts: BailiffDept[]
    courts: Court[]
    enforcementNotes: EnforcementNote[]
    enforcementProceedings: EnforcementProceeding[]
    files: File[]
    groups: Group[]
    tasks: Task[]
  }
  load: (cname?: CollectionName) => Promise<void>
  initialized: boolean
  init: () => Promise<void>
  get: <T = unknown>(cname: CollectionName, target?: Target) => T
  add: <T = unknown>(cname: CollectionName, values: Partial<T>) => Promise<T>
  upd: <T = unknown>(cname: CollectionName, target: Target, values: Partial<T>) => void
  del: <T = unknown>(cname: CollectionName, target: Target) => void
  getValue: GetValueFn
  mobileSearch: boolean
  setMobileSearch: (v: boolean) => void
}

const create: StateCreator<Storage> = (set, get) => ({
  collections: {
    activity: [],
    bailiffDepts: [],
    courts: [],
    enforcementNotes: [],
    enforcementProceedings: [],
    files: [],
    groups: [],
    tasks: [],
    ...constant,
  },
  load: async (cname?: CollectionName) => {
    if (cname) {
      // @ts-expect-error
      const collection = await database[cname].get()
      // @ts-expect-error
      const recipe = (s: Storage) => void (s.collections[cname] = collection as any)
      set(produce(recipe))
    } else {
      const cnames: CollectionName[] = [
        'activity',
        'bailiffDepts',
        'courts',
        'enforcementNotes',
        'enforcementProceedings',
        'files',
        'groups',
        'tasks',
      ]
      // @ts-expect-error
      const result = await Promise.all(cnames.map((cname) => database[cname].get()))
      const recipe = (s: Storage) => {
        cnames.forEach((cname, index) => {
          // @ts-expect-error
          s.collections[cname] = result[index]
        })
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
    const elements = getTarget(collection, t)
    if (!elements) console.error(`NOT FOUND: ${cname} collection with target ${target}`)
    return elements
  },
  add: async (cname, values) => {
    // @ts-expect-error
    const item = await database[cname].create(values)
    await get().load(cname)
    return item
  },
  upd: async (cname, target, values) => {
    const [c, t, v] = [cname, target, values] as any
    // @ts-expect-error
    const collection = get().collections[c]
    const elements = getTarget(collection, t)
    const ids = map(elements, 'id')
    // @ts-expect-error
    await database[c].update(ids, v)
    await get().load(c)
  },
  del: async (cname, target) => {
    const [c, t, v] = [cname, target] as any
    // @ts-expect-error
    const collection = get().collections[c]
    const elements = getTarget(collection, t)
    const ids = map(elements, 'id')
    // @ts-expect-error
    await database[c].delete(ids)
    await get().load(c)
  },
  getValue: (item: Item, attr: ItemAttr | string) => {
    const fullpath = isString(attr) ? attr : attr.path
    const [[_, path], ...rest] = fullpath.split('->').map((chunk) => chunk.split(':'))
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
  mobileSearch: false,
  setMobileSearch: (value) => set({ mobileSearch: value }),
})

export const useStorage = zustand<Storage>()(devtools(create))

// update('groups', 'id1', { name: 'new' })
// update('groups', ['id1', 'id2'], { name: 'new' })
// update('groups', { name: 'old' }, { name: 'new' })
// update({ src: 'groups', target: 'id1' }, { name: 'new' })
// update({ src: 'groups', target: ['id1', 'id2'] }, { name: 'new' })
// update({ src: 'groups', target: { name: 'old'} }, { name: 'new' })
