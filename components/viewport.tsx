import { styled } from '../styles/components'

const Viewport = styled('main', {
  height: '100%',
  overflow: 'auto',
  padding: '1rem',
  background: '#1f1f1f',
  borderLeft: '1px solid #2c2c2c',
  borderRight: '1px solid #2c2c2c',
  overflowY: 'auto',
  scrollbarSize: 8,
  scrollbarTrackColor: '#232323',
  scrollbarThumbColor: '#666',
  scrollbarThumbColorHovered: '#777',
})

export default Viewport
