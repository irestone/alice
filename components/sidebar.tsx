import { Aside, SFC, styled } from '../styles/components'

const Root = styled(Aside, {
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

const Sidebar: SFC = ({ children }) => {
  return <Root>{children}</Root>
}

export default Sidebar
