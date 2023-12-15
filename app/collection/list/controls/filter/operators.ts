import {
  isEmpty,
  some,
  isArray,
  isNull,
  isUndefined,
  property as _property,
  every,
  find,
  filter,
  isString,
  isObject,
  isFunction,
} from 'lodash'
import { AttrType, NamedEntry } from '@common/types'

export type Comparator = (value: any, input?: any) => boolean
export type OperatorType = 'binary' | 'unary'
export type Operator = NamedEntry & {
  type: OperatorType
  attrTypes: AttrType[]
  compare: Comparator
}

// normalizers
const ns = (v: any) => String(v).toLowerCase()
const nn = (v: any) => parseInt(v)
const nb = (v: any) => Boolean(v)

const operators: Operator[] = [
  {
    id: 'is',
    name: '—',
    type: 'binary',
    attrTypes: ['string', 'select', 'date'],
    compare: (v, i) => (isUndefined(i) ? isNull(v) : v === i),
  },
  {
    id: 'not',
    name: 'не',
    type: 'binary',
    attrTypes: ['string', 'select', 'date'],
    compare: (v, i) => (isUndefined(i) ? !isNull(v) : v !== i),
  },
  {
    id: 'contains',
    name: 'содержит',
    type: 'binary',
    attrTypes: ['string'],
    compare: (v, i) => (isUndefined(i) ? true : ns(v)?.includes(ns(i))),
  },
  {
    id: 'doesNotContain',
    name: 'не содержит',
    type: 'binary',
    attrTypes: ['string'],
    compare: (v, i) => (isUndefined(i) ? true : !ns(v)?.includes(i)),
  },
  {
    id: 'startsWith',
    name: 'начинается на',
    type: 'binary',
    attrTypes: ['string'],
    compare: (v, i) => (isUndefined(i) ? true : ns(v).startsWith(ns(i))),
  },
  {
    id: 'endsWith',
    name: 'кончается на',
    type: 'binary',
    attrTypes: ['string'],
    compare: (v, i) => (isUndefined(i) ? true : ns(v).endsWith(ns(i))),
  },
  {
    id: 'containsAll',
    name: 'содержит все из',
    type: 'binary',
    attrTypes: ['multi_select'],
    compare: (v, i) => every(i, (el) => v.includes(el)),
  },
  {
    id: 'containsSome',
    name: 'содержит что-то из',
    type: 'binary',
    attrTypes: ['multi_select'],
    compare: (v, i) => some(i, (el) => v.includes(el)),
  },
  {
    id: 'doesNotContainAny',
    name: 'не содержит ничего из',
    type: 'binary',
    attrTypes: ['multi_select'],
    compare: (v, i) => !some(i, (el) => v.includes(el)),
  },
  {
    id: 'doesNotContainSome',
    name: 'не содержит чего-то из',
    type: 'binary',
    attrTypes: ['multi_select'],
    compare: (v, i) => !every(i, (el) => v.includes(el)),
  },
  {
    id: 'eq',
    name: '=',
    type: 'binary',
    attrTypes: ['number'],
    compare: (v, i) => (isUndefined(i) ? isNull(v) : nn(v) === nn(i)),
  },
  {
    id: 'neq',
    name: '≠',
    type: 'binary',
    attrTypes: ['number'],
    compare: (v, i) => (isUndefined(i) ? !isNull(v) : nn(v) !== nn(i)),
  },
  {
    id: 'lt',
    name: '<',
    type: 'binary',
    attrTypes: ['number'],
    compare: (v, i) => (isUndefined(i) ? true : isNull(v) ? false : nn(v) < nn(i)),
  },
  {
    id: 'lte',
    name: '≤',
    type: 'binary',
    attrTypes: ['number'],
    compare: (v, i) => (isUndefined(i) ? true : isNull(v) ? false : nn(v) <= nn(i)),
  },
  {
    id: 'gt',
    name: '>',
    type: 'binary',
    attrTypes: ['number'],
    compare: (v, i) => (isUndefined(i) ? true : isNull(v) ? false : nn(v) > nn(i)),
  },
  {
    id: 'gte',
    name: '≥',
    type: 'binary',
    attrTypes: ['number'],
    compare: (v, i) => (isUndefined(i) ? true : isNull(v) ? false : nn(v) >= nn(i)),
  },
  {
    id: 'true',
    name: 'да',
    type: 'unary',
    attrTypes: ['boolean'],
    compare: (v) => nb(v),
  },
  {
    id: 'false',
    name: 'нет',
    type: 'unary',
    attrTypes: ['boolean'],
    compare: (v) => !nb(v),
  },
  {
    id: 'before',
    name: 'до',
    type: 'binary',
    attrTypes: ['date'],
    compare: (v, i) => v && new Date(v) < new Date(i),
  },
  {
    id: 'after',
    name: 'после',
    type: 'binary',
    attrTypes: ['date'],
    compare: (v, i) => v && new Date(v) > new Date(i),
  },
  {
    id: 'defined',
    name: 'задано',
    type: 'unary',
    attrTypes: ['string', 'number', 'select', 'multi_select', 'date'],
    compare: (v) => {
      if (isString(v)) return !isEmpty(v) && !isNull(v)
      if (isArray(v)) return !isEmpty(v)
      return !isNull(v) && !isUndefined(v)
    },
  },
  {
    id: 'undefined',
    name: 'не задано',
    type: 'unary',
    attrTypes: ['string', 'number', 'select', 'multi_select', 'date'],
    compare: (v) => {
      if (isString(v)) return isEmpty(v) || isNull(v)
      if (isArray(v)) return isEmpty(v)
      return isNull(v) || isUndefined(v)
    },
  },
]

type Callback = (op: Operator) => boolean

export function getOperator(id: string): Operator
export function getOperator(by: Partial<Operator>): Operator[]
export function getOperator(cb: Callback): Operator[]
export function getOperator(target: string | Partial<Operator> | Callback) {
  if (isFunction(target) || isObject(target)) return filter(operators, target)
  const op = find(operators, { id: target })
  if (!op) throw new Error(`Operator ${target} does not exist`)
  return op
}
