import { MouseEventHandler, useEffect, useRef } from 'react'
import { isString, merge } from 'lodash'
import { CSS, SFC } from '@common/styles'
import { RecursivePartial } from '@common/types'
import { Icon } from '@lib/icons'
import Primitive, { RouteLink, Span } from './primitives'
import { holdListener } from '@common/utils'

export type IconName =
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
  | 'plus'
  | 'list'
  | 'property'
  | 'filter2'
  | 'back'

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
  plus: { default: Icon.Plus, filled: Icon.Plus },
  list: { default: Icon.List, filled: Icon.List },
  property: { default: Icon.Property, filled: Icon.Property },
  filter2: { default: Icon.Filter2, filled: Icon.Filter2 },
  back: { default: Icon.Back, filled: Icon.Back },
}

type ButtonState = 'idle' | 'hovered' | 'focused' | 'active'
type ColorSet = { color: string; background: string }
type ColorPreset = Record<ButtonState, ColorSet>
type ColorPresetName =
  | 'default'
  | 'no_bg'
  | 'active_bg'
  | 'dimmed'
  | 'default_inversed'
  | 'no_bg_inversed'

const colorPresets: Record<ColorPresetName, ColorPreset> = {
  default: {
    idle: { color: '#eaeaea', background: '#191919' },
    hovered: { color: '#eaeaea', background: '#232323' },
    focused: { color: '#eaeaea', background: '#232323' },
    active: { color: '#232323', background: '#eaeaea' },
  },
  default_inversed: {
    idle: { color: '#232323', background: '#eaeaea' },
    hovered: { color: '#232323', background: '#c9c9c9' },
    focused: { color: '#232323', background: '#c9c9c9' },
    active: { color: '#eaeaea', background: '#191919' },
  },
  no_bg: {
    idle: { color: '#eaeaea', background: 'none' },
    hovered: { color: '#eaeaea', background: 'none' },
    focused: { color: '#eaeaea', background: 'none' },
    active: { color: '#eaeaea', background: 'none' },
  },
  no_bg_inversed: {
    idle: { color: '#232323', background: 'none' },
    hovered: { color: '#232323', background: 'none' },
    focused: { color: '#232323', background: 'none' },
    active: { color: '#232323', background: 'none' },
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
  return active
    ? {
        c: cp.active.color,
        bg: cp.active.background,
        '&:hover': { c: cp.active.color, bg: cp.active.background },
        '&:focus': { c: cp.active.color, bg: cp.active.background },
      }
    : {
        c: cp.idle.color,
        bg: cp.idle.background,
        '&:hover': { c: cp.hovered.color, bg: cp.hovered.background },
        '&:focus': { c: cp.focused.color, bg: cp.focused.background },
      }
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
  onHold?: () => void
  css?: CSS
}> = (props) => {
  const { size = 0, corners = 0, active, children } = props
  const outS = 32 + 8 * size
  const inS = 16 + 4 * size
  const d = outS - inS
  const colors = produceColorPreset(props.colors, active)
  const Root = props.href ? RouteLink : Primitive.Button
  const Icon = props.icon && (active ? icons[props.icon].filled : icons[props.icon].default)

  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (props.onHold) return holdListener(rootRef, props.onHold, 150)
  }, [props.onHold])

  const captionedIcons = props.caption && props.icon && props.children
  if (captionedIcons) {
    return (
      // @ts-expect-error
      <Root
        ref={rootRef}
        href={props.href}
        css={{
          h: outS,
          w: children ? 'auto' : outS,
          d: 'flex',
          jc: 'center',
          ai: 'center',
          rad: !corners || corners === 'round' ? 999 : corners === 'smooth' ? 8 : corners,
          flexShrink: 0,
          ...colors,
          fd: 'column',
          g: 6,
          px: 0.25 * d,
          ...(props.css ?? {}),
        }}
        onClick={props.onClick}
      >
        {Icon && <Icon css={{ s: inS }} />}
        {children && (
          <Span
            css={{
              lh: 1 / 1.1,
              c: 'var(--color)',
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
      ref={rootRef}
      href={props.href}
      css={{
        d: 'flex',
        jc: 'center',
        ai: 'center',
        h: outS,
        w: children ? 'auto' : outS,
        pl: Icon && !children ? 0 : Icon ? 0.5 * d : children ? 0.75 * d : 0,
        pr: children ? 0.75 * d : 0,
        g: 0.5 * d - 0.1 * inS,
        rad: !corners || corners === 'round' ? 999 : corners === 'smooth' ? 8 : corners,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        ...colors,
        ...(props.css ?? {}),
      }}
      onClick={props.onClick}
    >
      {Icon && <Icon css={{ s: inS }} />}
      {children && (
        <Span
          css={{
            fs: 13,
            c: 'var(--color)',
            fw: 300,
            whiteSpace: 'nowrap',
            d: 'flex',
            ai: 'center',
            g: 4,
          }}
        >
          {children}
        </Span>
      )}
    </Root>
  )
}
