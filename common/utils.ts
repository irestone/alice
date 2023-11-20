import {
  concat,
  isArray,
  isNull,
  isObject,
  isString,
  isUndefined,
  map,
  matches,
  matchesProperty,
  merge,
  property,
  reject,
} from 'lodash'
import useMeasure from 'react-use-measure'
import { create } from 'zustand'

// section #########################################################################################
//  ARRAYS
// #################################################################################################

export const replace: <T>(arr: T[], predicate: any, replacement: T) => T[] = (
  arr,
  p: any,
  r: any
) => {
  let match: (v: any) => boolean
  if (isObject(p)) match = matches(p)
  else if (isArray(p)) match = matchesProperty(p[0], p[1])
  else if (isString(p)) match = (el: any) => !!property(p)(el)
  else throw new Error('Unknown predicate format')
  return map(arr, (el) => (match(el) ? r : el))
}

export const update: <T>(arr: T[], predicate: any, updatement: T) => T[] = (
  arr,
  p: any,
  u: any
) => {
  let match: (v: any) => boolean
  if (isObject(p)) match = matches(p)
  else if (isArray(p)) match = matchesProperty(p[0], p[1])
  else if (isString(p)) match = (el: any) => !!property(p)(el)
  else throw new Error('Unknown predicate format')
  return map(arr, (el) => (match(el) ? merge(el, u) : el))
}

export const Collection = {
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

export const purge = (arr: any[]) => arr.filter((el) => !isUndefined(el) && !isNull(el))

// section #########################################################################################
//  MEDIA & CONTAINER QUERIES
// #################################################################################################

// HOOKS

export const useViewportMeasure = create<{
  measure: any
  setMeasure: (measure: any) => void
}>()((set) => ({
  measure: { width: 0, height: 0 },
  setMeasure: (measure) => set({ measure }),
}))

export function useMediaQueries() {
  const w = useViewportMeasure((s) => s.measure.width)
  return (min: number, max?: number) => (max ? min <= w && w < max : min <= w)
}

export function useContainerQueries() {
  const [ref, { width: w }] = useMeasure()
  return [ref as any, (min: number, max?: number) => (max ? min <= w && w < max : min <= w)]
}

// CSS QUERY BUILDERS

/**
 * Generates CSS media query string
 * @param name continer name (optional)
 * @param min lower breakpoint
 * @param max higher breakpoint (optional)
 */
export function mq(min: number, max?: number): string {
  return max
    ? `@media (min-width: ${min}px) and (max-width: ${max}px)`
    : `@media (min-width: ${min}px)`
}

/**
 * Generates CSS container query string
 * @param name continer name (optional)
 * @param min lower breakpoint
 * @param max higher breakpoint (optional)
 */
export function cq(min: number, max?: number): string
export function cq(name: string, min: number, max?: number): string
export function cq(a: string | number, b?: number, c?: number): string {
  if (c !== undefined && b !== undefined) {
    const [name, min, max] = [a, b, c]
    return `@container ${name} (min-width: ${min}px) and (max-width: ${max}px)`
  }
  if (b !== undefined) {
    if (typeof a === 'string') {
      const [name, min] = [a, b]
      return `@container ${name} (min-width: ${min}px)`
    } else {
      const [min, max] = [a, b]
      return `@container (min-width: ${min}px) and (max-width: ${max}px)`
    }
  }
  const min = a
  return `@container (min-width: ${min}px)`
}

// section #########################################################################################
//  EVENTS
// #################################################################################################

//!fix handle mouse hold
export const holdListener = (ref: any, cb: () => void, dur?: number) => {
  const d = dur ?? 300
  let el: HTMLElement
  let holdId: any
  const set = () => void (holdId = setTimeout(cb, d))
  const clear = () => void (holdId && clearTimeout(holdId))
  const addListeners = () => {
    el?.addEventListener('touchstart', set)
    el?.addEventListener('touchend', clear)
    el?.addEventListener('touchcancel', clear)
    el?.addEventListener('touchmove', clear)
  }
  const removeListeners = () => {
    el?.removeEventListener('touchstart', set)
    el?.removeEventListener('touchend', clear)
    el?.removeEventListener('touchcancel', clear)
    el?.removeEventListener('touchmove', clear)
  }
  let setupId: any
  const setup = (): void => {
    const { current } = ref
    if (!current) return void (setupId = setTimeout(setup, 100))
    el = current
    removeListeners()
    addListeners()
  }
  setup()
  return () => {
    removeListeners()
    if (holdId) clearTimeout(holdId)
    if (setupId) clearTimeout(setupId)
  }
}
