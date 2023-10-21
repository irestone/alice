// section #########################################################################################
//  GENERAL
// #################################################################################################

export type TCategory = 'files' | 'tasks'

// File

export enum FILE_STATUS {
  IN_WORK = 'IN_WORK',
  ON_HOLD = 'ON_HOLD',
  ARCHIVED = 'ARCHIVED',
}

export type TFile = {
  id: string
  status: FILE_STATUS
  groups: string[]
  pinned: boolean
  data: {
    prop1: string
    prop2?: number
    prop3: boolean
    prop4: string // ISO timestamp
  }
}

// Task

export enum TASK_STATUS {
  IN_WORK = 'IN_WORK',
  ON_HOLD = 'ON_HOLD',
  ARCHIVED = 'ARCHIVED',
}

export type TTask = {
  id: string
  status: TASK_STATUS
  files: string[]
  groups: string[]
  pinned: boolean
  data: {
    name: string
    description?: string
  }
}

export type TGroup = {
  id: string
  name: string
}

// section #########################################################################################
//  COMMON
// #################################################################################################

export type TOption = { value: string | number; label: string }
