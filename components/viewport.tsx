import { styled } from '../styles/components'

const Viewport = styled('main', {
  flex: 1,
  padding: '1rem',
  borderLeft: '1px solid #2c2c2c',
  borderRight: '1px solid #2c2c2c',
  background: '#1f1f1f',
  overflow: 'auto',
  scrollbarSize: 8,
  scrollbarTrackColor: '#232323',
  scrollbarThumbColor: '#666',
  scrollbarThumbColorHovered: '#777',
})

export default Viewport
