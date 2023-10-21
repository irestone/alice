import { useCallback } from 'react'
import { useRouter } from 'next/router'
import * as ContextMenu from '@radix-ui/react-context-menu'
import { ChevronRightIcon } from '@radix-ui/react-icons'

import { TFile, TTask } from '../../_types'
import { SFC, styled } from '../../_styles'
import { Button, Div, RouteLink } from '../_primitives'
import { useControlPanelStore } from './_store'

// section #########################################################################################
//  CHILD COPONENTS
// #################################################################################################

const Checkbox = styled(Button, {
  width: 16,
  aspectRatio: 1,
  background: 'transparent',
  border: '1px solid $gray300',
  borderRadius: 4,
  position: 'absolute',
  top: '.5rem',
  left: '.5rem',
  '&:hover': { borderColor: '$gray400' },
  variants: {
    checked: {
      true: {
        '&::after': {
          content: '""',
          width: 8,
          aspectRatio: 1,
          borderRadius: 2,
          background: '$accent',
          position: 'absolute',
          inset: 0,
          margin: 'auto',
        },
      },
    },
  },
})

const Root = styled(RouteLink, {
  fontSize: '.8rem',
  color: '$gray600',
  display: 'flex',
  gap: '1rem',
  height: '7rem',
  padding: '.5rem',
  paddingLeft: '2rem',
  flexShrink: 0,
  border: '1px solid $gray300',
  borderRadius: 4,
  background: '#1a1a1a',
  boxShadow: '0 0 10px rgb(0 0 0 / .35)',
  position: 'relative',
  overflow: 'clip',
  cursor: 'default',
  userSelect: 'none',
  '&:hover': {
    background: '#1c1c1c',
  },
  variants: {
    active: {
      true: {
        '&::before': {
          content: '""',
          width: 3,
          height: '100%',
          background: '$accent',
          position: 'absolute',
          left: 0,
          top: 0,
        },
      },
    },
  },
})

const ContextMenuContent = styled(ContextMenu.Content, {
  padding: '.3rem',
  borderRadius: 2,
  background: '#414447',
  border: '1px solid #595959',
  display: 'flex',
  flexDirection: 'column',
})

const ContextMenuSubContent = styled(ContextMenu.SubContent, {
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
  borderRadius: 4,
  display: 'flex',
  justifyContent: 'space-between',
  gap: '.3rem',
  '&:hover': {
    background: '#fff1',
  },
})

const ContextMenuSubTrigger = styled(ContextMenu.SubTrigger, {
  fontSize: '.82rem',
  fontWeight: '330',
  textTransform: 'none',
  color: '#bababa',
  padding: '.4rem .6rem',
  cursor: 'pointer',
  borderRadius: 4,
  display: 'flex',
  justifyContent: 'space-between',
  gap: '.5rem',
  '&:hover': {
    background: '#fff1',
  },
})

const ContextMenuSeparator = styled(ContextMenu.Separator, {
  height: 1,
  background: '#595959',
  margin: '.3rem 0',
})

const ChevronIcon = styled(ChevronRightIcon, {
  fill: '#bababa',
})

// section #########################################################################################
//  FILE CARD
// #################################################################################################

export const FileCard: SFC<TFile> = ({ id, pinned, groups, data }) => {
  const router = useRouter()
  const isActive = useCallback((id: string) => router.query.id === id, [router.query.id])

  const selection = useControlPanelStore((api) => api.selection)
  const toggleSelect = useControlPanelStore((api) => api.toggleSelect)

  const handleCardSelect = useCallback(
    (e: any) => {
      e.preventDefault()
      toggleSelect(id)
    },
    [toggleSelect, id]
  )

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Root href={`/files/${id}`} active={isActive(id)} onDoubleClick={console.log}>
          <Checkbox checked={selection.includes(id)} onClick={handleCardSelect} />
          <Div>
            <Div>FILE_ID {id}</Div>
            {groups.map((id) => (
              <Div key={id}>GROUP_ID {id}</Div>
            ))}
            {pinned && <Div>PINNED</Div>}
          </Div>
          <Div>
            <Div>PROP_1 {data.prop1}</Div>
            <Div>PROP_2 {data.prop2}</Div>
            <Div>PROP_3 {data.prop3.toString()}</Div>
            <Div>PROP_4 {data.prop4}</Div>
          </Div>
        </Root>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenuContent>
          <ContextMenuItem>Закрепить</ContextMenuItem>
          <ContextMenu.Sub>
            <ContextMenuSubTrigger>
              Добавить в группу
              <ChevronIcon />
            </ContextMenuSubTrigger>
            <ContextMenu.Portal>
              <ContextMenuSubContent>
                <ContextMenuItem>группа 1</ContextMenuItem>
                <ContextMenuItem>группа 4</ContextMenuItem>
                <ContextMenuItem>группа 5</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>+ Новая группа...</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
          <ContextMenu.Sub>
            <ContextMenuSubTrigger>
              Убрать из группы
              <ChevronIcon />
            </ContextMenuSubTrigger>
            <ContextMenu.Portal>
              <ContextMenuSubContent>
                <ContextMenuItem>группа 2</ContextMenuItem>
                <ContextMenuItem>группа 3</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
          <ContextMenuItem>Экспортировать...</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenu.Sub>
            <ContextMenuSubTrigger>
              Управление
              <ChevronIcon />
            </ContextMenuSubTrigger>
            <ContextMenu.Portal>
              <ContextMenuSubContent>
                <ContextMenuItem>Отложить</ContextMenuItem>
                <ContextMenuItem>Убрать в архив</ContextMenuItem>
                <ContextMenuItem>Удалить</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
        </ContextMenuContent>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}

// section #########################################################################################
//  TASK CARD
// #################################################################################################

export const TaskCard: SFC<TTask> = ({ id, pinned, groups, data }) => {
  const router = useRouter()
  const isActive = useCallback((id: string) => router.query.id === id, [router.query.id])

  const selection = useControlPanelStore((api) => api.selection)
  const toggleSelect = useControlPanelStore((api) => api.toggleSelect)

  const handleCardSelect = useCallback(
    (e: any) => {
      e.preventDefault()
      toggleSelect(id)
    },
    [toggleSelect, id]
  )

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Root href={`/tasks/${id}`} active={isActive(id)} onDoubleClick={console.log}>
          <Checkbox checked={selection.includes(id)} onClick={handleCardSelect} />
          <Div>
            <Div>TASK_ID {id}</Div>
            {groups.map((id) => (
              <Div key={id}>GROUP_ID {id}</Div>
            ))}
            {pinned && <Div>PINNED</Div>}
          </Div>
          <Div>
            <Div>NAME {data.name}</Div>
            <Div>DESCRIPTION {data.description}</Div>
          </Div>
        </Root>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenuContent>
          <ContextMenuItem>Закрепить</ContextMenuItem>
          <ContextMenu.Sub>
            <ContextMenuSubTrigger>
              Добавить в группу
              <ChevronIcon />
            </ContextMenuSubTrigger>
            <ContextMenu.Portal>
              <ContextMenuSubContent>
                <ContextMenuItem>группа 1</ContextMenuItem>
                <ContextMenuItem>группа 4</ContextMenuItem>
                <ContextMenuItem>группа 5</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>+ Новая группа...</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
          <ContextMenu.Sub>
            <ContextMenuSubTrigger>
              Убрать из группы
              <ChevronIcon />
            </ContextMenuSubTrigger>
            <ContextMenu.Portal>
              <ContextMenuSubContent>
                <ContextMenuItem>группа 2</ContextMenuItem>
                <ContextMenuItem>группа 3</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
          <ContextMenuItem>Экспортировать...</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenu.Sub>
            <ContextMenuSubTrigger>
              Управление
              <ChevronIcon />
            </ContextMenuSubTrigger>
            <ContextMenu.Portal>
              <ContextMenuSubContent>
                <ContextMenuItem>Отложить</ContextMenuItem>
                <ContextMenuItem>Убрать в архив</ContextMenuItem>
                <ContextMenuItem>Удалить</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
        </ContextMenuContent>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
