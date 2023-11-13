import { SFC } from '@common/styles'
import { Category } from '@common/types'
import { Div } from '@lib/primitives'

export const Dashboard: SFC<{ category: Category }> = ({ category }) => {
  return (
    <Div css={{ display: 'grid', gap: 16, p: 16, height: '100%', overflow: 'auto' }}>
      <h1>Дашборд {category}</h1>
      <div style={{ height: 500, background: 'gray' }}>block</div>
      <div style={{ height: 300, background: 'gray' }}>block</div>
      <div style={{ height: 400, background: 'gray' }}>block</div>
      <div style={{ height: 350, background: 'gray' }}>block</div>
    </Div>
  )
}
