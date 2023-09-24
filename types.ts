export type TFile = {
  id: string
  groups: string[]
  pinned: boolean
  prop1: string
  prop2?: number
  prop3: boolean
  prop4: string // ISO timestamp
}

export type TTask = {
  id: string
  files: string[]
  groups: string[]
  pinned: boolean
  name: string
  description?: string
}

export type TContentType = 'files' | 'tasks'

export type TGroup = {
  id: string
  contentType: TContentType
  name: string
}
