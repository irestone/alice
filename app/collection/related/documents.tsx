import { random, range } from 'lodash'

import { SFC, styled } from '@common/styles'

const docs = range(6)

const Title = styled('h4', {
  fontSize: '1rem',
  fontWeight: '100',
  letterSpacing: '.05em',
  color: '$gray900',
  textTransform: 'uppercase',
  padding: '.5rem',
})

const Doc = styled('li', {
  height: '100%',
  flexShrink: 0,
  background: '#333',
  cursor: 'zoom-in',
})

const List = styled('ul', {
  display: 'flex',
  gap: '.5rem',
  padding: '.5rem 0',
  margin: '0 .5rem',
  height: '14rem',
  overflowX: 'auto',
  scrollbarSize: 8,
  scrollbarTrackColor: '#232323',
  scrollbarThumbColor: '#666',
  scrollbarThumbColorHovered: '#777',
})

const Root = styled('div', {
  paddingTop: '.5rem',
})

const Documents: SFC = () => {
  return (
    <Root>
      <Title>Документы</Title>
      <List>
        {docs.map((id) => (
          <Doc key={id} css={{ aspectRatio: random(0.7, 1.4) }}>
            {id}
          </Doc>
        ))}
      </List>
    </Root>
  )
}

export default Documents
