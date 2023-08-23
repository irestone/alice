import { Div, SFC, styled } from '../../styles/components'
import { TFile } from '../../types'
import Activity from './activity'

const Body = styled('div', {
  display: 'block',
  height: '40rem',
  background: '#333',
  color: '$gray600',
})

const Root = styled('div', {
  maxWidth: '53rem',
  margin: '1rem auto 3rem',
})

const File: SFC<TFile> = ({ id }) => {
  return (
    <Root>
      <Body>
        <Div>FILE_ID {id}</Div>
        <Div>FILE_BODY</Div>
      </Body>
      <Activity fileId={id} />
    </Root>
  )
}

export default File
