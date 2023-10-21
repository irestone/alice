import { styled } from '../../_styles'

export const ControlsGroup = styled('div', {
  display: 'flex',
  gap: '.3rem',
})

export const ControlsRow = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 'var(--gap)',
})

export const Controls = styled('div', {
  '--gap': '.3rem',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--gap)',
  padding: 'var(--gap)',
})

export const Head = styled('div', {
  '--bd-clr': '#42515d',
  '--bd': '1px solid var(--bd-clr)',
  background: 'linear-gradient(to bottom, #333d47, #374957)',
  borderBottom: 'var(--bd)',
})

export const Body = styled('div', {
  '--gap': '.35rem',
  overflowY: 'auto',
  scrollbarSize: 8,
  scrollbarTrackColor: '#232323',
  scrollbarThumbColor: '#666',
  scrollbarThumbColorHovered: '#777',
})

export const Root = styled('nav', {
  width: '27rem',
  height: '100%',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  background: '#181818',
})
