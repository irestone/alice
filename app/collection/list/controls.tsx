import react from 'react'
import { SFC, styled } from '@common/styles'
import { ID, ItemAttr, NamedEntry } from '@common/types'
import { Rule } from './controls/filter/rules'
import { Select } from '@lib/fields'
import { CardVariant } from '@lib/cards'
import { Display } from './controls/display'
import { Filter } from './controls/filter'

export type { Rule } from './controls/filter/rules'

const Start = styled('div', { d: 'flex', g: 8, ai: 'center', overflowX: 'auto' })
const End = styled('div', {
  d: 'flex',
  g: 8,
  ai: 'center',
  bg: '$gray100',
  of: 'visible',
  pos: 'absolute',
  in: '0 0 0 auto',
})
const Root = styled('div', { d: 'flex', ai: 'center', h: 40, pr: 72, pos: 'relative' })

//todo если атрибуты или фильтры не заданы, то при нажатии сразу открывается настройка
// (вместо удерживания)

export const Controls: SFC<{
  status: ID
  setStatus: (id: ID) => void
  statusOptions: NamedEntry[]
  grouping: ID
  setGrouping: (id: ID) => void
  groupingOptions: NamedEntry[]
  variant: CardVariant
  setVariant: (variant: CardVariant) => void
  content: ID[]
  setContent: (ids: ID[]) => void
  filtering: boolean
  setFiltering: (filtering: boolean) => void
  filter: Rule[]
  setFilter: (rules: Rule[]) => void
  attrs: ItemAttr[] | [NamedEntry, ItemAttr[]]
}> = (props) => {
  const { status, setStatus, statusOptions } = props
  const { grouping, setGrouping, groupingOptions } = props
  const { variant, setVariant, content, setContent } = props
  const { filtering, setFiltering, filter, setFilter } = props
  const { attrs } = props
  return (
    <Root>
      <Start>
        <Select icon='status' value={status} onChange={setStatus} options={statusOptions} />
        <Select icon='grouping' value={grouping} onChange={setGrouping} options={groupingOptions} />
      </Start>
      <End>
        <Display
          variant={variant}
          onVariantChange={setVariant}
          content={content}
          onContentChange={setContent}
          attrs={attrs}
        />
        <Filter
          applied={filtering}
          onAppliedChange={setFiltering}
          rules={filter}
          onRulesChange={setFilter}
          attrs={attrs}
        />
      </End>
    </Root>
  )
}
