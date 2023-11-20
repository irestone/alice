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
import { groupBy, useFilterPredicate } from './list/utils'

const assets: Record<
  T.Category,
  {
    title: string
    groupingOpts: T.CollectionName
    statusOpts: T.CollectionName
    attrs: T.CollectionName
    attrModules: T.CollectionName | null
    Card: SFC<Card>
  }
> = {
  files: {
    title: 'Каталог',
    groupingOpts: 'fileGroupingOpts',
    statusOpts: 'fileStatusOpts',
    attrs: 'fileAttrs',
    attrModules: 'fileModules',
    Card: FileCard,
  },
  tasks: {
    title: 'Задания',
    groupingOpts: 'taskGroupingOpts',
    statusOpts: 'taskStatusOpts',
    attrs: 'taskAttrs',
    attrModules: null,
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
    items: s.collections[cat],
    groups: s.collections.groups,
    statusOpts: s.collections[assets[cat].statusOpts],
    attrs: s.collections[assets[cat].attrs],
    modules: assets[cat].attrModules ? s.collections[assets[cat].attrModules as any] : null,
    groupingOpts: s.collections[assets[cat].groupingOpts],
    get: s.get,
    add: s.add,
    upd: s.upd,
    del: s.del,
  }))

  //todo add 'filterable' prop to entries to filter out 'pinned', 'status' etc from this
  const attrs = storage.modules
    ? storage.modules.map((m: any) => [m, storage.get(m.attrs.src, m.attrs.target)])
    : storage.attrs

  const predicate = useFilterPredicate(settings.filter, assets[cat].attrs)
  const filtered = useMemo<any[]>(() => {
    return lodash.chain(storage.items).filter({ status: settings.status }).filter(predicate).value()
  }, [storage.items, settings, predicate])

  const grouped = groupBy(filtered, storage.groups, settings.grouping)

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
            statusOptions={storage.statusOpts}
            grouping={settings.grouping}
            setGrouping={(v) => settings.set({ grouping: v })}
            groupingOptions={storage.groupingOpts}
            variant={settings.variant}
            setVariant={(v) => settings.set({ variant: v })}
            content={settings.content}
            setContent={(v) => settings.set({ content: v })}
            filtering={settings.filtering}
            setFiltering={(v) => settings.set({ filtering: v })}
            filter={settings.filter}
            setFilter={(v) => settings.set({ filter: v })}
            attrs={attrs}
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
                updItem={(v) => storage.upd(cat, item.id, v)}
                delItem={() => storage.del(cat, item.id)}
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
