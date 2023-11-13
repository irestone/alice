import lodash, { filter, find, isEmpty, map, uniqueId } from 'lodash'
import { SFC } from '@common/styles'
import * as T from '@common/types'
import { useState } from 'react'
import { Section } from '@lib/sections'
import { Button } from '@lib/buttons'

// part ==========================================
//  UTILS
// ===============================================

type ItemGroup = [T.Group, any[]]

const specialGroups: Record<string, T.Group> = {
  pinned: { id: 'pinned', name: 'Закрепленные' },
  ungrouped: { id: 'ungrouped', name: 'Без группы' },
}

const collectCustomGroupIds = (items: any[]) => {
  return lodash.chain(items).map('groups').flatten().uniq().sortBy().value()
}

const findGroup = (groups: T.Group[], predicate: any) => {
  const group = find(groups, predicate)
  if (!group) throw new Error(`GROUP NOT FOUND`)
  return group
}

export const groupBy = (items: any[], groups: T.Group[], grouping: T.ID): ItemGroup[] => {
  if (grouping === 'custom') {
    return [
      [specialGroups.pinned, items.filter((el) => el.pinned)],
      ...(collectCustomGroupIds(items).map((id) => {
        return [findGroup(groups, { id }), items.filter((el) => el.groups.includes(id))]
      }) as ItemGroup[]),
      [specialGroups.ungrouped, items.filter((el) => !el.pinned && isEmpty(el.groups))],
    ].filter(([_, items]) => !isEmpty(items)) as any
  }
  console.error('Uncommon grouping needs implementation')
  return []
}

// part ==========================================
//  GROUP
// ===============================================

export const Group: SFC<{
  group: T.Group
  updateGroup: (changes: Partial<T.Group>) => void
  deleteGroup: () => void
  expanded: boolean
  toggleExpanded: () => void
}> = ({ group, children }) => {
  const [editing, setEditing] = useState(false)
  return (
    <Section
      title={group.name}
      actions={
        editing
          ? [
              <Button
                key='delete'
                icon='delete'
                colors={{ color: 'indianred', preset: 'no_bg' }}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              />,
              <Button
                key='save'
                icon='checkmark'
                colors={{ color: 'cyan', preset: 'no_bg' }}
                onClick={(e) => {
                  e.stopPropagation()
                  setEditing(false)
                }}
              />,
            ]
          : [
              <Button
                key='edit'
                icon='edit'
                colors={{ preset: 'no_bg', color: 'cyan' }}
                // colors='no_bg'
                // colors='dimmed'
                onClick={(e) => {
                  e.stopPropagation()
                  setEditing(true)
                }}
              />,
            ]
      }
      stickHeadAt={101}
      collapsible
      counter
    >
      {children}
    </Section>
  )
}
