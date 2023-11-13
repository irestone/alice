import { Breakpoint, SFC, styled } from '@common/styles'
import { Category } from '@common/types'
import { useMediaQueries } from '@common/utils'
import { Dashboard } from './collection/dashboard'
import { Item } from './collection/item'
import { List } from './collection/list'

const Root = styled('div', { h: '100%', overflow: 'hidden' })

export const Collection: SFC<{ category: Category; item?: string }> = ({ item, category }) => {
  const mq = useMediaQueries() //todo const { mq, mobile } = useMediaQueries()
  const mobile = mq(Breakpoint.handheld, Breakpoint.small) //!fix no magic 1000!

  if (mobile) {
    return (
      <Root>
        {item && <Item category={category} item={item} mobile />}
        {!item && <List category={category} mobile />}
      </Root>
    )
  }

  return (
    <Root>
      <List category={category} />
      {item && <Item category={category} item={item} />}
      {!item && <Dashboard category={category} />}
    </Root>
  )
}
