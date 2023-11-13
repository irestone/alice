import * as T from '@common/types'
import { SFC, styled } from '@common/styles'
import { Div } from '@lib/primitives'

const Content = styled('div', {
  display: 'block',
  height: '40rem',
  background: '#333',
  color: '$gray600',
})

const Root = styled('div', {
  maxWidth: '53rem',
  margin: '1rem auto 3rem',
})

export const Task: SFC<{
  data: T.Task
  update: (values: Partial<T.Task>) => void
  mobile?: boolean
}> = (props) => {
  return (
    <Root>
      <Content>
        <Div>{props.data.name}</Div>
        <Div>{props.data.description}</Div>
      </Content>
    </Root>
  )
}
