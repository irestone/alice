import react from 'react'

import { Button, Div, Heading2, SFC, styled } from '../../styles/components'
import { useControlPanelStore } from './store'

const Title = styled(Heading2, {
  fontSize: '1rem',
  fontWeight: '100',
  letterSpacing: '.05em',
  color: '$gray900',
  textTransform: 'uppercase',
})

const ActionButton = styled(Button, {
  fontSize: '.55rem',
  fontWeight: 500,
  color: '#b0b0b0',
  border: '1px solid #8b8b8b',
  padding: '.4em .6em',
  borderRadius: 4,
  lineHeight: 1.2,
  textTransform: 'uppercase',
  '&:hover': {
    background: '$accent',
    color: '#eaeaea',
    borderColor: '#418cc5',
  },
})

const ActionGroup = styled('div', {
  display: 'flex',
  gap: 12,
})

const Root = styled(Div, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '.8rem calc(.3rem + 6px) 0 calc(.3rem + 3px)',
})

const Headline: SFC = () => {
  const contentType = useControlPanelStore((api) => api.contentType)

  if (contentType === 'files') {
    return (
      <Root>
        <Title>Картотека</Title>
        <ActionGroup>
          <select>
            <option value='in_work'>в работе</option>
            <option value='on_hold'>отложенные</option>
            <option value='archived'>архив</option>
          </select>
          <ActionButton>+ новый файл</ActionButton>
        </ActionGroup>
      </Root>
    )
  }

  if (contentType === 'tasks') {
    return (
      <Root>
        <Title>Задания</Title>
        <ActionGroup>
          <select>
            <option value='in_work'>в работе</option>
            <option value='on_hold'>отложенные</option>
            <option value='archived'>архив</option>
          </select>
          <ActionButton>+ новое задание</ActionButton>
        </ActionGroup>
      </Root>
    )
  }

  return <Root>UNKNOWN CONTENT TYPE</Root>
}

export default Headline
