import { useMemo, useState } from 'react'
import { filter, noop } from 'lodash'

import { TCategory, TOption } from '../../_types'
import { useGlobalStore } from '../../_store'
import { useSettings } from './_store'
import { Body, Controls, ControlsGroup, ControlsRow, Head, Root } from './layout'
import { Menu } from './menu'
import { StatusOption, StatusSelect, fileStatusOptions, taskStatusOptions } from './status'
import { Search, search } from './search'
import { Filter, PROPERTY, fileProperties, producePredicate, taskProperties } from './filter'
import { FileCard, TaskCard } from './cards'
import { CreateFile, CreateTask } from './create'
import {
  Group,
  GroupingOption,
  GroupingSelect,
  Groups,
  filesGroupingOptions,
  tasksGroupingOptions,
  useGroups,
} from './groups'
import { SFC } from '../../_styles'

// section #########################################################################################
//  MAPS
// #################################################################################################

const statusOptionsByCategory: Record<TCategory, TOption[]> = {
  files: fileStatusOptions,
  tasks: taskStatusOptions,
}

const groupingOptionsByCategory: Record<TCategory, TOption[]> = {
  files: filesGroupingOptions,
  tasks: tasksGroupingOptions,
}

const filterPropertiesByCategory: Record<TCategory, PROPERTY[]> = {
  files: fileProperties,
  tasks: taskProperties,
}

const cardsByCategory: Record<TCategory, SFC<any>> = {
  files: FileCard,
  tasks: TaskCard,
}

const createItemButtonsByCategory: Record<TCategory, SFC<any>> = {
  files: CreateFile,
  tasks: CreateTask,
}

// section #########################################################################################
//  MAIN
// #################################################################################################

const ControlPanel: SFC<{ tab: TCategory }> = ({ tab }) => {
  // State

  const category = tab
  const { settings, setSettings } = useSettings()
  const [searchString, setSearchString] = useState('')

  // Assets

  const statusOptions = statusOptionsByCategory[category]
  const groupingOptions = groupingOptionsByCategory[category]
  const filterProperties = filterPropertiesByCategory[category]
  const CreateItem = createItemButtonsByCategory[category]
  const Card = cardsByCategory[category]

  const items = useGlobalStore((api) => api.data[category].items)
  const filteredItems = useMemo<any[]>(() => {
    const byStatus = filter(items, { status: settings[category].status })
    const byData = filter(byStatus, producePredicate(settings[category].filter, 'data'))
    const bySearch = search(byData, searchString).result
    return bySearch
  }, [items, settings, category, searchString])

  const { groupBy } = useGroups()
  const groups = groupBy(filteredItems, settings[category].grouping)

  // Render

  return (
    <Root>
      <Head>
        <Menu />
        <Controls>
          <ControlsRow>
            <ControlsGroup>
              <StatusSelect
                value={settings[category].status}
                onChange={(e: any) => setSettings((s) => (s[category].status = e.target.value))}
              >
                {statusOptions.map(({ value, label }) => (
                  <StatusOption key={value} value={value}>
                    {label}
                  </StatusOption>
                ))}
              </StatusSelect>
              <GroupingSelect
                value={settings[category].grouping}
                onChange={(e: any) => setSettings((s) => (s[category].grouping = e.target.value))}
              >
                {groupingOptions.map(({ value, label }) => (
                  <GroupingOption key={value} value={value}>
                    {label}
                  </GroupingOption>
                ))}
              </GroupingSelect>
            </ControlsGroup>
            <ControlsGroup>
              <CreateItem />
            </ControlsGroup>
          </ControlsRow>
          <ControlsRow>
            <Search value={searchString} onChange={setSearchString} />
            <Filter
              value={settings[category].filter}
              onChange={(v) => setSettings((s) => (s[category].filter = v))}
              properties={filterProperties}
            />
          </ControlsRow>
        </Controls>
      </Head>
      <Body>
        <Groups
          expanded={settings[category].expandedGroups}
          onExpandedChange={(v) => setSettings((s) => (s[category].expandedGroups = v))}
        >
          {groups.map(([group, groupItems]) => (
            <Group key={group.id} group={group} update={noop} remove={noop}>
              {groupItems.map((item) => (
                <Card key={item.id} {...item} selected={noop} onSelectedChange={noop} />
              ))}
            </Group>
          ))}
        </Groups>
      </Body>
    </Root>
  )
}

export default ControlPanel

// type TTab = { value: string; label: string; icon: any }

// //? todo: implement interface
// interface IControlPanel {
//   tabs: TTab[]
//   currentTab: TTab
//   onTabChange: (tab: TTab) => void
//   statusOptions: any[]
//   groupingOptions: any[]
//   itemProperties: any[]
//   settings: TSettings // { status: ..., grouping: ..., filter: ..., expandedGroups: ... }
//   setSettings: (setter: (settings: TSettings) => void) => void
//   createItemButtonText: string // default: "создать"
//   items: any[]
//   setItems: (setter: (items: any[]) => void) => void
//   currentItem: any
//   onCurrentItemChange: (item: any) => void
//   Card: any
// }

// todo: const [selection, setSelection] = useState([])
// todo: menu props: { tab: TCategory, onTabChange: (tab: TCategory) => void}
