import { Div, SFC, styled } from '../styles/components'
import { TFile } from '../types'
import Activity from './activity'

const Content = styled('div', {
  display: 'block',
  height: '40rem',
  background: '#333',
  color: '$gray600',
})

const Root = styled('div', {
  maxWidth: '53rem',
  margin: '1rem auto 3rem',
})

const File: SFC<TFile & { onChange: (values: any) => void }> = ({ id, onChange }) => {
  return (
    <Root>
      <Content>
        <Div>FILE_ID {id}</Div>
        <Div>FILE_BODY</Div>
      </Content>
    </Root>
  )
}

export default File
