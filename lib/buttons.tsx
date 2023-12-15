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

const icons: Record<IconName, { default: SFC; active: SFC }> = {
  home: { default: Icon.Home, active: Icon.HomeFilled },
  catalog: { default: Icon.Catalog, active: Icon.CatalogFilled },
  checklist: { default: Icon.Checklist, active: Icon.Checklist },
  subscribe: { default: Icon.Subscribe, active: Icon.SubscribeFilled },
  profile: { default: Icon.Profile, active: Icon.ProfileFilled },
  options: { default: Icon.Options, active: Icon.Options },
  options_h: { default: Icon.OptionsHorizontal, active: Icon.OptionsHorizontal },
  settings: { default: Icon.Settings, active: Icon.Settings },
  checkmark: { default: Icon.Checkmark, active: Icon.Checkmark },
  close: { default: Icon.Close, active: Icon.Close },
  search: { default: Icon.Search, active: Icon.Search },
  filter: { default: Icon.Filter, active: Icon.Filter },
  pin: { default: Icon.Pin, active: Icon.Pin },
  delete: { default: Icon.Delete, active: Icon.Delete },
  expand: { default: Icon.Expand, active: Icon.Expand },
  collapse: { default: Icon.Collapse, active: Icon.Collapse },
  edit: { default: Icon.Edit, active: Icon.Edit },
  status: { default: Icon.Status, active: Icon.Status },
  work: { default: Icon.Work, active: Icon.Work },
  postpone: { default: Icon.Postpone, active: Icon.Postpone },
  archive: { default: Icon.Archive, active: Icon.Archive },
  grouping: { default: Icon.Grouping, active: Icon.Grouping },
  chevron: { default: Icon.Chevron, active: Icon.Chevron },
  history: { default: Icon.History, active: Icon.History },
  link: { default: Icon.Link, active: Icon.Link },
  task: { default: Icon.Task, active: Icon.TaskFilled },
  plus: { default: Icon.Plus, active: Icon.Plus },
  list: { default: Icon.List, active: Icon.List },
  property: { default: Icon.Property, active: Icon.Property },
  filter2: { default: Icon.Filter2, active: Icon.Filter2 },
  back: { default: Icon.Back, active: Icon.Back },
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
  iconStart?: IconName
  iconEnd?: IconName
  chevron?: boolean
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
  const iconStart = props.icon ?? props.iconStart
  const iconEnd = props.iconEnd
  const IconStart = iconStart && icons[iconStart][active ? 'active' : 'default']
  const IconEnd = iconEnd && icons[iconEnd][active ? 'active' : 'default']

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
        {IconStart && <IconStart css={{ s: inS }} />}
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
        svg: { flexShrink: 0 },
        ...colors,
        ...(props.css ?? {}),
      }}
      onClick={props.onClick}
    >
      {IconStart && <IconStart css={{ s: inS }} />}
      {children && (
        <Span css={{ fs: 13, c: 'var(--color)', fw: 300, whiteSpace: 'nowrap', of: 'hidden' }}>
          {children}
        </Span>
      )}
      {IconEnd && <IconEnd css={{ s: inS }} />}
      {props.chevron && <Icon.Chevron css={{ c: '#eaeaea', s: 9, rotate: '180deg' }} />}
    </Root>
  )
}
