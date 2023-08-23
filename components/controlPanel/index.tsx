import { Aside, SFC, styled } from '../../styles/components'
import Menu from './menu'
import Head from './head'
import Body from './body'

const Root = styled(Aside, {
  width: '27rem',
  height: '100%',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  background: '#181818',
})

const ControlPanel: SFC = () => {
  return (
    <Root>
      <Menu />
      <Head />
      <Body />
    </Root>
  )
}

export default ControlPanel

// todo: open multiple files and show them as tabs in viewport (like in editors)
