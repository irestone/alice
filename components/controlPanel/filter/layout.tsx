import { SFC, styled } from '../../../_styles'
import {
  Div,
  RadixPopoverArrow,
  RadixPopoverClose,
  RadixPopoverContent,
  RadixPopoverPortal,
  RadixPopoverRoot,
} from '../../_primitives'
import { CloseIcon } from '../../_icons'

// section #########################################################################################
//  POPOVER
// #################################################################################################

const Arrow = styled(RadixPopoverArrow, {
  fill: '#595959',
})

const Title = styled('h4', {
  textTransform: 'uppercase',
  fontWeight: 350,
  fontSize: '.75rem',
  padding: '0 0 .2rem',
  borderBottom: '1px solid #595959',
})

const Close: SFC = () => {
  return (
    <RadixPopoverClose
      css={{
        fontSize: '.8rem',
        height: 'calc(1em + 0.3rem)',
        aspectRatio: 1,
        padding: '.1rem',
        borderRadius: 2,
        position: 'absolute',
        top: '.2rem',
        right: '.2rem',
        '&:hover': { background: '#fff1' },
        svg: { width: '100%', height: '100%' },
      }}
    >
      <CloseIcon css={{ width: '100%', height: '100%', fill: '#aaa' }} />
    </RadixPopoverClose>
  )
}

const Content = styled(RadixPopoverContent, {
  minWidth: '10rem',
  padding: '.3rem',
  borderRadius: 4,
  background: '#414447',
  border: '1px solid #595959',
  color: '#bababa',
  fontSize: '.9rem',
  fontWeight: '200',
})

export const Popover: SFC = ({ children }) => {
  return (
    <RadixPopoverPortal>
      <Content align='start' sideOffset={4} collisionPadding={10} arrowPadding={4}>
        <Title>Фильтры</Title>
        <Div>{children}</Div>
        <Arrow />
        <Close />
      </Content>
    </RadixPopoverPortal>
  )
}

// section #########################################################################################
//  ROOT
// #################################################################################################

export const Root = RadixPopoverRoot
