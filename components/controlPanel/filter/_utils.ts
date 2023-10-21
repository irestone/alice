import { isEmpty, some, isArray, isNull, isUndefined, property as _property, every } from 'lodash'

import { TOption } from '../../../_types'

// section #########################################################################################
//  OPERATORS
// #################################################################################################

type TOperatorType = 'binary' | 'unary'
type TComparator = (value: any, input?: any) => boolean
type TOperator = {
  key: OPERATOR
  label: string
  type: TOperatorType
  comparator: TComparator
}

export enum OPERATOR {
  IS = 'IS',
  NOT = 'NOT',
  CONTAINS = 'CONTAINS',
  CONTAINS_ALL = 'CONTAINS_ALL',
  CONTAINS_SOME = 'CONTAINS_SOME',
  DOES_NOT_CONTAIN = 'DOES_NOT_CONTAIN',
  DOES_NOT_CONTAIN_ANY = 'DOES_NOT_CONTAIN_ANY',
  DOES_NOT_CONTAIN_SOME = 'DOES_NOT_CONTAIN_SOME',
  STARTS_WITH = 'STARTS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  DEFINED = 'DEFINED',
  UNDEFINED = 'UNDEFINED',
  CHECKED = 'CHECKED',
  UNCHECKED = 'UNCHECKED',
  EQ = 'EQ',
  NEQ = 'NEQ',
  LT = 'LT',
  GT = 'GT',
  LTE = 'LTE',
  GTE = 'GTE',
}

export const Operator: Record<OPERATOR, TOperator> = {
  [OPERATOR.IS]: {
    key: OPERATOR.IS,
    label: '=',
    type: 'binary',
    comparator: (value, input) => {
      return value === input
    },
  },
  [OPERATOR.NOT]: {
    key: OPERATOR.NOT,
    label: 'NOT',
    type: 'binary',
    comparator: (value, input) => {
      return value !== input
    },
  },
  [OPERATOR.CONTAINS]: {
    key: OPERATOR.CONTAINS,
    label: 'CONTAINS',
    type: 'binary',
    comparator: (value, input) => {
      return value.includes(input)
    },
  },
  [OPERATOR.CONTAINS_ALL]: {
    key: OPERATOR.CONTAINS_ALL,
    label: 'CONTAINS_ALL',
    type: 'binary',
    comparator: (value, input) => {
      return every(input, (v) => value.includes(v))
    },
  },
  [OPERATOR.CONTAINS_SOME]: {
    key: OPERATOR.CONTAINS_SOME,
    label: 'CONTAINS_SOME',
    type: 'binary',
    comparator: (value, input) => {
      return some(input, (v) => value.includes(v))
    },
  },
  [OPERATOR.DOES_NOT_CONTAIN]: {
    key: OPERATOR.DOES_NOT_CONTAIN,
    label: 'DOES_NOT_CONTAIN',
    type: 'binary',
    comparator: (value, input) => {
      return !value.includes(input)
    },
  },
  [OPERATOR.DOES_NOT_CONTAIN_ANY]: {
    key: OPERATOR.DOES_NOT_CONTAIN_ANY,
    label: 'DOES_NOT_CONTAIN_ANY',
    type: 'binary',
    comparator: (value, input) => {
      return !some(input, (v) => value.includes(v))
    },
  },
  [OPERATOR.DOES_NOT_CONTAIN_SOME]: {
    key: OPERATOR.DOES_NOT_CONTAIN_SOME,
    label: 'DOES_NOT_CONTAIN_SOME',
    type: 'binary',
    comparator: (value, input) => {
      return !every(input, (v) => value.includes(v))
    },
  },
  [OPERATOR.STARTS_WITH]: {
    key: OPERATOR.STARTS_WITH,
    label: 'STARTS_WITH',
    type: 'binary',
    comparator: (value, input) => {
      return value.startsWith(input)
    },
  },
  [OPERATOR.ENDS_WITH]: {
    key: OPERATOR.ENDS_WITH,
    label: 'ENDS_WITH',
    type: 'binary',
    comparator: (value, input) => {
      return value.endsWith(input)
    },
  },
  [OPERATOR.DEFINED]: {
    key: OPERATOR.DEFINED,
    label: 'DEFINED',
    type: 'unary',
    comparator: (value) => {
      return isArray(value) ? !isEmpty(value) : !(isNull(value) || isUndefined(value))
    },
  },
  [OPERATOR.UNDEFINED]: {
    key: OPERATOR.UNDEFINED,
    label: 'UNDEFINED',
    type: 'unary',
    comparator: (value) => {
      return isArray(value) ? isEmpty(value) : isNull(value) || isUndefined(value)
    },
  },
  [OPERATOR.CHECKED]: {
    key: OPERATOR.CHECKED,
    label: 'CHECKED',
    type: 'unary',
    comparator: (value) => {
      return Boolean(value)
    },
  },
  [OPERATOR.UNCHECKED]: {
    key: OPERATOR.UNCHECKED,
    label: 'UNCHECKED',
    type: 'unary',
    comparator: (value) => {
      return Boolean(value)
    },
  },
  [OPERATOR.EQ]: {
    key: OPERATOR.EQ,
    label: 'EQ',
    type: 'binary',
    comparator: (value, input) => {
      return value === input
    },
  },
  [OPERATOR.NEQ]: {
    key: OPERATOR.NEQ,
    label: 'NEQ',
    type: 'binary',
    comparator: (value, input) => {
      return value !== input
    },
  },
  [OPERATOR.LT]: {
    key: OPERATOR.LT,
    label: 'LT',
    type: 'binary',
    comparator: (value, input) => {
      return value < input
    },
  },
  [OPERATOR.GT]: {
    key: OPERATOR.GT,
    label: 'GT',
    type: 'binary',
    comparator: (value, input) => {
      return value > input
    },
  },
  [OPERATOR.LTE]: {
    key: OPERATOR.LTE,
    label: 'LTE',
    type: 'binary',
    comparator: (value, input) => {
      return value <= input
    },
  },
  [OPERATOR.GTE]: {
    key: OPERATOR.GTE,
    label: 'GTE',
    type: 'binary',
    comparator: (value, input) => {
      return value >= input
    },
  },
}

const textOperators = [
  OPERATOR.IS,
  OPERATOR.NOT,
  OPERATOR.CONTAINS,
  OPERATOR.DOES_NOT_CONTAIN,
  OPERATOR.STARTS_WITH,
  OPERATOR.ENDS_WITH,
  OPERATOR.DEFINED,
  OPERATOR.UNDEFINED,
]

const numberOperators = [
  OPERATOR.EQ,
  OPERATOR.NEQ,
  OPERATOR.LT,
  OPERATOR.GT,
  OPERATOR.LTE,
  OPERATOR.GTE,
  OPERATOR.DEFINED,
  OPERATOR.UNDEFINED,
]

const selectOperators = [OPERATOR.IS, OPERATOR.NOT, OPERATOR.DEFINED, OPERATOR.UNDEFINED]

const multiSelectOperators = [
  OPERATOR.CONTAINS_ALL,
  OPERATOR.CONTAINS_SOME,
  OPERATOR.DOES_NOT_CONTAIN_ANY,
  OPERATOR.DOES_NOT_CONTAIN_SOME,
  OPERATOR.DEFINED,
  OPERATOR.UNDEFINED,
]

const checkboxOperators = [OPERATOR.CHECKED, OPERATOR.UNCHECKED]

// section #########################################################################################
//  PROPERTIES
// #################################################################################################

export type TPropertyType = 'text' | 'number' | 'select' | 'multi_select' | 'checkbox' // | 'date'
export type TProperty = {
  key: string
  label: string
  type: TPropertyType
  options?: TOption[]
  operators: OPERATOR[]
}

export enum PROPERTY {
  FILE_NAME = 'prop1',
  FILE_AGE = 'prop2',
  FILE_PRODUCTION = 'prop3',
  FILE_DATE = 'prop4',
  TASK_NAME = 'name',
  TASK_DESCRIPTION = 'description',
}

export const Property: Record<PROPERTY, TProperty> = {
  [PROPERTY.FILE_NAME]: {
    key: PROPERTY.FILE_NAME,
    label: 'Имя',
    type: 'text',
    operators: textOperators,
  },
  [PROPERTY.FILE_AGE]: {
    key: PROPERTY.FILE_AGE,
    label: 'Возраст',
    type: 'number',
    operators: numberOperators,
  },
  [PROPERTY.FILE_PRODUCTION]: {
    key: PROPERTY.FILE_PRODUCTION,
    label: 'Производсто запущено',
    type: 'checkbox',
    operators: checkboxOperators,
  },
  [PROPERTY.FILE_DATE]: {
    key: PROPERTY.FILE_DATE,
    label: 'Дата',
    type: 'text',
    operators: textOperators,
  },
  [PROPERTY.TASK_NAME]: {
    key: PROPERTY.TASK_NAME,
    label: 'Название',
    type: 'text',
    operators: textOperators,
  },
  [PROPERTY.TASK_DESCRIPTION]: {
    key: PROPERTY.TASK_DESCRIPTION,
    label: 'Описание',
    type: 'text',
    operators: textOperators,
  },
}

export const fileProperties: PROPERTY[] = [
  PROPERTY.FILE_NAME,
  PROPERTY.FILE_AGE,
  PROPERTY.FILE_PRODUCTION,
  PROPERTY.FILE_DATE,
]

export const taskProperties: PROPERTY[] = [PROPERTY.TASK_NAME, PROPERTY.TASK_DESCRIPTION]
