import { styled } from '../styles/components'

const Sidebar = styled('aside', {
  display: 'flex',
  flexDirection: 'column',
  width: '32rem',
  background: '#181818',
  overflowX: 'hidden',
  overflowY: 'auto',
  scrollbarSize: 8,
  scrollbarTrackColor: '#232323',
  scrollbarThumbColor: '#666',
  scrollbarThumbColorHovered: '#777',
})

export default Sidebar
