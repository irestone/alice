import { uniqueId } from 'lodash'
import {
  Activity,
  BailiffDept,
  Court,
  EnforcementNote,
  EnforcementProceeding,
  File,
  Group,
  NewActivity,
  NewBailiffDept,
  NewCourt,
  NewEnforcementProceeding,
  NewFile,
  NewGroup,
  NewTask,
  Task,
} from '@common/types'
import { Collection } from '@common/utils'

import activityStub from './_stubs/activity.json'
import bailiffDeptsStub from './_stubs/bailiffDepts.json'
import courtsStub from './_stubs/courts.json'
import enforcementNotesStub from './_stubs/enforcementNotes.json'
import enforcementProceedingsStub from './_stubs/enforcementProceedings.json'
import filesStub from './_stubs/files.json'
import groupsStub from './_stubs/groups.json'
import tasksStub from './_stubs/tasks.json'

let ACTIVITY = activityStub as Activity[]
let BAILIFF_DEPTS = bailiffDeptsStub as BailiffDept[]
let COURTS = courtsStub as Court[]
let ENFORCEMENT_NOTES = enforcementNotesStub as EnforcementNote[]
let ENFORCEMENT_PROCEEDINGS = enforcementProceedingsStub as EnforcementProceeding[]
let FILES = filesStub as File[]
let GROUPS = groupsStub as Group[]
let TASKS = tasksStub as Task[]

// part ==========================================
//  ACTIVITY
// ===============================================

export const activity = {
  get: () => Promise.resolve<Activity[]>(ACTIVITY),
  create: (values: NewActivity) => {
    const act: Activity = { id: uniqueId('temp'), at: new Date().toISOString(), ...values }
    ACTIVITY = Collection.add(ACTIVITY, act)
    return Promise.resolve(act)
  },
}

// part ==========================================
//  BAILIFF_DEPTS
// ===============================================

export const bailiffDepts = {
  get: () => Promise.resolve<BailiffDept[]>(BAILIFF_DEPTS),
  create: (values: NewBailiffDept) => {
    const item: BailiffDept = { id: uniqueId('temp'), ...values }
    BAILIFF_DEPTS = Collection.add(BAILIFF_DEPTS, item)
    return Promise.resolve(item)
  },
  delete: (ids: string[]) => {
    BAILIFF_DEPTS = Collection.delete(BAILIFF_DEPTS, ids)
    return Promise.resolve()
  },
}

// part ==========================================
//  COURTS
// ===============================================

export const courts = {
  get: () => Promise.resolve<Court[]>(COURTS),
  create: (values: NewCourt) => {
    const item: Court = { id: uniqueId('temp'), ...values }
    COURTS = Collection.add(COURTS, item)
    return Promise.resolve(item)
  },
  delete: (ids: string[]) => {
    COURTS = Collection.delete(COURTS, ids)
    return Promise.resolve()
  },
}

// part ==========================================
//  ENFORCEMENT_NOTES
// ===============================================

export const enforcementNotes = {
  get: () => Promise.resolve<EnforcementNote[]>(ENFORCEMENT_NOTES),
  create: () => {
    const item: EnforcementNote = {
      id: uniqueId('temp'),
      series: null,
      number: null,
      issuer: null,
      issueDate: null,
      sum: null,
      transcript: null,
      whereabouts: 'searching',
      notion: null,
    }
    ENFORCEMENT_NOTES = Collection.add(ENFORCEMENT_NOTES, item)
    return Promise.resolve(item)
  },
  update: (ids: string[], changes: Partial<EnforcementNote>) => {
    ENFORCEMENT_NOTES = Collection.update(ENFORCEMENT_NOTES, ids, changes)
    return Promise.resolve()
  },
  delete: (ids: string[]) => {
    ENFORCEMENT_NOTES = Collection.delete(ENFORCEMENT_NOTES, ids)
    return Promise.resolve()
  },
}

// part ==========================================
//  ENFORCEMENT_PROCEEDINGS
// ===============================================

export const enforcementProceedings = {
  get: () => Promise.resolve<EnforcementProceeding[]>(ENFORCEMENT_PROCEEDINGS),
  create: (values: NewEnforcementProceeding) => {
    const item: EnforcementProceeding = {
      id: uniqueId('temp'),
      number: null,
      bailiffDept: null,
      region: null,
      initDate: null,
      ended: false,
      endDate: null,
      notion: null,
      ...values,
    }
    ENFORCEMENT_PROCEEDINGS = Collection.add(ENFORCEMENT_PROCEEDINGS, item)
    return Promise.resolve(item)
  },
  update: (ids: string[], changes: Partial<EnforcementProceeding>) => {
    ENFORCEMENT_PROCEEDINGS = Collection.update(ENFORCEMENT_PROCEEDINGS, ids, changes)
    return Promise.resolve()
  },
  delete: (ids: string[]) => {
    ENFORCEMENT_PROCEEDINGS = Collection.delete(ENFORCEMENT_PROCEEDINGS, ids)
    return Promise.resolve()
  },
}

// part ==========================================
//  FILES
// ===============================================

export const files = {
  get: () => Promise.resolve<File[]>(FILES),
  create: (values: NewFile) => {
    const file: File = {
      id: uniqueId('temp'),
      name: values.fullname,
      status: 'current',
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
        court: null,
        number: null,
        date: null,
        copyAvailable: false,
        appealed: false,
        appeal: {
          court: null,
          number: null,
          date: null,
          result: null,
          copyAvailable: false,
        },
        cassationed: false,
        cassation: {
          court: null,
          number: null,
          date: null,
          result: null,
          copyAvailable: false,
        },
        collateralProvided: false,
        collateral: {
          subject: null,
          registered: false,
          registration: {
            place: null,
            date: null,
          },
        },
        cooped: false,
        cooperators: null,
        notion: null,
      },
      summary: {
        amountByCourt: null,
        stateDuty: null,
        transcript: null,
        amountInContract: null,
        amountUponContractPayoff: null,
        recalcNeeded: false,
        recalcDone: false,
        liqInDebt: false,
        liqDebt: {
          amount: null,
          paid: false,
          payoffDate: null,
        },
        notion: null,
      },
      enforcementNotes: [],
      enforcementProceedings: [],
      succession: {
        notificationSent: false,
        notification: {
          date: null,
          spi: null,
        },
        applicationSentWith: null,
        application: {
          date: null,
          spi: null,
        },
        scheduledFor: null,
        inAbsence: false,
        status: null,
        copyAvailable: false,
        copyAmount: null,
        notion: null,
      },
    }
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
//  GROUPS
// ===============================================

export const groups = {
  get: () => Promise.resolve<Group[]>(GROUPS),
  create: ({ name }: NewGroup) => {
    const group: Group = { id: uniqueId('temp'), name }
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
//  TASKS
// ===============================================

export const tasks = {
  get: () => Promise.resolve<Task[]>(TASKS),
  create: (values: NewTask) => {
    const { files, name, description = null, priority = 'medium' } = values
    const task: Task = {
      id: uniqueId('temp'),
      status: 'current',
      groups: [],
      pinned: false,
      files,
      name,
      description,
      priority,
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
