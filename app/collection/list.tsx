import { ComponentProps, useMemo, useState } from 'react'
import lodash, { filter, isEmpty, noop, sortBy, xor } from 'lodash'
import { SFC, styled } from '@common/styles'
import * as T from '@common/types'
import { useStorage } from '@common/storage'
import { useSettings } from '@common/settings'
import { Div } from '@lib/primitives'
import { Mobile } from '@lib/mobile'
import { Card, FileCard, Group, TaskCard } from '@lib/cards'
import { Controls } from './list/controls'
import { Selection } from './list/selection'
import { useFilterPredicate, useGrouping } from './list/utils'

const assets: Record<
  T.Category,
  {
    title: string
    groupings: T.CollectionName
    statuses: T.CollectionName
    attrs: T.CollectionName
    Card: SFC<Card>
  }
> = {
  files: {
    title: 'Каталог',
    groupings: 'fileGroupings',
    statuses: 'fileStatuses',
    attrs: 'fileAttrs',
    Card: FileCard,
  },
  tasks: {
    title: 'Задания',
    groupings: 'taskGroupings',
    statuses: 'taskStatuses',
    attrs: 'taskAttrs',
    Card: TaskCard,
  },
}

// section #########################################################################################
//  COMPONENTS
// #################################################################################################

const Head: SFC<{ mobile?: boolean } & Partial<ComponentProps<typeof Mobile.Head>>> = (props) => {
  return props.mobile ? (
    <Mobile.Head {...(props as any)}>{props.children}</Mobile.Head>
  ) : (
    <Div css={{ position: 'sticky', top: 0 }}>{props.children}</Div>
  )
}

const Body = Mobile.Body

const Root = styled(Mobile.Root, {
  width: 480,
  variants: {
    mobile: {
      true: {
        width: '100%',
      },
    },
  },
})

// section #########################################################################################
//  LIST
// #################################################################################################

export const List: SFC<{
  category: T.Category
  mobile?: boolean
}> = ({ category, mobile }) => {
  const { Card, title } = assets[category]
  const settings = useSettings(category)
  const storage = useStorage((s: any) => ({
    statuses: s.collections[assets[category].statuses],
    attrs: s.collections[assets[category].attrs],
    groupings: s.collections[assets[category].groupings],
    items: s.collections[category],
    groups: s.collections.groups,
    modules: s.collections.modules,
    get: s.get,
    add: s.add,
    upd: s.upd,
    del: s.del,
  }))

  const predicate = useFilterPredicate(settings.filter, assets[category].attrs)
  const items = useMemo<any[]>(() => {
    const r1 = filter(storage.items, { status: settings.status })
    const r2 = settings.filtering && !isEmpty(settings.filter) ? filter(r1, predicate) : r1
    return sortBy(r2, settings.sorting)
  }, [storage.items, settings, predicate])

  const grouped = useGrouping(items, settings.grouping)
  const isCustomGrouping = settings.grouping === 'custom'

  const [selection, setSelection] = useState<string[]>([])
  const selected = useMemo(() => {
    return items.filter((el) => selection.includes(el.id))
  }, [selection, items])

  return (
    <Root mobile={mobile}>
      <Head mobile={mobile} title={title}>
        {isEmpty(selection) ? (
          <Controls
            status={settings.status}
            setStatus={(v) => settings.set({ status: v })}
            statusOptions={storage.statuses}
            grouping={settings.grouping}
            setGrouping={(v) => settings.set({ grouping: v })}
            groupingOptions={storage.groupings}
            variant={settings.variant}
            setVariant={(v) => settings.set({ variant: v })}
            content={settings.content}
            setContent={(v) => settings.set({ content: v })}
            filtering={settings.filtering}
            setFiltering={(v) => settings.set({ filtering: v })}
            filter={settings.filter}
            setFilter={(v) => settings.set({ filter: v })}
            attrs={storage.attrs}
          />
        ) : (
          <Selection
            status={settings.status}
            items={selected}
            updateItems={(v) => storage.upd(category, selection, v)}
            deleteItems={() => storage.del(category, selection)}
            clearSelection={() => setSelection([])}
          />
        )}
      </Head>
      <Body>
        {grouped.map(([group, items]) => (
          <Group
            key={group.id}
            group={group}
            editable={isCustomGrouping}
            updateGroup={isCustomGrouping ? (v) => storage.upd('groups', group.id, v) : noop}
            deleteGroup={isCustomGrouping ? () => storage.del('groups', group.id) : noop}
            expanded={settings.expandedGroups.includes(group.id)}
            toggleExpanded={() => {
              settings.set({ expandedGroups: xor(settings.expandedGroups, [group.id]) })
            }}
          >
            {items.map((item) => (
              <Card
                key={item.id}
                href={`/${category}/${item.id}`}
                options={[]}
                item={item}
                updateItem={(v) => storage.upd(category, item.id, v)}
                deleteItem={() => storage.del(category, item.id)}
                selection={!isEmpty(selection)}
                startSelection={() => setSelection([item.id])}
                selected={selection.includes(item.id)}
                toggleSelected={() => setSelection(xor(selection, [item.id]))}
                variant={settings.variant}
                mobile={mobile}
              />
            ))}
          </Group>
        ))}
      </Body>
    </Root>
  )
}
