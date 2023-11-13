import { ComponentProps, useMemo, useState } from 'react'
import lodash, { filter, isEmpty, noop, xor } from 'lodash'
import { SFC, styled } from '@common/styles'
import * as T from '@common/types'
import { useStorage } from '@common/storage'
import { Mobile } from '@lib/mobile'
import { Card, FileCard, TaskCard } from '@lib/cards'
import { Div } from '@lib/primitives'
import { useSettings } from './list/storage'
import { Group, groupBy } from './list/groups'
import { Selection } from './list/selection'
import { Controls, useFilterPredicate } from './list/controls'

const assets: Record<
  T.Category,
  {
    title: string
    groupingOpts: T.CollectionName
    statusOpts: T.CollectionName
    filterAttrs: T.CollectionName
    Card: SFC<Card>
  }
> = {
  files: {
    title: 'Каталог',
    groupingOpts: 'fileGroupingOpts',
    statusOpts: 'fileStatusOpts',
    filterAttrs: 'fileAttrs',
    Card: FileCard,
  },
  tasks: {
    title: 'Задания',
    groupingOpts: 'taskGroupingOpts',
    statusOpts: 'taskStatusOpts',
    filterAttrs: 'taskAttrs',
    Card: TaskCard,
  },
}

// section #########################################################################################
//  LAYOUT
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
//  MAIN
// #################################################################################################

export const List: SFC<{
  category: T.Category
  mobile?: boolean
}> = ({ category: cat, mobile }) => {
  const { Card, title } = assets[cat]
  const settings = useSettings(cat)
  const collections = useStorage((s: any) => ({
    items: s.collections[cat],
    groups: s.collections.groups,
    statusOpts: s.collections[assets[cat].statusOpts],
    filterAttrs: s.collections[assets[cat].filterAttrs],
    groupingOpts: s.collections[assets[cat].groupingOpts],
    get: s.get,
    add: s.add,
    upd: s.upd,
    del: s.del,
  }))

  const predicate = useFilterPredicate(settings.filter, assets[cat].filterAttrs)
  const filtered = useMemo<any[]>(() => {
    return lodash
      .chain(collections.items)
      .filter({ status: settings.status })
      .filter(predicate)
      .value()
  }, [collections.items, settings, predicate])

  const grouped = groupBy(filtered, collections.groups, settings.grouping)

  const [selection, setSelection] = useState<string[]>([])
  const selected = useMemo(() => {
    return filtered.filter((el) => selection.includes(el.id))
  }, [selection, filtered])

  return (
    <Root mobile={mobile}>
      <Head mobile={mobile} title={title}>
        {isEmpty(selection) ? (
          <Controls
            status={settings.status}
            setStatus={(v) => settings.set({ status: v })}
            statusOptions={collections.statusOpts}
            filter={settings.filter}
            setFilter={(v) => settings.set({ filter: v })}
            filterAttrs={collections.filterAttrs}
            grouping={settings.grouping}
            setGrouping={(v) => settings.set({ grouping: v })}
            groupingOptions={collections.groupingOpts}
          />
        ) : (
          <Selection
            status={settings.status}
            items={selected}
            updateItems={(v) => collections.upd(cat, selection, v)}
            deleteItems={() => collections.del(cat, selection)}
            clearSelection={() => setSelection([])}
          />
        )}
      </Head>
      <Body>
        {grouped.map(([group, items]) => (
          <Group
            key={group.id}
            group={group}
            updateGroup={(v) => collections.upd(cat, group.id, v)}
            deleteGroup={() => collections.del(cat, group.id)}
            expanded={settings.expandedGroups.includes(group.id)}
            toggleExpanded={() => {
              settings.set({ expandedGroups: xor(settings.expandedGroups, [group.id]) })
            }}
          >
            {items.map((item) => (
              <Card
                key={item.id}
                href={`/${cat}/${item.id}`}
                options={[]}
                item={item}
                updItem={(v) => collections.upd(cat, item.id, v)}
                delItem={() => collections.del(cat, item.id)}
                selection={!isEmpty(selection)}
                startSelection={() => setSelection([item.id])}
                selected={selection.includes(item.id)}
                toggleSelected={() => setSelection(xor(selection, [item.id]))}
                mobile={mobile}
                variant={settings.cardVariant}
              />
            ))}
          </Group>
        ))}
      </Body>
    </Root>
  )
}
