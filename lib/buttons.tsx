import { MouseEventHandler } from 'react'
import { isString, merge } from 'lodash'
import { CSS, SFC } from '@common/styles'
import { RecursivePartial } from '@common/types'
import { Icon } from '@lib/icons'
import Primitive, { RouteLink, Span } from './primitives'

type IconName =
  | 'home'
  | 'catalog'
  | 'checklist'
  | 'subscribe'
  | 'profile'
  | 'options'
  | 'options_h'
  | 'settings'
  | 'checkmark'
  | 'close'
  | 'search'
  | 'filter'
  | 'pin'
  | 'delete'
  | 'edit'
  | 'expand'
  | 'collapse'
  | 'chevron'
  | 'history'
  | 'link'
  | 'status'
  | 'work'
  | 'postpone'
  | 'archive'
  | 'grouping'
  | 'task'

const icons: Record<IconName, { default: SFC; filled: SFC }> = {
  home: { default: Icon.Home, filled: Icon.HomeFilled },
  catalog: { default: Icon.Catalog, filled: Icon.CatalogFilled },
  checklist: { default: Icon.Checklist, filled: Icon.ChecklistFilled },
  subscribe: { default: Icon.Subscribe, filled: Icon.SubscribeFilled },
  profile: { default: Icon.Profile, filled: Icon.ProfileFilled },
  options: { default: Icon.Options, filled: Icon.Options },
  options_h: { default: Icon.OptionsHorizontal, filled: Icon.OptionsHorizontal },
  settings: { default: Icon.Settings, filled: Icon.Settings },
  checkmark: { default: Icon.Checkmark, filled: Icon.Checkmark },
  close: { default: Icon.Close, filled: Icon.Close },
  search: { default: Icon.Search, filled: Icon.Search },
  filter: { default: Icon.Filter, filled: Icon.Filter },
  pin: { default: Icon.Pin, filled: Icon.Pin },
  delete: { default: Icon.Delete, filled: Icon.Delete },
  expand: { default: Icon.Expand, filled: Icon.Expand },
  collapse: { default: Icon.Collapse, filled: Icon.Collapse },
  edit: { default: Icon.Edit, filled: Icon.Edit },
  status: { default: Icon.Status, filled: Icon.Status },
  work: { default: Icon.Work, filled: Icon.Work },
  postpone: { default: Icon.Postpone, filled: Icon.Postpone },
  archive: { default: Icon.Archive, filled: Icon.Archive },
  grouping: { default: Icon.Grouping, filled: Icon.Grouping },
  chevron: { default: Icon.Chevron, filled: Icon.Chevron },
  history: { default: Icon.History, filled: Icon.History },
  link: { default: Icon.Link, filled: Icon.Link },
  task: { default: Icon.Task, filled: Icon.TaskFilled },
}

type ButtonState = 'idle' | 'hovered' | 'focused' | 'active'
type ColorSet = { color: string; background: string }
type ColorPreset = Record<ButtonState, ColorSet>
type ColorPresetName = 'default' | 'no_bg' | 'active_bg' | 'dimmed'

const colorPresets: Record<ColorPresetName, ColorPreset> = {
  default: {
    idle: { color: '#eaeaea', background: '#191919' },
    hovered: { color: '#eaeaea', background: '#232323' },
    focused: { color: '#eaeaea', background: '#232323' },
    active: { color: '#232323', background: '#eaeaea' },
  },
  no_bg: {
    idle: { color: '#eaeaea', background: 'none' },
    hovered: { color: '#eaeaea', background: 'none' },
    focused: { color: '#eaeaea', background: 'none' },
    active: { color: '#eaeaea', background: 'none' },
  },
  active_bg: {
    idle: { color: '#eaeaea', background: 'none' },
    hovered: { color: '#eaeaea', background: 'none' },
    focused: { color: '#eaeaea', background: 'none' },
    active: { color: '#232323', background: '#eaeaea' },
  },
  dimmed: {
    idle: { color: '#555', background: 'none' },
    hovered: { color: '#555', background: 'none' },
    focused: { color: '#555', background: 'none' },
    active: { color: '#232323', background: '#eaeaea' },
  },
}

const produceColorPreset = (
  // colors?: any,
  colors?:
    | ColorPresetName
    | (Partial<ColorSet> & RecursivePartial<ColorPreset> & { preset?: ColorPresetName }),
  active = false
) => {
  let cp: ColorPreset
  if (!colors) {
    cp = colorPresets.default
  } else if (isString(colors)) {
    cp = colorPresets[colors]
  } else {
    const customSet = { color: colors.color, background: colors.background }
    const customPreset = {
      idle: merge({}, customSet, colors.idle),
      hovered: merge({}, customSet, colors.hovered),
      focused: merge({}, customSet, colors.focused),
      active: merge({}, customSet, colors.active),
    }
    const basePreset = colorPresets[colors.preset ?? 'default']
    cp = merge({}, basePreset, customPreset)
  }
  if (active) console.log('active', cp)
  const r = {
    '--color': active ? cp.active.color : cp.idle.color,
    background: active ? cp.active.background : cp.idle.background,
    '&:hover': {
      '--color': active ? cp.active.color : cp.hovered.color,
      background: active ? cp.active.background : cp.hovered.background,
    },
    '&:focus': {
      '--color': active ? cp.active.color : cp.focused.color,
      background: active ? cp.active.background : cp.focused.background,
    },
  }
  if (active) console.log('active', cp, r)
  return r
}

export const Button: SFC<{
  icon?: IconName
  size?: number
  corners?: number | 'round' | 'smooth'
  colors?:
    | ColorPresetName
    | (Partial<ColorSet> & RecursivePartial<ColorPreset> & { preset?: ColorPresetName })
  active?: boolean
  caption?: boolean
  href?: string
  onClick?: MouseEventHandler
  css?: CSS
}> = (props) => {
  const { size = 0, corners = 0, active, children } = props
  const outS = 32 + 8 * size
  const inS = 16 + 4 * size
  const colors = produceColorPreset(props.colors, active)
  const Root = props.href ? RouteLink : Primitive.Button
  const Icon = props.icon && (active ? icons[props.icon].filled : icons[props.icon].default)

  if (props.caption && props.icon && props.children) {
    return (
      // @ts-expect-error
      <Root
        href={props.href}
        css={{
          h: outS,
          w: children ? 'auto' : outS,
          // px: children ? 0.5 * (outS - inS) : 0,
          d: 'flex',
          jc: 'center',
          ai: 'center',
          rad: !corners || corners === 'round' ? 999 : corners === 'smooth' ? 8 : corners,
          flexShrink: 0,
          ...colors,
          fd: 'column',
          g: 6,
          // bg: '#232323',
          px: 0.25 * (outS - inS),
          ...(props.css ?? {}),
        }}
        onClick={props.onClick}
      >
        {Icon && <Icon css={{ s: inS }} />}
        {children && (
          <Span
            css={{
              // fs: 1.1 * inS,
              lh: 1 / 1.1,
              c: 'var(--color)',
              // ml: Icon ? 0.5 * (outS - inS) - 0.1 * inS : 0,
              // fw: 300,
              fs: 0.52 * inS,
              whiteSpace: 'nowrap',
            }}
          >
            {children}
          </Span>
        )}
      </Root>
    )
  }

  return (
    // @ts-expect-error
    <Root
      href={props.href}
      css={{
        h: outS,
        w: children ? 'auto' : outS,
        px: children ? 0.5 * (outS - inS) : 0,
        d: 'flex',
        jc: 'center',
        ai: 'center',
        rad: !corners || corners === 'round' ? 999 : corners === 'smooth' ? 8 : corners,
        flexShrink: 0,
        ...colors,
        ...(props.css ?? {}),
      }}
      onClick={props.onClick}
    >
      {Icon && <Icon css={{ s: inS }} />}
      {children && (
        <Span
          css={{
            // fs: 1.1 * inS,
            // lh: 1 / 1.1,
            fs: 13,
            c: 'var(--color)',
            ml: Icon ? 0.5 * (outS - inS) - 0.1 * inS : 0,
            fw: 300,
          }}
        >
          {children}
        </Span>
      )}
    </Root>
  )
}
