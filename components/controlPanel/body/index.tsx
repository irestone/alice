import { useMemo } from 'react'
import { filter, isEmpty, map, random, range, sampleSize } from 'lodash'
import * as Accordion from '@radix-ui/react-accordion'

import { SFC, styled } from '../../../styles/components'
import Card from './card'
import { TCard, TGroup } from '../types'
import Group from './group'
import { genCard, stubGroups } from '../utils'

const Root = styled(Accordion.Root, {
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

const Body: SFC = () => {
  const cards = useMemo<TCard[]>(() => range(20).map(genCard), [])
  const pinned = useMemo<TCard[]>(() => filter(cards, 'pinned'), [cards])
  const grouped = useMemo<[TGroup, TCard[]][]>(() => {
    return stubGroups
      .map((group) => {
        const groupCards = cards.filter(({ groups }) => groups.includes(group.id))
        return [group, groupCards]
      })
      .filter(([_, groupCards]) => !isEmpty(groupCards))
      .sort(([a]: any, [b]: any) => a.name.localeCompare(b.name)) as any
  }, [cards])
  const notGroupedOrPinned = useMemo<TCard[]>(
    () => cards.filter(({ groups, pinned }) => isEmpty(groups) && !pinned),
    [cards]
  )
  return (
    <Root
      type='multiple'
      defaultValue={['pinned', ...map(sampleSize(stubGroups, random(stubGroups.length)), 'id')]}
    >
      {!isEmpty(pinned) && (
        <Group id='pinned' name='закрепленные'>
          {pinned.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </Group>
      )}
      {grouped.map(([group, cards]) => (
        <Group key={group.id} {...group}>
          {cards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </Group>
      ))}
      {!isEmpty(notGroupedOrPinned) && (
        <Group id='notGroupedOrPinned' name='без группы'>
          {notGroupedOrPinned.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </Group>
      )}
    </Root>
  )
}

export default Body
