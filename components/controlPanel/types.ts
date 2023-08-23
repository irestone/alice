export type TGroup = { id: string; name: string }
export type TCard = {
  id: string
  pinned: boolean
  groups: string[]
  prop1: string
  prop2: number
  prop3: boolean
  prop4: string // ISO timestamp
}
