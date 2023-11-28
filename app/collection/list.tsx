import { ComponentProps, useMemo, useState } from 'react'
import lodash, { filter, isEmpty, noop, xor } from 'lodash'
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
}> = ({ category: cat, mobile }) => {
  const { Card, title } = assets[cat]
  const settings = useSettings(cat)
  const storage = useStorage((s: any) => ({
    statuses: s.collections[assets[cat].statuses],
    attrs: s.collections[assets[cat].attrs],
    groupings: s.collections[assets[cat].groupings],
    items: s.collections[cat],
    groups: s.collections.groups,
    modules: s.collections.modules,
    get: s.get,
    add: s.add,
    upd: s.upd,
    del: s.del,
  }))

  const predicate = useFilterPredicate(settings.filter, assets[cat].attrs)
  const items = useMemo<any[]>(() => {
    const withStatus = filter(storage.items, { status: settings.status })
    return settings.filtering ? filter(withStatus, predicate) : withStatus
  }, [storage.items, settings, predicate])

  const grouped = useGrouping(items, settings.grouping)

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
            updateItems={(v) => storage.upd(cat, selection, v)}
            deleteItems={() => storage.del(cat, selection)}
            clearSelection={() => setSelection([])}
          />
        )}
      </Head>
      <Body>
        {grouped.map(([group, items]) => (
          <Group
            key={group.id}
            group={group}
            updateGroup={(v) => storage.upd(cat, group.id, v)}
            deleteGroup={() => storage.del(cat, group.id)}
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
                updateItem={(v) => storage.upd(cat, item.id, v)}
                deleteItem={() => storage.del(cat, item.id)}
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
