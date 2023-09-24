import { Div, SFC, styled } from '../styles/components'
import { TTask } from '../types'

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

const Task: SFC<TTask & { onChange: (values: any) => void }> = ({ id, name, description }) => {
  return (
    <Root>
      <Content>
        <Div>{name}</Div>
        <Div>{description}</Div>
      </Content>
    </Root>
  )
}

export default Task
