import { useRef, useEffect, useMemo } from 'react'
import { isArray, isEmpty, isNull, isString, map, merge } from 'lodash'
import { usePathname, useRouter } from 'next/navigation'
import { CSS, SFC } from '@common/styles'
import { Item, ItemAttr, NamedEntry, RecursivePartial, Task } from '@common/types'
import { Icon } from '@lib/icons'
import { Button } from '@lib/buttons'
import { useStorage } from '@common/storage'
import { Div, H3, P, Span } from './primitives'

export type CardVariant = 'condensed' | 'normal' | 'detailed'

export interface Card {
  href: string
  item: Item
  updItem: (changes: Partial<File> | Partial<Task>) => void
  delItem: () => void
  selection?: boolean
  startSelection?: () => void
  selected?: boolean
  toggleSelected?: () => void
  options: [string, () => void][]
  variant?: CardVariant
  mobile?: boolean
}

const Card: SFC<Card> = (props) => {
  const variant = props.variant ?? 'normal'
  const pathname = usePathname()
  const router = useRouter()
  const showContent = variant !== 'condensed' && !!props.children
  const rootRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (props.selection) props.toggleSelected && props.toggleSelected()
    else router.push(props.href)
  }

  useEffect(() => {
    const { selection, startSelection } = props
    if (selection || !startSelection) return undefined
    const dur = 300
    let root: HTMLElement
    let holdId: any
    let setupId: any
    const set = () => (holdId = setTimeout(startSelection, dur))
    const clear = () => holdId && clearTimeout(holdId)
    const clearListeners = () => {
      root?.removeEventListener('touchstart', set)
      root?.removeEventListener('touchend', clear)
    }
    const addListeners = () => {
      root?.addEventListener('touchstart', set)
      root?.addEventListener('touchend', clear)
      root?.addEventListener('touchcancel', clear)
      root?.addEventListener('touchmove', clear)
    }
    const setup = () => {
      const { current } = rootRef
      if (!current) {
        setupId = setTimeout(setup, 100)
        return
      }
      root = current
      clearListeners()
      addListeners()
    }
    setup()
    return () => {
      if (holdId) clearTimeout(holdId)
      if (setupId) clearTimeout(setupId)
      clearListeners()
    }
  }, [props])

  return (
    <Div
      ref={rootRef}
      css={{
        d: 'grid',
        gta: '"content controls"',
        gtc: '1fr auto',
        p: 4,
        g: 4,
        rad: 8,
        bg: '$gray200',
        pos: 'relative',
        userSelect: 'none',
        of: 'hidden',
        ...(props.css ?? {}),
      }}
      onClick={handleClick}
    >
      <Div css={{ gridArea: 'content', pl: 6, isolation: 'isolate' }}>
        <H3 css={{ fs: 16, fw: 500, lh: 20 / 16, py: 6, px: 4, mh: 32 }}>{props.item.name}</H3>
        {showContent && <Div css={{ px: 4, pt: 4, pb: 8 }}>{props.children}</Div>}
      </Div>
      <Div css={{ gridArea: 'controls', isolation: 'isolate' }}>
        {props.selection ? (
          <Button
            icon='checkmark'
            colors={{
              idle: { color: '#303030' },
              active: { background: 'cyan', color: '#131313' },
              preset: 'no_bg',
            }}
            active={props.selected}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <Button icon='options' colors='no_bg' onClick={(e) => e.stopPropagation()} />
        )}
      </Div>
      {!props.mobile && pathname?.startsWith(props.href) && (
        <Div css={{ bg: '$accent500', h: '100%', w: 3, pos: 'absolute', y: 0, l: 0 }} />
      )}
    </Div>
  )
}

const fileCardAttrs = [
  'files:general.birthday',
  'files:general.address',
  'files:general.inn',
  'files:general.snils',
  'files:general.regions',
  'files:general.notion',
  'files:enforcements->enforcements:proceeding.region',
]

export const FileCard: SFC<Omit<Card, 'href' | 'options'>> = (props) => {
  const get = useStorage((s) => s.get)
  const getValue = useStorage((s) => s.getValue)

  const rows = useMemo(() => {
    return fileCardAttrs
      .map((id) => {
        const attr = get<ItemAttr>('fileAttrs', id)
        const results = getValue(props.item, attr)
        const initial = isArray(results) ? map(results, 'value') : [results.value]
        const filtered = initial.filter((v) => !isNull(v) && !isEmpty(v))
        if (isEmpty(filtered)) return null
        const name = attr.fullname ?? attr.name
        const selectable = ['select', 'multi_select'].includes(attr.type) && !!attr.options
        const final = selectable
          ? filtered.map((v) => get<NamedEntry[]>(attr.options as any, v))
          : filtered
        const value = final
          .map((v) => (!selectable ? v : !isArray(v) ? v.name : map(v, 'name')))
          .flat()
          .join(', ')
        return (
          <Div key={id}>
            <Span css={{ fs: 13, fw: 600 }}>{name}:</Span>
            <Span css={{ fs: 13, pl: 4, c: '#c9d1db', fontStyle: 'italic' }}>{value}</Span>
          </Div>
        )
      })
      .filter((v) => !!v)
  }, [get, getValue, props.item])

  return (
    <Card
      href={`/files/${props.item.id}`}
      options={[]}
      {...props}
      css={{
        bg: 'linear-gradient(45deg, rgb(111 175 253), rgb(37 33 25))',
        // bg: 'linear-gradient(45deg, rgb(67 173 247), rgb(39, 39, 39))',
        // bg: 'linear-gradient(45deg, rgb(43 153 231), rgb(39, 39, 39))',
        // bg: 'linear-gradient(45deg, rgb(25, 173, 173), rgb(39 39 39))',
        filter: 'drop-shadow(-1px 0 4px rgb(67 173 247 / 0.07))',
        '&::before': {
          content: '""',
          d: 'block',
          pos: 'absolute',
          in: 0,
          bg: 'no-repeat center -14px / 400px auto url(/textures/Texturelabs_Paper_338S.jpg)',
          // mixBlendMode: 'screen',
          mixBlendMode: 'hard-light',
          filter: 'opacity(0.5)',
          pointerEvents: 'none',
          userSelect: 'none',
        },
      }}
    >
      {!isEmpty(rows) && <Div css={{ d: 'flex', fd: 'column', g: 2 }}>{rows}</Div>}
    </Card>
  )
}

export const TaskCard: SFC<Omit<Card, 'href' | 'options'>> = (props) => {
  const get = useStorage((s) => s.get)
  const getValue = useStorage((s) => s.getValue)

  const descAttr = get<ItemAttr>('taskAttrs', 'tasks:description')
  const descRes = getValue(props.item, descAttr)
  return (
    <Card
      href={`/tasks/${props.item.id}`}
      options={[]}
      {...props}
      css={{
        bg: 'linear-gradient(45deg, rgb(249 204 42), rgb(39, 39, 39))',
        filter: 'drop-shadow(-1px 0 4px rgb(249 204 42 / 0.07))',
        '&::before': {
          content: '""',
          d: 'block',
          pos: 'absolute',
          in: 0,
          bg: 'no-repeat center -14px / 400px auto url(/textures/Texturelabs_Paper_338S.jpg)',
          mixBlendMode: 'hard-light',
          filter: 'opacity(0.5)',
          pointerEvents: 'none',
          userSelect: 'none',
        },
      }}
    >
      {!!descRes.value && (
        <Div
          css={{
            fs: 13,
            fontStyle: 'italic',
            c: 'rgb(223 217 191)',
            textIndent: 12,
            pos: 'relative',
          }}
        >
          <Icon.Quote
            css={{
              s: 20,
              pos: 'absolute',
              l: 4,
              t: -5,
              '--color': 'rgb(223 217 191)',
              // '--color': 'rgb(249 204 42)',
              filter: 'drop-shadow(0 0 8px rgb(249 204 42 / 0.9))',
              rotate: '180deg',
              z: 0,
            }}
          />
          <P css={{ pos: 'relative', px: 16 }}>{descRes.value}</P>
        </Div>
      )}
    </Card>
  )
}
