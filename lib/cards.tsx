import { useRef, useEffect, useMemo, useState, useCallback } from 'react'
import lodash, { find, flow, isArray, isEmpty, isNull, map, reject, without } from 'lodash'
import { usePathname, useRouter } from 'next/navigation'
import { SFC, mixin, styled } from '@common/styles'
import { Item, ItemAttr, Task, Group as TGroup, Category, CollectionName } from '@common/types'
import { Icon } from '@lib/icons'
import { Button } from '@lib/buttons'
import { useStorage } from '@common/storage'
import { Div, H3, Span } from './primitives'
import { holdListener, toDate, toRUB } from '@common/utils'
import { useSettings } from '@common/settings'
import * as fonts from '@common/styles/fonts'
import { Section } from './sections'

// section #########################################################################################
//  CARD
// #################################################################################################

export type CardVariant = 'condensed' | 'normal' | 'detailed'

export interface Card {
  href: string
  item: Item
  updateItem: (changes: Partial<File> | Partial<Task>) => void
  deleteItem: () => void
  selection?: boolean
  startSelection?: () => void
  selected?: boolean
  toggleSelected?: () => void
  options: [string, () => void][]
  content?: string[]
  variant?: CardVariant
  mobile?: boolean
  gradient?: string
  shadow?: string
  onClick?: () => void
}

const Card: SFC<Card> = (props) => {
  const variant = props.variant ?? 'normal'
  const pathname = usePathname()
  const router = useRouter()
  const showContent = variant !== 'condensed' && !!props.children
  const rootRef = useRef<HTMLDivElement>(null)
  const handleClick = () => {
    if (props.selection) {
      props.toggleSelected?.()
    } else {
      router.push(props.href)
      props.onClick?.()
    }
  }
  useEffect(() => {
    const { selection, startSelection } = props
    if (!selection && startSelection) return holdListener(rootRef, startSelection)
  }, [props])
  return (
    <Div
      ref={rootRef}
      css={{
        d: 'grid',
        gta: '"content controls"',
        gtc: '1fr auto',
        rad: 4,
        pos: 'relative',
        us: 'none',
        of: 'hidden',
        bg: props.gradient,
        bsh: props.shadow,
        flexShrink: 0,
        '&::before': {
          content: '""',
          d: 'block',
          pos: 'absolute',
          in: 0,
          bg: 'center top / 250px url(https://www.toptal.com/designers/subtlepatterns/uploads/halftone.png)',
          // bg: 'center top / 80px url(https://www.toptal.com/designers/subtlepatterns/uploads/squared_metal.png)',
          // bg: `center top / 430px url(https://www.toptal.com/designers/subtlepatterns/uploads/tex2res2.png)`,
          mode: 'color-burn',
          op: 0.5,
          pe: 'none',
        },
      }}
      onClick={handleClick}
    >
      <Div css={{ gridArea: 'content', isolation: 'isolate' }}>
        <H3
          css={{
            ff: fonts.heading.style.fontFamily,
            fs: 15,
            fw: 700,
            lh: 1.15,
            tsh: '0 0 2px rgba(0 0 0 / 0.5)',
            px: 16,
            py: 12,
            mh: 32,
            op: 0.8,
          }}
        >
          {props.item.name}
        </H3>
        {showContent && <Div css={{ p: 16, pt: 0 }}>{props.children}</Div>}
      </Div>
      <Div css={{ gridArea: 'controls', isolation: 'isolate', pt: 4, pr: 4 }}>
        {props.selection ? (
          <Button
            icon='checkmark'
            colors={{
              idle: { color: '#fff5' },
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

const Content = styled('div', { d: 'grid', g: 2 })

const Property: SFC<{ Icon: SFC; name: string }> = ({ Icon, name, children, css }) => {
  return (
    <Div
      css={{
        '--fs': '15px',
        '--lh': 1.15,
        ff: fonts.text.style.fontFamily,
        fs: 'var(--fs)',
        lh: 'var(--lh)',
        c: '#ffffffaa',
        d: 'flex',
        ...css,
      }}
    >
      <Div
        css={{
          '--h': 'calc(var(--fs) * var(--lh))',
          w: 24,
          h: 'var(--h)',
          d: 'grid',
          pc: 'center',
          flexShrink: 0,
        }}
      >
        <Icon
          css={{
            s: 'var(--h)',
            c: 'cyan',
            mt: 2,
            filter: 'drop-shadow(0 0 2px rgba(0 0 0 / 0.4))',
          }}
        />
      </Div>
      <Div>
        <Span
          css={{
            ff: fonts.property.style.fontFamily,
            fs: 12,
            fw: 600,
            tt: 'uppercase',
            c: 'cyan',
            tsh: '0 0 2px rgba(0 0 0 / 0.5)',
            mr: 4,
          }}
        >
          {`${name}:`}
        </Span>
        {children}
      </Div>
    </Div>
  )
}

const useCardContent = (item: Item, keys: string[], attrs: ItemAttr[]) => {
  const get = useStorage((s) => s.get)
  const getValue = useStorage((s) => s.getValue)

  const getRawValue = flow([
    (attr) => getValue(item, attr),
    (results) => (isArray(results) ? map(results, 'value') : [results.value]),
    (values) => reject(values, (v) => isNull(v) || (isArray(v) && isEmpty(v))),
  ])

  const getFormatter = useCallback(
    (attr: ItemAttr) => {
      return (value: any) => {
        let result = [value]
        if (attr.type === 'select' || attr.type === 'multi_select') {
          const opt = get<any>(attr.options as any, value)
          result = isArray(opt) ? map(opt, 'name') : [opt.name]
        } else if (attr.type === 'number' && attr.currency) {
          result = result.map(toRUB)
        } else if (attr.type === 'boolean') {
          result = result.map((value) => (value ? 'да' : 'нет'))
        } else if (attr.type === 'date') {
          result = result.map(toDate)
        }
        return result
      }
    },
    [get]
  )

  const content = useMemo(() => {
    return keys
      .map((id) => {
        const attr = find(attrs, { id })
        if (!attr) throw new Error(`Attribute ${id} not found`)
        const name = attr.fullname ?? attr.name
        const rawValue = getRawValue(attr)
        const value = lodash
          .chain(rawValue)
          .map(getFormatter(attr))
          .flatten()
          .uniq()
          .join(', ')
          .value()
        return { attr, name, value, rawValue }
      })
      .filter(({ value }) => !!value)
  }, [keys, attrs, getRawValue, getFormatter])

  return content
}

// part ==========================================
//  FILE
// ===============================================

export const FileCard: SFC<Omit<Card, 'href' | 'options' | 'gradient' | 'shadow'>> = (props) => {
  const settings = useSettings('files')
  const keys = without(props.content ?? settings.content, 'files:general.fullname')
  const attrs = useStorage((s) => (s.collections as any).fileAttrs) as ItemAttr[]
  const content = useCardContent(props.item, keys, attrs)
  return (
    <Card
      href={`/files/${props.item.id}`}
      options={[]}
      gradient='radial-gradient(circle at left bottom, rgb(127 129 133), rgb(45 50 57))'
      shadow='-2px 2px 12px rgb(167 162 133 / 0.1)'
      {...props}
    >
      {!isEmpty(content) && (
        <Content>
          {content.map(({ attr, name, value }) => (
            <Property key={attr.id} Icon={Icon.Property} name={name}>
              {value}
            </Property>
          ))}
        </Content>
      )}
    </Card>
  )
}

// part ==========================================
//  TASK
// ===============================================

const taskCardAssets: any = {
  'tasks:description': { Icon: Icon.QuoteStart },
  'tasks:priority': { Icon: Icon.Priority },
  'tasks:files': { Icon: Icon.Files },
}

export const TaskCard: SFC<Omit<Card, 'href' | 'options' | 'gradient' | 'shadow'>> = (props) => {
  const settings = useSettings('tasks')
  const keys = without(props.content ?? settings.content, 'tasks:name')
  const attrs = useStorage((s) => (s.collections as any).taskAttrs) as ItemAttr[]
  const content = useCardContent(props.item, keys, attrs)
  return (
    <Card
      href={`/tasks/${props.item.id}`}
      options={[]}
      gradient='radial-gradient(circle at left bottom, rgb(131 123 105), rgb(55 52 45))'
      shadow='-2px 2px 12px rgb(249 204 42 / 0.1)'
      {...props}
    >
      {!isEmpty(content) && (
        <Content>
          {content.map(({ attr, name, value, rawValue }) => {
            const { Icon } = taskCardAssets[attr.id]
            const isPriority = attr.id === 'tasks:priority'
            return (
              <Property
                key={attr.id}
                Icon={Icon ?? Icon.Property}
                name={name}
                css={{
                  ...mixin(isPriority && rawValue[0] === 'high', { c: '#cf9e69' }),
                  ...mixin(isPriority && rawValue[0] === 'highest', { c: '#ff9320' }),
                }}
              >
                {value}
              </Property>
            )
          })}
        </Content>
      )}
    </Card>
  )
}

// section #########################################################################################
//  GROUP
// #################################################################################################

export const Group: SFC<{
  group: TGroup
  updateGroup: (changes: Partial<TGroup>) => void
  deleteGroup: () => void
  expanded: boolean
  toggleExpanded: () => void
}> = ({ group, children }) => {
  const [editing, setEditing] = useState(false)
  return (
    <Section
      title={group.name}
      actions={
        editing
          ? [
              <Button
                key='delete'
                icon='delete'
                colors={{ color: 'indianred', preset: 'no_bg' }}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              />,
              <Button
                key='save'
                icon='checkmark'
                colors={{ color: 'cyan', preset: 'no_bg' }}
                onClick={(e) => {
                  e.stopPropagation()
                  setEditing(false)
                }}
              />,
            ]
          : [
              <Button
                key='edit'
                icon='edit'
                colors={{ preset: 'no_bg', color: 'cyan' }}
                onClick={(e) => {
                  e.stopPropagation()
                  setEditing(true)
                }}
              />,
            ]
      }
      stickHeadAt={101}
      collapsible
      counter
    >
      {children}
    </Section>
  )
}
