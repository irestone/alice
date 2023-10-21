import { FC, ReactNode } from 'react'
import { CSS as StichesCSS } from '@stitches/react'
import { stitches } from './stitches'

export { reset as resetDefaultStyles } from './reset'
export { global as applyGlobalStyles } from './global'
export const { config, styled, getCssText, globalCss } = stitches

export type CSS = StichesCSS<typeof config>
export type SFC<T = {}> = FC<{ css?: CSS; children?: ReactNode } & T>
