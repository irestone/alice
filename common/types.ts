export type ID = string
export type Entry = { readonly id: ID }
export type NamedEntry = { readonly id: ID; name: string }
export type Date = string
export type Location = string

export type CollectionName =
  // data (static)
  | 'activity'
  | 'applicationSystems'
  | 'enforcementNoteWhereabouts'
  | 'fileStatuses'
  | 'regions'
  | 'stateDuties'
  | 'successionStatuses'
  | 'taskPriorities'
  | 'taskStatuses'
  | 'trialResults'
  // data (dynamic)
  | 'bailiffDepts'
  | 'courts'
  | 'enforcementNotes'
  | 'enforcementProceedings'
  | 'files'
  | 'groups'
  | 'tasks'
  // ui (static)
  | 'fileAttrs'
  | 'fileGroupings'
  | 'taskAttrs'
  | 'taskGroupings'
  | 'modules'

// section #########################################################################################
//  STATIC DATA COLLECTIONS
// #################################################################################################

export type FileStatus = NamedEntry & { id: 'current' | 'postponed' | 'archived' }
export type Region = NamedEntry
export type TrialResult = NamedEntry & { id: 'granted' | 'rejected' }
export type ApplicationSystem = NamedEntry & { id: 'mail' | 'gas' | 'kad' }
export type SuccessionStatus = NamedEntry & { id: 'granted' | 'appealed' | 'rejected' }
export type StateDuty = NamedEntry & { id: 'included' | 'state' }
export type EnforcementNoteWhereabouts = NamedEntry & {
  id: 'searching' | 'us' | 'liq' | 'fssp' | 'lost'
}
export type TaskStatus = NamedEntry & { id: 'current' | 'postponed' | 'archived' }
export type TaskPriority = NamedEntry & {
  id: 'highest' | 'high' | 'medium' | 'low' | 'lowest'
  level: number
}

// section #########################################################################################
//  DYNAMIC DATA COLLECTIONS
// #################################################################################################

export type Group = NamedEntry
export type NewGroup = { name: string }
export type Court = NamedEntry
export type NewCourt = { name: string }
export type BailiffDept = NamedEntry & { region: ID }
export type NewBailiffDept = { name: string; region: ID }
export type EnforcementNote = Entry & {
  series: string | null
  number: string | null
  issuer: string | null
  issueDate: Date | null
  sum: number | null
  transcript: string | null
  whereabouts: ID // EnforcementNoteWhereabouts
  notion: string | null
}
export type EnforcementProceeding = Entry & {
  note: ID // EnforcementNote
  number: string | null
  bailiffDept: ID | null // BailiffDept
  region: ID | null // Region (auto from bailiff dept)
  initDate: Date | null
  ended: boolean
  endDate: Date | null
  notion: string | null
}
export type NewEnforcementProceeding = { note: ID }

// part ==========================================
//  FILE
// ===============================================

export type File = NamedEntry & {
  status: ID // FileStatus
  groups: ID[] // Group
  pinned: boolean
  general: {
    fullname: string
    birthday: Date | null
    address: Location | null
    inn: string | null
    snils: string | null
    regions: ID[] // Region
    notion: string | null
  }
  cases: {
    court: ID | null // Court
    number: string | null
    date: Date | null
    copyAvailable: boolean
    appealed: boolean
    appeal: {
      court: ID | null // Court
      number: string | null
      date: Date | null
      result: ID | null // TrialResult
      copyAvailable: boolean
    }
    cassationed: boolean
    cassation: {
      court: ID | null // Court
      number: string | null
      date: Date | null
      result: ID | null // TrialResult
      copyAvailable: boolean
    }
    collateralProvided: boolean
    collateral: {
      subject: string | null
      registered: boolean
      registration: {
        place: string | null
        date: Date | null
      }
    }
    cooped: boolean
    cooperators: string | null
    notion: string | null
  }
  summary: {
    amountByCourt: number | null
    stateDuty: ID | null // StateDuty
    transcript: string | null
    amountInContract: number | null
    amountUponContractPayoff: number | null
    recalcNeeded: boolean // (auto if amounts by court/in contract/upon payoff are diffed)
    recalcDone: boolean
    liqInDebt: boolean
    liqDebt: {
      amount: number | null
      paid: boolean
      payoffDate: Date | null
    }
    notion: string | null
  }
  enforcementNotes: ID[] // EnforcementNote
  enforcementProceedings: ID[] // EnforcementProceeding
  succession: {
    notificationSent: boolean
    notification: {
      date: Date | null
      spi: string | null
    }
    applicationSentWith: ID | null // ApplicationSystem
    application: {
      date: Date | null
      spi: string | null
    }
    scheduledFor: Date | null
    inAbsence: boolean
    status: ID | null // SuccessionStatus
    copyAvailable: boolean
    copyAmount: number | null
    notion: string | null
  }
}

export type NewFile = { fullname: string }

// part ==========================================
//  TASK
// ===============================================

export type Task = NamedEntry & {
  status: ID // TaskStatus
  files: ID[] // File
  groups: ID[] // Group
  pinned: boolean
  description: string | null
  priority: ID // TaskPriority
}

export type NewTask = { name: string; description?: string; files: ID[]; priority: ID }

export type Item = File | Task

// section #########################################################################################
//  STATIC UI RELATED COLLECTIONS
// #################################################################################################

export type Module = NamedEntry & { order: number }
export type AttrType = 'string' | 'number' | 'boolean' | 'date' | 'select' | 'multi_select'
export type ItemAttr = NamedEntry & {
  path: string
  fullname?: string
  type: AttrType
  currency?: boolean
  options?: CollectionName
  module?: ID // Module
  display?: boolean
  filter?: boolean
  search?: boolean
  searchWeight?: number
}
export type FileAttr = ItemAttr
export type FileGrouping = NamedEntry & { id: 'custom' | 'regions' | 'bailiff_depts' | 'courts' }
export type TaskAttr = ItemAttr
export type TaskGrouping = NamedEntry & { id: 'custom' | 'priorities' }

// section #########################################################################################
//  OTHER
// #################################################################################################

export type Category = 'files' | 'tasks'

export type Predicate = Record<any, any> | ((item: any) => boolean)
export type Target = ID | ID[] | Predicate
export type SourceConfig = { src: CollectionName; target?: Target; pick?: string[] }
export type Source = CollectionName | SourceConfig

// section #########################################################################################
//  USER
// #################################################################################################

type Role = 'admin' | 'guest'

type User = Entry & {
  fullname: string
  roles: Role[]
}

export enum ActivityType {
  fileCreated = 'file_created',
  fileSeen = 'file_seen',
  fileModified = 'file_modified',
  fileDeleted = 'file_deleted',
}

export type Activity = Entry & {
  type: ActivityType
  by: ID
  at: Date
  payload?: any
}

export type NewActivity = {
  type: ActivityType
  by: ID
  payload?: any
}

// section #########################################################################################
//  GENERIC
// #################################################################################################

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export type PartialExcept<T, K extends keyof T> = RecursivePartial<T> & Pick<T, K>
