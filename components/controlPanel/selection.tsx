import {
  DrawingPinIcon,
  ArchiveIcon,
  TrashIcon,
  CounterClockwiseClockIcon,
  SectionIcon,
  CaretDownIcon,
} from '@radix-ui/react-icons'

import { SFC, styled } from '../../_styles'
import { Button, Span } from '../_primitives'
import { CloseIcon } from '../_icons'
import { useControlPanelStore } from './_store'

const IconButton = styled(Button, {
  width: '1.2rem',
  aspectRatio: 1,
  padding: '.14rem',
  borderRadius: 2,
  '&:hover': { background: '#fff1' },
  svg: { width: '100%', height: '100%' },
})

const Group = styled('div', {
  display: 'flex',
  gap: '.3rem',
})

const Row = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 'var(--gap)',
})

const Root = styled('div', {
  '--gap': '.3rem',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--gap)',
  padding: 'var(--gap)',
})

const Controls: SFC = () => {
  const selection = useControlPanelStore((api) => api.selection)
  const clearSelection = useControlPanelStore((api) => api.clearSelection)

  return (
    <Root>
      <Row>
        <Group>
          <IconButton onClick={clearSelection}>
            <CloseIcon style={{ fill: '#ccc' }} />
          </IconButton>
          {selection.length}
        </Group>
      </Row>
      <Row css={{ justifyContent: 'flex-end' }}>
        <Group>
          <IconButton
            css={{
              width: 'auto',
              height: '1.4rem',
              aspectRatio: 'auto',
              padding: '.24rem',
              display: 'flex',
              alignItems: 'center',
              gap: '.2rem',
            }}
          >
            <DrawingPinIcon style={{ fill: '#ccc' }} />
            закрепить
          </IconButton>
          <IconButton
            css={{
              width: 'auto',
              height: '1.4rem',
              aspectRatio: 'auto',
              padding: '.24rem',
              display: 'flex',
              alignItems: 'center',
              gap: '.2rem',
            }}
          >
            <SectionIcon style={{ width: '1.4rem', height: '1.4rem', fill: '#ccc' }} />
            группы
            <CaretDownIcon style={{ width: '1.4rem', height: '1.4rem', fill: '#ccc' }} />
          </IconButton>
        </Group>
        <Span css={{ color: '#536675' }}>|</Span>
        <Group>
          <IconButton css={{ width: '1.4rem', padding: '.24rem' }} title='Отложить'>
            <CounterClockwiseClockIcon style={{ fill: '#ccc' }} />
          </IconButton>
          <IconButton css={{ width: '1.4rem', padding: '.24rem' }} title='Убрать в архив'>
            <ArchiveIcon style={{ fill: '#ccc' }} />
          </IconButton>
          <IconButton css={{ width: '1.4rem', padding: '.18rem' }} title='Удалить'>
            <TrashIcon style={{ fill: '#ccc' }} />
          </IconButton>
        </Group>
      </Row>
    </Root>
  )
}

export default Controls
