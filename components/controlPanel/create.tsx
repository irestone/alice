import { SFC, styled } from '../../_styles'
import { Button } from '../_primitives'

const CreateItemButton = styled(Button, {
  fontSize: '.55rem',
  fontWeight: 500,
  color: '#b0b0b0',
  border: '1px solid #8b8b8b',
  padding: '.4em .6em',
  borderRadius: 4,
  lineHeight: 1.2,
  textTransform: 'uppercase',
  '&:hover': {
    background: '$accent',
    color: '#eaeaea',
    borderColor: '#418cc5',
  },
})

const CreateFile: SFC = () => <CreateItemButton>+ новый файл</CreateItemButton>
const CreateTask: SFC = () => <CreateItemButton>+ новое задание</CreateItemButton>

export { CreateFile, CreateTask }
