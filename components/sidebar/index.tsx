import { Aside, SFC, styled } from '../../styles/components'
import Documents from './documents'
import Tasks from './tasks'

const Root = styled(Aside, {
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  background: '#181818',
})

const Sidebar: SFC = () => {
  return (
    <Root>
      <Documents />
      <Tasks />
    </Root>
  )
}

export default Sidebar
