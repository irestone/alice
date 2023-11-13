import { useState } from 'react'
import { SFC, styled } from '@common/styles'
import { ID, ItemAttr, NamedEntry } from '@common/types'
import { Rule } from './controls/filter/rules'
import { Button } from '@lib/buttons'

export { useFilterPredicate } from './controls/filter'
export type { Rule } from './controls/filter/rules'

const Group = styled('div', { d: 'flex', g: 8, ai: 'center' })
const Root = styled('div', { d: 'flex', jc: 'space-between', ai: 'center', h: 40, pos: 'relative' })

export const Controls: SFC<{
  status: ID
  setStatus: (id: ID) => void
  statusOptions: NamedEntry[]
  filter: Rule[]
  setFilter: (rules: Rule[]) => void
  filterAttrs: ItemAttr[]
  grouping: ID
  setGrouping: (id: ID) => void
  groupingOptions: NamedEntry[]
}> = (props) => {
  const { status, setStatus, statusOptions } = props
  const { grouping, setGrouping, groupingOptions } = props
  const { filter, setFilter, filterAttrs } = props

  const [active, setActive] = useState(false)
  const [expanded, setExpanded] = useState(false)

  return (
    <Root>
      <Group>
        <Button icon='status' corners='smooth'>
          текущие
        </Button>
        <Button icon='grouping' corners='smooth'>
          мои группы
        </Button>
      </Group>
      <Group>
        <Button
          icon={expanded ? 'collapse' : 'expand'}
          colors='no_bg'
          onClick={() => setExpanded(!expanded)}
        />
        <Button
          icon='filter'
          colors='active_bg'
          // colors={{ preset: 'no_bg', active: { color: 'cyan' } }}
          corners='smooth'
          active={active}
          onClick={() => setActive(!active)}
        />
      </Group>
    </Root>
  )
}
