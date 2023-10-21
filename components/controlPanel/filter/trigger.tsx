import { SFC } from '../../../_styles'
import { RadixPopoverTrigger } from '../../_primitives'
import { FilterIcon } from '../../_icons'

const Trigger: SFC<{ highlight?: boolean }> = ({ highlight }) => {
  return (
    <RadixPopoverTrigger
      css={{
        '--icon-color': highlight ? 'cyan' : '#aaa',
        height: '1.68rem',
        aspectRatio: 1,
        padding: '.22rem',
        borderRadius: 4,
        background: '#35434f',
        border: highlight ? '1px solid cyan' : 'var(--bd)',
        '&:hover': {
          background: '#3a4855',
        },
      }}
    >
      <FilterIcon css={{ stroke: 'var(--icon-color)' }} />
    </RadixPopoverTrigger>
  )
}

export default Trigger
