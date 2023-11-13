import { random, range } from 'lodash'

import { SFC, styled } from '@common/styles'

const docs = range(random(2, 5))

const Title = styled('h4', {
  fontSize: '1rem',
  fontWeight: '100',
  letterSpacing: '.05em',
  color: '$gray900',
  textTransform: 'uppercase',
  padding: '.5rem',
})

const Task = styled('li', {
  height: '3rem',
  background: '#333',
  cursor: 'pointer',
  borderRadius: 4,
})

const List = styled('ul', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
  padding: '.5rem',
  overflowY: 'auto',
  scrollbarSize: 8,
  scrollbarTrackColor: '#232323',
  scrollbarThumbColor: '#666',
  scrollbarThumbColorHovered: '#777',
})

const Root = styled('div', {
  paddingTop: '.5rem',
})

const Tasks: SFC = () => {
  return (
    <Root>
      <Title>Задания</Title>
      <List>
        {docs.map((id) => (
          <Task key={id}>{id}</Task>
        ))}
      </List>
    </Root>
  )
}

export default Tasks
