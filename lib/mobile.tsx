import { ReactNode, useState } from 'react'
import { CSS, SFC, styled } from '@common/styles'
import { Button } from './buttons'
import { Div, H3, Header, Input, RouteLink, Span, Switch } from './primitives'
import { useStorage } from '@common/storage'
import { filter, isEmpty, isString, map, noop, random, range, sortBy, uniq, xor } from 'lodash'
import { Category, CollectionName, Item, ItemAttr } from '@common/types'
import Fuse from 'fuse.js'
import { FileCard, TaskCard } from './cards'
import { useSearchHistory } from '@common/searchHistory'

const assets: any = {
  files: { items: 'files', attrs: 'fileAttrs', ItemCard: FileCard },
  tasks: { items: 'tasks', attrs: 'taskAttrs', ItemCard: TaskCard },
}

const MobileHead: SFC<{ title: string; actions?: ReactNode[]; search?: boolean }> = ({
  title,
  actions,
  search = true,
  children,
}) => {
  const setMobileSearch = useStorage((s) => s.setMobileSearch)
  return (
    <Header
      css={{ pl: 16, pr: 12, bg: '$gray100', pos: 'sticky', t: 0, z: 1, pb: children ? 8 : 0 }}
    >
      <Div
        css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 53 }}
      >
        <H3 css={{ fontSize: 20, fontWeight: 500 }}>{title}</H3>
        <Div css={{ display: 'flex', gap: 8 }}>
          {actions}
          {search && (
            <Button icon='search' colors='no_bg' size={1} onClick={() => setMobileSearch(true)} />
          )}
        </Div>
      </Div>
      <Div css={{ pr: 4 }}>{children}</Div>
    </Header>
  )
}

const MobileRoot = styled('div', { height: '100%', overflow: 'auto' })
const MobileBody = styled('div', { display: 'flex', flexDirection: 'column', pb: 8 })

// section #########################################################################################
//  SEARCH
// #################################################################################################

const NoResults: SFC = () => {
  return <Div css={{ px: 12, textAlign: 'center', mt: 16, fs: 13 }}>Нет результатов поиска</Div>
}

type SearchView = 'history' | 'results' | 'settings'

const MobileSearch: SFC = () => {
  const setMobileSearch = useStorage((s) => s.setMobileSearch)
  const get = useStorage((s) => s.get)
  const getValue = useStorage((s) => s.getValue)

  const [filter, setFilter] = useState<Category[]>(['files', 'tasks'])
  const [view, setView] = useState<SearchView>('history')
  const [query, setQuery] = useState('')

  const fuses = filter.map((category) => {
    const items = get<Item[]>(category)
    const attrs = get<ItemAttr[]>(assets[category].attrs as CollectionName, { search: true })
    const fuse = new Fuse(items, {
      keys: attrs.map((attr) => ({ name: attr.path, weight: attr.searchWeight ?? 1 })),
      getFn: (item, path) => {
        const pathname = isString(path) ? path : path.join('.')
        return [getValue(item, pathname as string)]
          .flat()
          .map((r) => r.value)
          .filter((v) => !!v)
      },
      threshold: 0.4,
      ignoreLocation: true,
      includeScore: true,
      includeMatches: true,
    })
    return [category, fuse] as [Category, Fuse<Item>]
  })

  const results = fuses
    .map(([category, fuse]) => fuse.search(query).map((v) => ({ ...v, category })))
    .flat()
    .sort((a, b) => Number(a.score) - Number(b.score))

  const searchHistory = useSearchHistory()

  const handleCardClick = (href: string) => {
    searchHistory.add(query, href)
    setMobileSearch(false)
  }

  return (
    <Div
      css={{
        pos: 'fixed',
        in: 0,
        s: '100%',
        bg: 'rgb(0 0 0 / .75)',
        backdropFilter: 'blur(2px)',
        of: 'hidden',
      }}
    >
      <Div css={{ d: 'flex', px: 12, h: 53, ai: 'center', g: 4 }}>
        <Button
          icon='filter'
          size={1}
          colors={{ preset: 'no_bg', active: { color: 'cyan' } }}
          active={view === 'settings'}
          onClick={() => {
            setView(view !== 'settings' ? 'settings' : isEmpty(query) ? 'history' : 'results')
          }}
        />
        <Input
          type='text'
          placeholder='Поиск...'
          value={query}
          onChange={(e) => {
            const { value } = e.target
            setQuery(value)
            setView(isEmpty(value) ? 'history' : 'results')
          }}
          autoFocus
          css={{ flex: 1, bg: '$gray800', py: 8, px: 12, bdrad: 999, c: '$gray200' }}
        />
        <Button icon='close' colors='no_bg' size={1} onClick={() => setMobileSearch(false)} />
      </Div>
      {view === 'history' && isEmpty(searchHistory.history) && <NoResults />}
      {view === 'history' && !isEmpty(searchHistory.history) && (
        <Div
          css={{
            d: 'flex',
            fd: 'column',
            h: 'calc(100dvh - 53px)',
            g: 8,
            px: 16,
            pb: 16,
            of: 'auto',
          }}
        >
          {searchHistory.history.map(({ query, href }, i) => (
            <RouteLink
              key={`${i}-${query}`}
              href={href}
              css={{
                d: 'flex',
                ai: 'center',
                jc: 'space-between',
                bg: 'rgb(255 255 255 / 0.035)',
                bdrad: 4,
                flexShrink: 0,
              }}
              onClick={() => setMobileSearch(false)}
            >
              <Div css={{ fs: 16, px: 8, py: 12 }}>{query}</Div>
              <Button icon='link' colors={{ preset: 'no_bg', color: 'rgb(255 255 255 / 0.5)' }} />
            </RouteLink>
          ))}
        </Div>
      )}
      {view === 'results' && isEmpty(results) && <NoResults />}
      {view === 'results' && !isEmpty(results) && (
        <Div
          css={{
            d: 'flex',
            fd: 'column',
            h: 'calc(100dvh - 53px)',
            g: 8,
            px: 16,
            pb: 16,
            of: 'auto',
          }}
        >
          {results.map(({ item, category, matches }) => {
            const { ItemCard } = (assets as any)[category]
            const href = `/${category}/${item.id}`
            return (
              <ItemCard
                key={href}
                href={href}
                options={[]}
                item={item}
                updateItem={noop}
                deleteItem={noop}
                content={uniq(map(matches, 'key'))}
                mobile
                onClick={() => handleCardClick(href)}
              />
            )
          })}
        </Div>
      )}
      {view === 'settings' && (
        <Div css={{ d: 'flex', fd: 'column', g: 8, px: 56, mt: 16 }}>
          <Div css={{ d: 'flex', jc: 'space-between' }}>
            <Span css={{ fs: 16 }}>Файлы</Span>
            <Button
              active={filter.includes('files')}
              onClick={() => setFilter(xor(filter, ['files']))}
            >
              switch
            </Button>
          </Div>
          <Div css={{ d: 'flex', jc: 'space-between' }}>
            <Span css={{ fs: 16 }}>Задания</Span>
            <Button
              active={filter.includes('tasks')}
              onClick={() => setFilter(xor(filter, ['tasks']))}
            >
              switch
            </Button>
          </Div>
        </Div>
      )}
    </Div>
  )
}

export const Mobile = {
  Root: MobileRoot,
  Head: MobileHead,
  Body: MobileBody,
  Search: MobileSearch,
}
