import react from 'react'
import * as RadixPopover from '@radix-ui/react-popover'

import { Button, SFC, styled } from '../../_primitives'

const RxRoot = styled(RadixPopover.Root)
const RxTrigger = styled(RadixPopover.Trigger)
const RxPortal = styled(RadixPopover.Portal)
const RxContent = styled(RadixPopover.Content)

const Trigger: SFC<{ highlight?: boolean }> = ({ highlight }) => {
  return (
    <RxTrigger
      css={{
        fontSize: '.82rem',
        fontWeight: 330,
        color: '#bababa',
        padding: '.4rem .6rem',
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'space-between',
        gap: '.3rem',
        '&:hover': {
          background: '#fff1',
        },
      }}
    >
      + Добавить
    </RxTrigger>
  )
}

const Popover: SFC = ({ children }) => {
  return (
    <RxPortal>
      <RxContent
        align='start'
        sideOffset={4}
        collisionPadding={10}
        arrowPadding={4}
        css={{
          minWidth: '10rem',
          padding: '.3rem',
          borderRadius: 4,
          background: '#414447',
          border: '1px solid #595959',
          color: '#bababa',
          fontSize: '.9rem',
          fontWeight: '200',
        }}
      >
        {children}
      </RxContent>
    </RxPortal>
  )
}

const Root = RxRoot

const Add: SFC<{
  options: any[]
  onSubmit: (option: any) => void
}> = ({ options, onSubmit }) => {
  return (
    <Root>
      <Trigger />
      <Popover>
        {options.map((item) => (
          <Button key={item.type} onClick={() => onSubmit(item)}>
            {item.label} [{item.type}]
          </Button>
        ))}
      </Popover>
    </Root>
  )
}

export default Add
