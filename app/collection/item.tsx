import { cond, find, noop } from 'lodash'
import { SFC } from '@common/styles'
import * as T from '@common/types'
import { useStorage } from '@common/storage'
import { Div } from '@lib/primitives'
import { File } from './item/file'
import { Task } from './item/task'

const assets = {
  files: { Component: File },
  tasks: { Component: Task },
}

export const Item: SFC<{
  category: T.Category
  item: string
  mobile?: boolean
}> = (props) => {
  const { category: cat, item: id, mobile } = props
  const { Component } = assets[cat]

  const get = useStorage((s) => s.get)
  const item = get(cat, id)

  return item ? (
    <Component data={item as any} update={noop} mobile={mobile} />
  ) : (
    <Div>FILE {id} NOT FOUND</Div>
  )
}
