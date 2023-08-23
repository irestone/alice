import { useEffect, useState } from 'react'
import { isEmpty, noop } from 'lodash'
import * as Popover from '@radix-ui/react-popover'

import { Button, Div, Heading2, Input, SFC, Span, styled } from '../../styles/components'
import FilterIconSVG from '../../public/assets/filter-icon.svg'
import SearchIconSVG from '../../public/assets/search-icon.svg'
import CloseIconSVG from '../../public/assets/close-icon.svg'
import * as Select from '@radix-ui/react-select'
import { useSelection } from './state'
import {
  DrawingPinIcon,
  ArchiveIcon,
  TrashIcon,
  CounterClockwiseClockIcon,
  SectionIcon,
  CaretDownIcon,
} from '@radix-ui/react-icons'

const PopoverTrigger = styled(Popover.Trigger)
const PopoverContent = styled(Popover.Content)
const PopoverArrow = styled(Popover.Arrow)

const FilterIcon = styled(FilterIconSVG)
const SearchIcon = styled(SearchIconSVG)
const CloseIcon = styled(CloseIconSVG)

const IconButton = styled(Button, {
  width: '1.2rem',
  aspectRatio: 1,
  padding: '.14rem',
  borderRadius: 2,
  '&:hover': { background: '#fff1' },
  svg: { width: '100%', height: '100%' },
})

const CloseButton: SFC<{ onClick?: () => void }> = ({ css, onClick }) => {
  return (
    <IconButton css={css} onClick={onClick}>
      <CloseIcon css={{ width: '100%', height: '100%', fill: '#aaa' }} />
    </IconButton>
  )
}

const Filter: SFC<{ onChange: (values: any[]) => void }> = ({ onChange }) => {
  return (
    <Popover.Root>
      <PopoverTrigger asChild>
        <Button
          css={{
            '--icon-color': '#aaa',
            height: '1.68rem',
            aspectRatio: 1,
            padding: '.22rem',
            borderRadius: 4,
            background: '#35434f',
            border: 'var(--bd)',
            '&:hover': {
              background: '#3a4855',
            },
          }}
        >
          <FilterIcon css={{ stroke: 'var(--icon-color)' }} />
        </Button>
      </PopoverTrigger>
      <Popover.Portal>
        <PopoverContent
          align='start'
          sideOffset={4}
          collisionPadding={10}
          arrowPadding={4}
          css={{
            padding: '1rem',
            borderRadius: 4,
            background: '#414447',
            border: '1px solid #595959',
            width: '15rem',
            height: '14rem',
            color: '#bababa',
            fontSize: '.9rem',
            fontWeight: '200',
          }}
        >
          фильтры и сортировка
          <PopoverArrow css={{ fill: '#595959' }} />
          <Popover.Close>
            <CloseButton css={{ position: 'absolute', top: '.3rem', right: '.3rem' }} />
          </Popover.Close>
        </PopoverContent>
      </Popover.Portal>
    </Popover.Root>
  )
}

const Search: SFC<{ onChange: (value: string) => void }> = ({ onChange }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    onChange(value)
  }, [onChange, value])

  return (
    <Div css={{ flex: 1, position: 'relative' }}>
      <Input
        type='text'
        placeholder='поиск...'
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        css={{
          display: 'block',
          width: '100%',
          borderRadius: 4,
          lineHeight: '1.5rem',
          paddingLeft: '2rem',
          background: '#263039',
          color: '$gray700',
          border: 'var(--bd)',
          '&:focus': {
            background: '#1a2127',
          },
        }}
      />
      <SearchIcon
        css={{
          width: '1rem',
          height: '1rem',
          scale: 1.08,
          fill: '#aaa',
          position: 'absolute',
          left: '.5rem',
          top: 0,
          bottom: 0,
          margin: 'auto',
          pointerEvents: 'none',
        }}
      />
      {!isEmpty(value) && (
        <CloseButton
          css={{ position: 'absolute', right: '.25rem', top: 0, bottom: 0, margin: 'auto' }}
          onClick={() => setValue('')}
        />
      )}
    </Div>
  )
}

// todo: documents/folder icon on background
// faded, rotated (like steam HOME button)

const Title = styled(Heading2, {
  fontSize: '1rem',
  fontWeight: '100',
  letterSpacing: '.05em',
  color: '$gray900',
  textTransform: 'uppercase',
})

const ActionButton = styled(Button, {
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

const ActionBar = styled(Div, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '.3rem',
  padding: '0 6px',
  height: 28,
  // fontSize
  fontWeight: '200',
  color: '#ccc',
  lineHeight: 1,
})

const Root = styled(Div, {
  '--bd-clr': '#42515d',
  '--bd': '1px solid var(--bd-clr)',
  // width: 'calc(100% - 15px)',
  background: 'linear-gradient(to bottom, #333d47, #374957)',
  padding: '.8rem calc(.3rem + 6px) .3rem calc(.3rem + 3px)',
  borderBottom: 'var(--bd)',
})

const Head: SFC = () => {
  const selection = useSelection((s) => s.selection)
  const clearSelection = useSelection((s) => s.clear)
  const selectionActionsEnabled = !isEmpty(selection)
  return (
    <Root>
      <Div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title>Картотека</Title>
        <Div css={{ display: 'flex', gap: 12 }}>
          <select>
            <option value='in_work'>в работе</option>
            <option value='on_hold'>отложенные</option>
            <option value='archived'>архив</option>
          </select>
          <ActionButton>+ новый файл</ActionButton>
        </Div>
      </Div>
      {selectionActionsEnabled && (
        <ActionBar css={{ marginTop: '.7rem' }}>
          <Div css={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
            <IconButton css={{ width: '1.4rem', padding: '.15rem' }} onClick={clearSelection}>
              <CloseIcon style={{ fill: '#ccc' }} />
            </IconButton>
            <Div>{selection.length}</Div>
          </Div>
          <Div css={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
            <IconButton css={{ width: '1.4rem', padding: '.18rem' }} title='Закрепить'>
              <DrawingPinIcon style={{ fill: '#ccc' }} />
            </IconButton>
            <IconButton
              css={{
                width: 'auto',
                height: '1.4rem',
                aspectRatio: 'auto',
                padding: '.24rem',
                display: 'flex',
              }}
            >
              <SectionIcon style={{ width: '1.4rem', height: '1.4rem', fill: '#ccc' }} />
              группы
              <CaretDownIcon style={{ width: '1.4rem', height: '1.4rem', fill: '#ccc' }} />
            </IconButton>
            <Span css={{ color: '#536675' }}>|</Span>
            <IconButton css={{ width: '1.4rem', padding: '.24rem' }} title='Отложить'>
              <CounterClockwiseClockIcon style={{ fill: '#ccc' }} />
            </IconButton>
            <IconButton css={{ width: '1.4rem', padding: '.24rem' }} title='Убрать в архив'>
              <ArchiveIcon style={{ fill: '#ccc' }} />
            </IconButton>
            <IconButton css={{ width: '1.4rem', padding: '.18rem' }} title='Удалить'>
              <TrashIcon style={{ fill: '#ccc' }} />
            </IconButton>
          </Div>
        </ActionBar>
      )}
      {!selectionActionsEnabled && (
        <ActionBar css={{ marginTop: '.7rem' }}>
          <Search onChange={noop} />
          <Filter onChange={noop} />
        </ActionBar>
      )}
    </Root>
  )
}

export default Head

// todo(feature):
// - generate filters set one by one like in notion
// - save the set to easily reapply it later if needed
