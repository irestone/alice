import { createStitches, PropertyValue, CSS as StichesCSS } from '@stitches/react'

// section #########################################################################################
//  THEME
// #################################################################################################

// Brand: primary, secondary, tertiary, neutral
// System: info, warning, success, failure
// Contextual: bg, header_bg, header_txt...

const colors = {
  gray100: '#181818',
  gray200: '#232323',
  gray300: '#313131',
  gray400: '#3f3f3f',
  gray600: '#999',
  gray700: '#ccc',
  gray900: '#f7f7f7',
  accent: '#0078D4',
}

const fonts = {
  system: 'system-ui',
  untitled: 'Untitled Sans, apple-system, sans-serif',
  mono: 'Söhne Mono, menlo, monospace',
}

const space = {
  1: '5px',
  2: '10px',
  3: '15px',
}
const fontSizes = {
  1: '12px',
  2: '13px',
  3: '15px',
}

const fontWeights = {}
const lineHeights = {}
const letterSpacings = {}
const sizes = {}
const borderWidths = {}
const borderStyles = {}
const radii = {}
const shadows = {}
const zIndices = {}
const transitions = {}

// section #########################################################################################
//  MEDIA
// #################################################################################################

// https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution
// https://developer.mozilla.org/en-US/docs/Web/CSS/@media/aspect-ratio
// https://developer.mozilla.org/en-US/docs/Web/CSS/@media/orientation
// todo: use it to determine how big things are

const BREAK_POINTS_STEP = 100
const BREAK_POINTS_NUMBER = 25
const BREAK_POINTS_PRESET = [380, 760, 970, 1300, 1600]
// xs: mobile, s: tablet (portrait), m: tablet (landscape), l: laptop, xl: desktop

// todo: include ranged breakpoints
// https://github.com/stitchesjs/stitches/issues/885#issuecomment-985222085
const buildBreakPoints = (step: number, number: number) => {
  const breakpoints = Array.from(new Array(number + 1)).map((_: any, i) => i * step)
  const queries = breakpoints
    .map((min, i) => {
      const bpAndUp = [`bp${i}`, `(min-width: ${min}px)`]
      const ranges = breakpoints.slice(i + 1).map((max, j) => {
        return [`bp${i}-${i + 1 + j}`, `(${min}px <= width < ${max}px)`]
      })
      return [bpAndUp, ...ranges]
    })
    .flat()
  return Object.fromEntries(queries)
}

const buildBreakPointsPreset = ([xs, s, m, l, xl]: number[]) => {
  return {
    xs: `(min-width: ${xs}px)`,
    s: `(min-width: ${s}px)`,
    m: `(min-width: ${m}px)`,
    l: `(min-width: ${l}px)`,
    xl: `(min-width: ${xl}px)`,
  }
}

const media = {
  ...buildBreakPoints(BREAK_POINTS_STEP, BREAK_POINTS_NUMBER),
  ...buildBreakPointsPreset(BREAK_POINTS_PRESET),
}

// section #########################################################################################
//  UTILS
// #################################################################################################

const utils = {
  m: (value: PropertyValue<'margin'>) => ({ margin: value }),
  mt: (value: PropertyValue<'marginTop'>) => ({ marginTop: value }),
  mr: (value: PropertyValue<'marginRight'>) => ({ marginRight: value }),
  mb: (value: PropertyValue<'marginBottom'>) => ({ marginBottom: value }),
  ml: (value: PropertyValue<'marginLeft'>) => ({ marginLeft: value }),
  mx: (value: PropertyValue<'marginLeft'>) => ({ marginLeft: value, marginRight: value }),
  my: (value: PropertyValue<'marginTop'>) => ({ marginTop: value, marginBottom: value }),

  p: (value: PropertyValue<'padding'>) => ({ padding: value }),
  pt: (value: PropertyValue<'paddingTop'>) => ({ paddingTop: value }),
  pr: (value: PropertyValue<'paddingRight'>) => ({ paddingRight: value }),
  pb: (value: PropertyValue<'paddingBottom'>) => ({ paddingBottom: value }),
  pl: (value: PropertyValue<'paddingLeft'>) => ({ paddingLeft: value }),
  px: (value: PropertyValue<'paddingLeft'>) => ({ paddingLeft: value, paddingRight: value }),
  py: (value: PropertyValue<'paddingTop'>) => ({ paddingTop: value, paddingBottom: value }),

  size: (value: PropertyValue<'width'>) => ({ width: value, height: value }),
  linearGradient: (value: string) => ({ backgroundImage: `linear-gradient(${value})` }),
  br: (value: PropertyValue<'borderRadius'>) => ({ borderRadius: value }),

  areas: (areas: string[]) => ({ gridTemplateAreas: areas.join(' ') }),

  scrollbarSize: (value: PropertyValue<'width'>) => ({
    '&::-webkit-scrollbar': { width: value, height: value },
  }),
  scrollbarColor: (value: PropertyValue<'color'>) => ({
    scrollbarColor: value,
  }),
  scrollbarTrackColor: (value: PropertyValue<'color'>) => ({
    '&::-webkit-scrollbar-track': { background: value },
  }),
  scrollbarThumbColor: (value: PropertyValue<'color'>) => ({
    '&::-webkit-scrollbar-thumb': { background: value },
  }),
  scrollbarThumbColorHovered: (value: PropertyValue<'color'>) => ({
    '&::-webkit-scrollbar-thumb:hover': { background: value },
  }),
}

// section #########################################################################################
//  CONFIG
// #################################################################################################

export const { theme, styled, getCssText, createTheme, config, globalCss } = createStitches({
  theme: {
    fonts,
    colors,
    space,
    fontSizes,
    fontWeights,
    lineHeights,
    letterSpacings,
    sizes,
    borderWidths,
    borderStyles,
    radii,
    shadows,
    zIndices,
    transitions,
  },
  media,
  utils,
})

export type CSS = StichesCSS<typeof config>
