import { Children } from 'react'
import * as ContextMenu from '@radix-ui/react-context-menu'
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'
import _, { groupBy as _groupBy, filter, find, isEmpty, map, uniqueId } from 'lodash'

import { TGroup } from '../../_types'
import { SFC, styled } from '../../_styles'
import { useGlobalStore } from '../../_store'
import {
  Div,
  RadixAccordionContent,
  RadixAccordionItem,
  RadixAccordionRoot,
  RadixAccordionTrigger,
  Span,
} from '../_primitives'

// section #########################################################################################
//  GROUPING
// #################################################################################################

const CUSTOM_GROUPING = 'CUSTOM'

export enum FILES_GROUPING {
  CUSTOM = CUSTOM_GROUPING,
  STAGES = 'STAGES',
  REGIONS = 'REGIONS',
}

export const filesGroupingOptions = [
  { value: FILES_GROUPING.CUSTOM, label: 'пользовательские' },
  { value: FILES_GROUPING.STAGES, label: 'этапы' },
  { value: FILES_GROUPING.REGIONS, label: 'регионы' },
]

export enum TASKS_GROUPING {
  CUSTOM = CUSTOM_GROUPING,
  EXECUTORS = 'EXECUTORS',
  IMPORTANCE = 'IMPORTANCE',
}

export const tasksGroupingOptions = [
  { value: TASKS_GROUPING.CUSTOM, label: 'пользовательские' },
  { value: TASKS_GROUPING.EXECUTORS, label: 'исполнители' },
  { value: TASKS_GROUPING.IMPORTANCE, label: 'важность' },
]

export const GroupingSelect = styled('select')
export const GroupingOption = styled('option')

// section #########################################################################################
//  HELPERS
// #################################################################################################

type TItemGroup = [TGroup, any[]]

const specialGroups: Record<string, TGroup> = {
  pinned: { id: 'pinned', name: 'Pinned' },
  uncategorized: { id: 'uncategorized', name: 'Uncategorized' },
}

export const useGroups = () => {
  const groups = useGlobalStore((api) => api.data.groups.items)

  const groupBy = (items: any[], property: FILES_GROUPING | TASKS_GROUPING): TItemGroup[] => {
    if (property === CUSTOM_GROUPING) {
      // pinned items group
      const pinned: TItemGroup = [specialGroups.pinned, filter(items, 'pinned')]
      // item groups per custom group
      const customIds = _.chain(items).map('groups').flatten().uniq().sortBy().value()
      const custom: TItemGroup[] = map(customIds, (id) => {
        const customGroup = find(groups, { id })
        if (!customGroup) throw new Error(`Group with id [${id}] not found`)
        const customGroupItems = filter(items, (item) => item.groups.includes(id))
        return [customGroup, customGroupItems]
      })
      // uncategorized items group
      const uncat: TItemGroup = [
        specialGroups.uncategorized,
        filter(items, (item) => !item.pinned && isEmpty(item.groups)),
      ]
      // export
      return [pinned, ...custom, uncat]
    } else {
      // todo: needs proper implementation
      const perProp: TItemGroup[] = _.chain(items)
        .groupBy(property)
        .toPairs()
        .sortBy([0])
        .map(([value, items]) => [{ id: uniqueId(), name: value }, items])
        .value() as TItemGroup[]
      return perProp
    }
  }

  return { groupBy }
}

// section #########################################################################################
//  GROUP CONTEXT MENU
// #################################################################################################

const ContextMenuContent = styled(ContextMenu.Content, {
  padding: '.3rem',
  borderRadius: 2,
  background: '#414447',
  border: '1px solid #595959',
  display: 'flex',
  flexDirection: 'column',
})

const ContextMenuItem = styled(ContextMenu.Item, {
  fontSize: '.82rem',
  fontWeight: '330',
  textTransform: 'none',
  color: '#bababa',
  padding: '.4rem .6rem',
  cursor: 'pointer',
  borderRadius: 2,
  '&:hover': {
    background: '#fff1',
  },
})

// section #########################################################################################
//  GROUP
// #################################################################################################

interface IGroup {
  group: TGroup
  update: (changes: Partial<TGroup>) => void
  remove: () => void
}

export const Group: SFC<IGroup> = ({ group, update, children }) => {
  const count = Children.count(children)
  return (
    <RadixAccordionItem value={group.id}>
      <RadixAccordionTrigger
        css={{
          width: '100%',
          padding: '.4rem 0',
          paddingLeft: 'calc(var(--gap) + .5rem)',
          background: '#2d3b47',
          fontSize: '.75rem',
          fontWeight: 600,
          letterSpacing: '.05em',
          lineHeight: 1,
          color: '#b3b3b3',
          textTransform: 'uppercase',
          userSelect: 'none',
          '&:hover': { background: '#33424f' },
          '&[data-state="open"] .plus-icon': { display: 'none' },
          '&[data-state="closed"] .minus-icon': { display: 'none' },
        }}
      >
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <Div css={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
              <PlusIcon
                className='plus-icon'
                style={{ width: '1rem', height: '1rem', padding: 2, fill: '#eee' }}
              />
              <MinusIcon
                className='minus-icon'
                style={{ width: '1rem', height: '1rem', padding: 2, fill: '#eee' }}
              />
              <Span>
                {group.name}
                <Span css={{ color: '#6a6a6a', marginLeft: '.3rem' }}>({count})</Span>
              </Span>
            </Div>
          </ContextMenu.Trigger>
          <ContextMenu.Portal>
            <ContextMenuContent>
              <ContextMenuItem>Развернуть/Свернуть</ContextMenuItem>
              <ContextMenuItem>Свернуть все группы</ContextMenuItem>
              <ContextMenuItem>Развернуть все группы</ContextMenuItem>
              <ContextMenuItem>Переименовать</ContextMenuItem>
              <ContextMenuItem>Удалить</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      </RadixAccordionTrigger>
      <RadixAccordionContent>
        <Div
          css={{
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--gap)',
            gap: 'var(--gap)',
          }}
        >
          {children}
        </Div>
      </RadixAccordionContent>
    </RadixAccordionItem>
  )
}

// section #########################################################################################
//  GROUPS
// #################################################################################################

interface IGroups {
  expanded: string[]
  onExpandedChange: (expanded: string[]) => void
}

export const Groups: SFC<IGroups> = ({ expanded, onExpandedChange, children }) => {
  return (
    <RadixAccordionRoot
      value={expanded}
      onValueChange={onExpandedChange}
      type='multiple'
      css={{ flex: 1, display: 'flex', flexDirection: 'column' }}
    >
      {children}
    </RadixAccordionRoot>
  )
}
