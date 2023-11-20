export type ID = string
export type Entry = { readonly id: ID }
export type NamedEntry = { readonly id: ID; name: string }

export type Date = string

// section #########################################################################################
//  DYNAMIC DATA TYPES
// #################################################################################################

export type Group = NamedEntry
export type NewGroup = { name: string }

// part ==========================================
//  FILES
// ===============================================

export type Enforcement = Entry & {
  note: {
    series: string | null
    number: string | null
    issuer: string | null
    issueDate: Date | null
    sum: number | null
    transcript: string | null
    possession: ID // неизвестно / у нас / у КУ / у ФССП / утерян (получаем дубликат)
  }
  proceedingStatus: ID // не возбуждено / в процессе / окончено
  proceeding: {
    osp: ID | null
    region: ID | null
    initDate: Date | null
    endDate: Date | null
  }
  notion: string | null
}

type Trial = {
  court: ID | null
  caseNumber: string | null
  decisionDate: Date | null
  copy: boolean
}

export type File = NamedEntry & {
  status: ID // в работе / отложен / в архиве
  groups: ID[] // TGroup
  pinned: boolean
  general: {
    fullname: string
    birthday: string | null
    address: string | null
    inn: string | null
    snils: string | null
    regions: ID[]
    notion: string | null
  }
  cases: {
    initial: Trial
    appealStatus: ID // нет / удовлетворено / отказано
    appeal: Trial
    cassationStatus: ID // нет / удовлетворено / отказано
    cassation: Trial
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
  succession: {
    notificationSent: boolean
    notification: {
      sentAt: Date | null
      spi: string | null
    }
    applicationStatus: ID // не направлено / направлено почтой / .. гас / .. кад
    application: {
      sentAt: Date | null
      spi: string | null
    }
    scheduledFor: string | null
    inAbsence: boolean
    decisionStatus: ID // не вынесено / удовлетворено / отказано
    appealed: boolean
    copy: boolean
    amount: number | null
    notion: string | null
  }
  summary: {
    amountByCourt: number | null
    stateDuty: ID | null // включена / в пользу гос-ва
    transcript: string | null
    amountInContract: number | null
    amountUponContractPayoff: number | null
    // нужен перерасчет, если на момент полной оплаты договора должник уже выплатил часть долга
    recalcStatus: ID | null // не нужен / нужен / произведен
    // liquidator - конкурсный управляющий (лицо, с которым заключается контракт о правопреемстве)
    liqDebtStatus: ID | null // нет / не выплачен / выплачен
    liqDebt: {
      amount: number | null
      payoffDate: Date | null
    }
    notion: string | null
  }
  enforcements: ID[] // TEnforcement
}

export type NewFile = { fullname: string }

// part ==========================================
//  TASKS
// ===============================================

export type Task = NamedEntry & {
  status: ID // в работе / отложен / в архиве
  files: ID[] // TFile
  groups: ID[] // TGroup
  pinned: boolean
  description: string | null
}

export type NewTask = { name: string; description?: string; files: ID[] }

export type Item = File | Task

export type Predicate = Record<any, any> | ((item: any) => boolean)

export type CollectionName =
  | 'files'
  | 'enforcements'
  | 'tasks'
  | 'groups'
  | 'fileAttrs'
  | 'fileModules'
  | 'regions'
  | 'fileStatusOpts'
  | 'courtOpts'
  | 'trialStatusOpts'
  | 'successionAppStatusOpts'
  | 'successionDecisionOpts'
  | 'stateDutyOpts'
  | 'recalcStatusOpts'
  | 'liqDebtStatusOpts'
  | 'enfNotePossessionOpts'
  | 'enfProceedingStatusOpts'
  | 'enfProceedingOspOpts'
  | 'fileGroupingOpts'
  | 'taskAttrs'
  | 'taskStatusOpts'
  | 'taskGroupingOpts'

export type MutCollectionName = 'files' | 'enforcements' | 'tasks' | 'groups'

export type Target = ID | ID[] | Predicate
export type SourceConfig = { src: CollectionName; target?: Target; pick?: string[] }
export type Source = CollectionName | SourceConfig

export type AttrType = 'string' | 'number' | 'boolean' | 'date' | 'select' | 'multi_select'

export type Category = 'files' | 'tasks'

export type ItemAttr = NamedEntry & {
  path: string
  fullname?: string
  type: AttrType
  options?: CollectionName
}

type UserRole = 'admin' | 'staff'

type User = Entry & {
  fullname: string
  role: UserRole
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
