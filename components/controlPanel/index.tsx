import { useEffect, useMemo, useState, ReactNode } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { concat, filter, find, forEach, has, isEmpty, map } from 'lodash'

import { SFC, styled } from '../../styles/components'
import { TContentType } from './types'
import { useControlPanelStore } from './store'
import Menu from './menu'
import Headline from './headline'
import Controls from './controls'
import { useGlobalStore } from '../../store'
import { TFile, TGroup, TTask } from '../../types'
import Group from './group'
import { FileCard, TaskCard } from './cards'

const CardComponentsMap: { [key in TContentType]: SFC<any> } = {
  files: FileCard,
  tasks: TaskCard,
}

// section #########################################################################################
//  UTILS
// #################################################################################################

const getPinnedItems: <T>(items: T[]) => T[] = (items) => filter(items, 'pinned')

const getGroupedItems: <T>(items: T[], groups: TGroup[]) => [TGroup, T[]][] = (items, groups) => {
  // creating a hash map of items by group id
  const map: { [groupId: string]: any[] } = {}
  forEach(items, (item) => {
    forEach((item as any).groups, (group) => {
      if (has(map, group)) map[group].push(item)
      else map[group] = [item]
    })
  })
  // converting the map into sorted array with hydrated groups
  return Object.entries(map)
    .map(([groupId, items]) => {
      const group = find(groups, { id: groupId })
      if (!group) throw new Error(`Group [${groupId}] not found.`)
      return [group, items]
    })
    .sort(([a]: any, [b]: any) => a.name.localeCompare(b.name)) as any
}

const getUncategorizedItems: <T>(items: T[]) => T[] = (items) => {
  return items.filter(({ groups, pinned }: any) => !pinned && isEmpty(groups))
}

// section #########################################################################################
//  COMPONENTS
// #################################################################################################

const Head = styled('div', {
  '--bd-clr': '#42515d',
  '--bd': '1px solid var(--bd-clr)',
  background: 'linear-gradient(to bottom, #333d47, #374957)',
  borderBottom: 'var(--bd)',
})

const Groups = styled(Accordion.Root, {
  '--gap': '.35rem',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  scrollbarSize: 8,
  scrollbarTrackColor: '#232323',
  scrollbarThumbColor: '#666',
  scrollbarThumbColorHovered: '#777',
})

const Root = styled('nav', {
  width: '27rem',
  height: '100%',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  background: '#181818',
})

// section #########################################################################################
//  MAIN
// #################################################################################################

const ControlPanel: SFC<{ contentType: TContentType }> = ({ contentType }) => {
  const setContentType = useControlPanelStore((api) => api.setContentType)
  useEffect(() => setContentType(contentType), [setContentType, contentType])

  const items = useGlobalStore((api) => api[contentType])
  const groups = useGlobalStore((api) => api.groups)
  const pinned = useMemo(() => getPinnedItems<any>(items), [items])
  const grouped = useMemo(() => getGroupedItems<any>(items, groups), [items, groups])
  const uncategorized = useMemo(() => getUncategorizedItems<any>(items), [items])

  const [expandedGroups] = useState(['pinned', ...map(groups, 'id'), 'uncategorized'])

  const Card = CardComponentsMap[contentType]

  return (
    <Root>
      <Head>
        <Menu />
        <Headline />
        <Controls />
      </Head>
      <Groups type='multiple' defaultValue={expandedGroups}>
        {!isEmpty(pinned) && (
          <Group id='pinned' contentType={contentType} name='закрепленные'>
            {pinned.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </Group>
        )}
        {grouped.map(([group, items]) => (
          <Group key={group.id} {...group}>
            {items.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </Group>
        ))}
        {!isEmpty(uncategorized) && (
          <Group id='uncategorized' contentType={contentType} name='без группы'>
            {uncategorized.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </Group>
        )}
      </Groups>
    </Root>
  )
}

export default ControlPanel
