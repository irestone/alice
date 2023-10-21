import { TTask } from '../_types'
import { SFC, styled } from '../_styles'
import { Div } from './_primitives'

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

interface ITask {
  task: TTask
  update: (changes: Partial<TTask>) => void
}

const Task: SFC<ITask> = ({ task, update }) => {
  return (
    <Root>
      <Content>
        <Div>{task.data.name}</Div>
        <Div>{task.data.description}</Div>
      </Content>
    </Root>
  )
}

export default Task
