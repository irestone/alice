import { TFile } from '../_types'
import { SFC, styled } from '../_styles'
import { Div } from './_primitives'

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

interface IFile {
  file: TFile
  update: (changes: Partial<TFile>) => void
}

const File: SFC<IFile> = ({ file, update }) => {
  return (
    <Root>
      <Content>
        <Div>FILE_ID {file.id}</Div>
        <Div>FILE_BODY: {file.data.toString()}</Div>
      </Content>
    </Root>
  )
}

export default File
