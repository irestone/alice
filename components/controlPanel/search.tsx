import { isEmpty } from 'lodash'

import { SFC, styled } from '../../_styles'
import { Button, Div, Input } from '../_primitives'
import { CloseIcon, SearchIcon } from '../_icons'

// todo: implement
export const search = (items: any[], str: string) => ({ result: items })

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

export const Search: SFC<{ value: string; onChange: (value: string) => void }> = ({
  value,
  onChange,
}) => {
  return (
    <Div css={{ flex: 1, position: 'relative' }}>
      <Input
        type='text'
        placeholder='поиск...'
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
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
          onClick={() => onChange('')}
        />
      )}
    </Div>
  )
}
