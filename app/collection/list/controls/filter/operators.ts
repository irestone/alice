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

const n = (s: string) => s?.toLowerCase()

const operators: Operator[] = [
  {
    id: 'is',
    name: '—',
    type: 'binary',
    attrTypes: ['string', 'select'],
    compare: (v, i) => v === i,
  },
  {
    id: 'not',
    name: 'не',
    type: 'binary',
    attrTypes: ['string', 'select'],
    compare: (v, i) => v !== i,
  },
  {
    id: 'contains',
    name: 'содержит',
    type: 'binary',
    attrTypes: ['string'],
    compare: (v, i) => n(v)?.includes(n(i)),
  },
  {
    id: 'doesNotContain',
    name: 'не содержит',
    type: 'binary',
    attrTypes: ['string'],
    compare: (v, i) => !n(v)?.includes(i),
  },
  {
    id: 'startsWith',
    name: 'начинается на',
    type: 'binary',
    attrTypes: ['string'],
    compare: (v, i) => n(v).startsWith(n(i)),
  },
  {
    id: 'endsWith',
    name: 'кончается на',
    type: 'binary',
    attrTypes: ['string'],
    compare: (v, i) => n(v).endsWith(n(i)),
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
    compare: (v, i) => v === i,
  },
  {
    id: 'neq',
    name: '≠',
    type: 'binary',
    attrTypes: ['number'],
    compare: (v, i) => v !== i,
  },
  {
    id: 'lt',
    name: '<',
    type: 'binary',
    attrTypes: ['number'],
    compare: (v, i) => v < i,
  },
  {
    id: 'gt',
    name: '>',
    type: 'binary',
    attrTypes: ['number'],
    compare: (v, i) => v > i,
  },
  {
    id: 'lte',
    name: '≤',
    type: 'binary',
    attrTypes: ['number'],
    compare: (v, i) => v <= i,
  },
  {
    id: 'gte',
    name: '≥',
    type: 'binary',
    attrTypes: ['number'],
    compare: (v, i) => v >= i,
  },
  {
    id: 'checked',
    name: 'отмечено',
    type: 'unary',
    attrTypes: ['boolean'],
    compare: (v) => Boolean(v),
  },
  {
    id: 'unchecked',
    name: 'не отмечено',
    type: 'unary',
    attrTypes: ['boolean'],
    compare: (v) => Boolean(v),
  },
  {
    id: 'defined',
    name: 'указано',
    type: 'unary',
    attrTypes: ['string', 'number', 'select', 'multi_select'],
    compare: (v) => {
      if (isString(v)) return !isEmpty(v) && !isNull(v)
      if (isArray(v)) return !isEmpty(v)
      return !isNull(v) && !isUndefined(v)
    },
  },
  {
    id: 'undefined',
    name: 'не указано',
    type: 'unary',
    attrTypes: ['string', 'number', 'select', 'multi_select'],
    compare: (v) => {
      if (isString(v)) return isEmpty(v) || isNull(v)
      if (isArray(v)) return isEmpty(v)
      return isNull(v) || isUndefined(v)
    },
  },
]

// const operatorsByAttrType: Record<AttrType, string[]> = {
//   string: [
//     'is',
//     'not',
//     'contains',
//     'doesNotContain',
//     'startsWith',
//     'endsWith',
//     'defined',
//     'undefined',
//   ],
//   number: ['eq', 'neq', 'lt', 'gt', 'lte', 'gte', 'defined', 'undefined'],
//   boolean: ['checked', 'unchecked'],
//   date: [],
//   select: ['is', 'not', 'defined', 'undefined'],
//   multi_select: [
//     'containsAll',
//     'containsSome',
//     'doesNotContainAny',
//     'doesNotContainSome',
//     'defined',
//     'undefined',
//   ],
// }

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
