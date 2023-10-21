import { createStitches, PropertyValue as PV } from '@stitches/react'

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

const theme = {
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
}

// section #########################################################################################
//  MEDIA
// #################################################################################################

const BREAK_POINTS_STEP = 100
const BREAK_POINTS_NUMBER = 25
const BREAK_POINTS_PRESET = [380, 760, 970, 1300, 1600]
// xs: mobile, s: tablet (portrait), m: tablet (landscape), l: laptop, xl: desktop

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

// ranged breakpoints: https://github.com/stitchesjs/stitches/issues/885#issuecomment-985222085

// todo: use it to determine how big things are
// https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution
// https://developer.mozilla.org/en-US/docs/Web/CSS/@media/aspect-ratio
// https://developer.mozilla.org/en-US/docs/Web/CSS/@media/orientation

// section #########################################################################################
//  UTILS
// #################################################################################################

// margin aliases
const m = (v: PV<'margin'>) => ({ margin: v })
const mt = (v: PV<'marginTop'>) => ({ marginTop: v })
const mr = (v: PV<'marginRight'>) => ({ marginRight: v })
const mb = (v: PV<'marginBottom'>) => ({ marginBottom: v })
const ml = (v: PV<'marginLeft'>) => ({ marginLeft: v })
const mx = (v: PV<'marginLeft'>) => ({ marginLeft: v, marginRight: v })
const my = (v: PV<'marginTop'>) => ({ marginTop: v, marginBottom: v })

// padding aliases
const p = (v: PV<'padding'>) => ({ padding: v })
const pt = (v: PV<'paddingTop'>) => ({ paddingTop: v })
const pr = (v: PV<'paddingRight'>) => ({ paddingRight: v })
const pb = (v: PV<'paddingBottom'>) => ({ paddingBottom: v })
const pl = (v: PV<'paddingLeft'>) => ({ paddingLeft: v })
const px = (v: PV<'paddingLeft'>) => ({ paddingLeft: v, paddingRight: v })
const py = (v: PV<'paddingTop'>) => ({ paddingTop: v, paddingBottom: v })

// scrollbar
const scrollbarColor = (v: PV<'color'>) => ({ scrollbarColor: v }) // standard prop (only firefox)
const wksb = '&::-webkit-scrollbar' // webkit prefix (only chrome)
const scrollbarSize = (v: PV<'width'>) => ({ [wksb]: { width: v, height: v } })
const scrollbarTrackColor = (v: PV<'color'>) => ({ [`${wksb}-track`]: { background: v } })
const scrollbarThumbColor = (v: PV<'color'>) => ({ [`${wksb}-thumb`]: { background: v } })
const scrollbarThumbColorHovered = (v: PV<'color'>) => ({
  [`${wksb}-thumb:hover`]: { background: v },
})

// other
const br = (v: PV<'borderRadius'>) => ({ borderRadius: v })
const size = (v: PV<'width'>) => ({ width: v, height: v })
const linearGradient = (v: string) => ({ backgroundImage: `linear-gradient(${v})` })
const areas = (areas: string[]) => ({ gridTemplateAreas: areas.join(' ') })

const utils = {
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
  size,
  linearGradient,
  br,
  areas,
  scrollbarSize,
  scrollbarColor,
  scrollbarTrackColor,
  scrollbarThumbColor,
  scrollbarThumbColorHovered,
}

// section #########################################################################################
//  EXPORT
// #################################################################################################

export const stitches = createStitches({ theme, media, utils })

// export const { theme, styled, getCssText, createTheme, config, globalCss } = createStitches({
//   theme: {
//     fonts,
//     colors,
//     space,
//     fontSizes,
//     fontWeights,
//     lineHeights,
//     letterSpacings,
//     sizes,
//     borderWidths,
//     borderStyles,
//     radii,
//     shadows,
//     zIndices,
//     transitions,
//   },
//   media,
//   utils,
// })

// export type CSS = StichesCSS<typeof config>
