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

const operators: Operator[] = [
  {
    id: 'is',
    name: 'is',
    type: 'binary',
    attrTypes: ['string', 'select'],
    compare: (v, i) => v === i,
  },
  {
    id: 'not',
    name: 'not',
    type: 'binary',
    attrTypes: ['string', 'select'],
    compare: (v, i) => v !== i,
  },
  {
    id: 'contains',
    name: 'contains',
    type: 'binary',
    attrTypes: ['string'],
    compare: (v, i) => v.includes(i),
  },
  {
    id: 'containsAll',
    name: 'containsAll',
    type: 'binary',
    attrTypes: ['multi_select'],
    compare: (v, i) => every(i, (el) => v.includes(el)),
  },
  {
    id: 'containsSome',
    name: 'containsSome',
    type: 'binary',
    attrTypes: ['multi_select'],
    compare: (v, i) => some(i, (el) => v.includes(el)),
  },
  {
    id: 'doesNotContain',
    name: 'doesNotContain',
    type: 'binary',
    attrTypes: ['string'],
    compare: (v, i) => !v.includes(i),
  },
  {
    id: 'doesNotContainAny',
    name: 'doesNotContainAny',
    type: 'binary',
    attrTypes: ['multi_select'],
    compare: (v, i) => !some(i, (el) => v.includes(el)),
  },
  {
    id: 'doesNotContainSome',
    name: 'doesNotContainSome',
    type: 'binary',
    attrTypes: ['multi_select'],
    compare: (v, i) => !every(i, (el) => v.includes(el)),
  },
  {
    id: 'startsWith',
    name: 'startsWith',
    type: 'binary',
    attrTypes: ['string'],
    compare: (v, i) => v.startsWith(i),
  },
  {
    id: 'endsWith',
    name: 'endsWith',
    type: 'binary',
    attrTypes: ['string'],
    compare: (v, i) => v.endsWith(i),
  },
  {
    id: 'defined',
    name: 'defined',
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
    name: 'undefined',
    type: 'unary',
    attrTypes: ['string', 'number', 'select', 'multi_select'],
    compare: (v) => {
      if (isString(v)) return isEmpty(v) || isNull(v)
      if (isArray(v)) return isEmpty(v)
      return isNull(v) || isUndefined(v)
    },
  },
  {
    id: 'checked',
    name: 'checked',
    type: 'unary',
    attrTypes: ['string', 'select'],
    compare: (v) => Boolean(v),
  },
  {
    id: 'unchecked',
    name: 'unchecked',
    type: 'unary',
    attrTypes: ['string', 'select'],
    compare: (v) => Boolean(v),
  },
  {
    id: 'eq',
    name: 'eq',
    type: 'binary',
    attrTypes: ['string', 'select'],
    compare: (v, i) => v === i,
  },
  {
    id: 'neq',
    name: 'neq',
    type: 'binary',
    attrTypes: ['string', 'select'],
    compare: (v, i) => v !== i,
  },
  {
    id: 'lt',
    name: 'lt',
    type: 'binary',
    attrTypes: ['string', 'select'],
    compare: (v, i) => v < i,
  },
  {
    id: 'gt',
    name: 'gt',
    type: 'binary',
    attrTypes: ['string', 'select'],
    compare: (v, i) => v > i,
  },
  {
    id: 'lte',
    name: 'lte',
    type: 'binary',
    attrTypes: ['string', 'select'],
    compare: (v, i) => v <= i,
  },
  {
    id: 'gte',
    name: 'gte',
    type: 'binary',
    attrTypes: ['string', 'select'],
    compare: (v, i) => v >= i,
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
