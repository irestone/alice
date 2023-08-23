import { Children } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import * as ContextMenu from '@radix-ui/react-context-menu'
import { PlusIcon, MinusIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import { Div, SFC, Span, styled } from '../../../styles/components'
import { TGroup } from '../types'

const AccordionTrigger = styled(Accordion.Trigger)

const ContextMenuContent = styled(ContextMenu.Content, {
  padding: '.3rem',
  borderRadius: 2,
  background: '#414447',
  border: '1px solid #595959',
  display: 'flex',
  flexDirection: 'column',
})

const ContextMenuItem = styled(ContextMenu.Item, {
  fontSize: '.82rem',
  fontWeight: '330',
  textTransform: 'none',
  color: '#bababa',
  padding: '.4rem .6rem',
  cursor: 'pointer',
  borderRadius: 2,
  '&:hover': {
    background: '#fff1',
  },
})

const Group: SFC<TGroup> = ({ id, name, children }) => {
  const count = Children.count(children)
  return (
    <Accordion.Item value={id}>
      <AccordionTrigger
        css={{
          width: '100%',
          padding: '.4rem 0',
          paddingLeft: 'calc(var(--gap) + .5rem)',
          background: '#2d3b47',
          fontSize: '.75rem',
          fontWeight: 600,
          letterSpacing: '.05em',
          lineHeight: 1,
          color: '#b3b3b3',
          textTransform: 'uppercase',
          userSelect: 'none',
          '&:hover': { background: '#33424f' },
          '&[data-state="open"] .plus-icon': { display: 'none' },
          '&[data-state="closed"] .minus-icon': { display: 'none' },
        }}
      >
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <Div css={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
              <PlusIcon
                className='plus-icon'
                style={{ width: '1rem', height: '1rem', padding: 2, fill: '#eee' }}
              />
              <MinusIcon
                className='minus-icon'
                style={{ width: '1rem', height: '1rem', padding: 2, fill: '#eee' }}
              />
              <Span>
                {name}
                <Span css={{ color: '#6a6a6a', marginLeft: '.3rem' }}>({count})</Span>
              </Span>
            </Div>
          </ContextMenu.Trigger>
          <ContextMenu.Portal>
            <ContextMenuContent>
              <ContextMenuItem>Развернуть</ContextMenuItem>
              <ContextMenuItem>Свернуть все группы</ContextMenuItem>
              <ContextMenuItem>Развернуть все группы</ContextMenuItem>
              <ContextMenuItem>Переименовать</ContextMenuItem>
              <ContextMenuItem>Удалить</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      </AccordionTrigger>
      <Accordion.Content>
        <Div
          css={{
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--gap)',
            gap: 'var(--gap)',
          }}
        >
          {children}
        </Div>
      </Accordion.Content>
    </Accordion.Item>
  )
}

export default Group
