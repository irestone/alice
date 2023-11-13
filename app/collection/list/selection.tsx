import { SFC, styled } from '@common/styles'
import * as T from '@common/types'
import { Button } from '@lib/buttons'
import { Div, Span } from 'lib/primitives'

const Group = styled('div', { d: 'flex', g: 8, ai: 'center' })
const Root = styled('div', { d: 'flex', jc: 'space-between', ai: 'center', h: 40, pos: 'relative' })

export const Selection: SFC<{
  items: T.File[] | T.Task[]
  updateItems: (changes: Partial<T.File> | Partial<T.Task>) => void
  deleteItems: () => void
  clearSelection: () => void
  status: T.ID
}> = (props) => {
  const { status } = props
  return (
    <Root>
      <Group>
        <Button icon='close' colors='no_bg' onClick={props.clearSelection} />
        <Span css={{ fs: 16 }}>{props.items.length}</Span>
      </Group>
      <Group css={{ g: 4 }}>
        <Div css={{ d: 'flex', ai: 'center' }}>
          <Button icon='pin' size={1} colors='no_bg' />
          <Button icon='subscribe' size={1} colors='no_bg' />
          <Div css={{ w: 2, h: 16, mx: 8, bg: '$gray300' }} />
          {status === 'working' && <Button icon='postpone' size={1} colors='no_bg' />}
          {(status === 'oh_hold' || status === 'archived') && (
            <Button icon='work' size={1} colors='no_bg' />
          )}
          <Button icon='archive' size={1} colors='no_bg' />
          <Button icon='delete' size={1} colors={{ color: 'indianred', preset: 'no_bg' }} />
        </Div>
        <Button icon='options' colors='no_bg' />
      </Group>
    </Root>
  )
}
