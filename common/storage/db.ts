import { uniqueId } from 'lodash'
import {
  Activity,
  Enforcement,
  File,
  Group,
  NewActivity,
  NewFile,
  NewGroup,
  NewTask,
  Task,
} from '@common/types'
import { Collection } from '@common/utils'

import stubFiles from './_stubs/files.json'
import stubEnforcements from './_stubs/enforcements.json'
import stubTasks from './_stubs/tasks.json'
import stubGroups from './_stubs/groups.json'
import stubActivity from './_stubs/activity.json'

let FILES = stubFiles as File[]
let ENFORCEMENTS = stubEnforcements as Enforcement[]
let TASKS = stubTasks as Task[]
let GROUPS = stubGroups as Group[]
let ACTIVITY = stubActivity as Activity[]

// part ==========================================
//  FILES
// ===============================================

export const files = {
  get: () => Promise.resolve<File[]>(FILES),
  create: (values: NewFile) => {
    const file: File = {
      id: uniqueId(),
      name: values.fullname,
      status: 'working',
      groups: [],
      pinned: false,
      general: {
        fullname: values.fullname,
        birthday: null,
        address: null,
        inn: null,
        snils: null,
        regions: [],
        notion: null,
      },
      cases: {
        initial: { court: null, caseNumber: null, decisionDate: null, copy: false },
        appealStatus: 'undefined',
        appeal: { court: null, caseNumber: null, decisionDate: null, copy: false },
        cassationStatus: 'undefined',
        cassation: { court: null, caseNumber: null, decisionDate: null, copy: false },
        collateralProvided: false,
        collateral: { subject: null, registered: false, registration: { place: null, date: null } },
        cooped: false,
        cooperators: null,
        notion: null,
      },
      succession: {
        notificationSent: false,
        notification: { sentAt: null, spi: null },
        applicationStatus: 'not_sent',
        application: { sentAt: null, spi: null },
        scheduledFor: null,
        inAbsence: false,
        decisionStatus: 'undefined',
        appealed: false,
        copy: false,
        amount: null,
        notion: null,
      },
      summary: {
        amountByCourt: null,
        stateDuty: null,
        transcript: null,
        amountInContract: null,
        amountUponContractPayoff: null,
        recalcStatus: null,
        liqDebtStatus: null,
        liqDebt: { amount: null, payoffDate: null },
        notion: null,
      },
      enforcements: [],
    } as File
    FILES = Collection.add(FILES, file)
    return Promise.resolve(file)
  },
  update: (ids: string[], changes: Partial<File>) => {
    FILES = Collection.update(FILES, ids, changes)
    return Promise.resolve()
  },
  delete: (ids: string[]) => {
    FILES = Collection.delete(FILES, ids)
    return Promise.resolve()
  },
}

// part ==========================================
//  ENFORCEMENTS
// ===============================================

export const enforcements = {
  get: () => Promise.resolve<Enforcement[]>(ENFORCEMENTS),
  create: () => {
    const enforcement: Enforcement = {
      id: uniqueId(),
      note: {
        series: null,
        number: null,
        issuer: null,
        issueDate: null,
        sum: null,
        transcript: null,
        possession: 'unknown',
      },
      proceedingStatus: 'not_opened',
      proceeding: { osp: null, region: null, initDate: null, endDate: null },
      notion: null,
    }
    ENFORCEMENTS = Collection.add(ENFORCEMENTS, enforcement)
    return Promise.resolve(enforcement)
  },
  update: (ids: string[], changes: Partial<Task>) => {
    ENFORCEMENTS = Collection.update(ENFORCEMENTS, ids, changes)
    return Promise.resolve()
  },
  delete: (ids: string[]) => {
    ENFORCEMENTS = Collection.delete(ENFORCEMENTS, ids)
    return Promise.resolve()
  },
}

// part ==========================================
//  TASKS
// ===============================================

export const tasks = {
  get: () => Promise.resolve<Task[]>(TASKS),
  create: (values: NewTask) => {
    const task: Task = {
      id: uniqueId(),
      status: 'working',
      files: values.files ?? [],
      groups: [],
      pinned: false,
      name: values.name,
      description: values.description ?? null,
    }
    TASKS = Collection.add(TASKS, task)
    return Promise.resolve(task)
  },
  update: (ids: string[], changes: Partial<Task>) => {
    TASKS = Collection.update(TASKS, ids, changes)
    return Promise.resolve()
  },
  delete: (ids: string[]) => {
    TASKS = Collection.delete(TASKS, ids)
    return Promise.resolve()
  },
}

// part ==========================================
//  GROUPS
// ===============================================

export const groups = {
  get: () => Promise.resolve<Group[]>(GROUPS),
  create: ({ name }: NewGroup) => {
    const group: Group = { id: uniqueId(), name }
    GROUPS = Collection.add(GROUPS, group)
    return Promise.resolve(group)
  },
  update: (ids: string[], changes: Partial<Group>) => {
    GROUPS = Collection.update(GROUPS, ids, changes)
    return Promise.resolve()
  },
  delete: (ids: string[]) => {
    GROUPS = Collection.delete(GROUPS, ids)
    return Promise.resolve()
  },
}

// part ==========================================
//  ACTIVITY
// ===============================================

export const activity = {
  get: () => Promise.resolve<Activity[]>(ACTIVITY),
  create: (values: NewActivity) => {
    const act: Activity = { id: uniqueId(), at: new Date().toISOString(), ...values }
    ACTIVITY = Collection.add(ACTIVITY, act)
    return Promise.resolve(act)
  },
}
