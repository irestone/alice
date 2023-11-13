import { FC, ReactNode } from 'react'
import { CSS as StichesCSS } from '@stitches/react'
import { stitches } from './styles/stitches'
import { isFunction } from 'lodash'

export { reset as resetDefaultStyles } from './styles/reset'
export { global as applyGlobalStyles } from './styles/global'
export const { getCssText, styled } = stitches
export type CSS = StichesCSS<typeof stitches.config>
export type SFC<T = {}> = FC<T & { css?: CSS; children?: ReactNode }>

export const mixin = (predicate: (() => boolean) | boolean, mix: CSS, otherwise: CSS = {}) => {
  const ok = isFunction(predicate) ? predicate() : predicate
  return ok ? mix : otherwise
}

export const Breakpoint = { handheld: 0, mobile: 430, small: 1000, normal: 1400 }
