import { createStitches, PropertyValue as PV } from '@stitches/react'

// section #########################################################################################
//  THEME
// #################################################################################################

const theme = {
  colors: {
    gray100: '#0b0b0b',
    gray200: '#131313',
    gray300: '#232323',
    gray500: '#777',
    gray800: '#dddddd',
    accent500: 'cyan',
    // accent500: '#4165E4',
    success500: '#15be79',
    danger500: '#d31851',
  },
  fonts: {},
  fontSizes: {},
  fontWeights: {},
  lineHeights: {},
  letterSpacings: {},
  sizes: {},
  space: {},
  borderWidths: {},
  borderStyles: {},
  radii: {},
  shadows: {},
  zIndices: {},
  transitions: {},
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

const utils = {
  // margin
  m: (v: PV<'margin'>) => ({ margin: v }),
  mt: (v: PV<'marginTop'>) => ({ marginTop: v }),
  mr: (v: PV<'marginRight'>) => ({ marginRight: v }),
  mb: (v: PV<'marginBottom'>) => ({ marginBottom: v }),
  ml: (v: PV<'marginLeft'>) => ({ marginLeft: v }),
  mx: (v: PV<'marginLeft'>) => ({ marginLeft: v, marginRight: v }),
  my: (v: PV<'marginTop'>) => ({ marginTop: v, marginBottom: v }),

  // padding
  p: (v: PV<'padding'>) => ({ padding: v }),
  pt: (v: PV<'paddingTop'>) => ({ paddingTop: v }),
  pr: (v: PV<'paddingRight'>) => ({ paddingRight: v }),
  pb: (v: PV<'paddingBottom'>) => ({ paddingBottom: v }),
  pl: (v: PV<'paddingLeft'>) => ({ paddingLeft: v }),
  px: (v: PV<'paddingLeft'>) => ({ paddingLeft: v, paddingRight: v }),
  py: (v: PV<'paddingTop'>) => ({ paddingTop: v, paddingBottom: v }),

  // position
  in: (v: PV<'inset'>) => ({ inset: v }),
  t: (v: PV<'top'>) => ({ top: v }),
  r: (v: PV<'right'>) => ({ right: v }),
  b: (v: PV<'bottom'>) => ({ bottom: v }),
  l: (v: PV<'left'>) => ({ left: v }),
  x: (v: PV<'left'>) => ({ left: v, right: v }),
  y: (v: PV<'top'>) => ({ top: v, bottom: v }),

  // scrollbar
  scrollbarColor: (v: PV<'color'>) => ({ scrollbarColor: v }), // standard (only firefox)
  scrollbarSize: (v: PV<'width'>) => ({ '&::-webkit-scrollbar': { width: v, height: v } }),
  scrollbarTrackColor: (v: PV<'color'>) => ({ '&::-webkit-scrollbar-track': { background: v } }),
  scrollbarThumbColor: (v: PV<'color'>) => ({ '&::-webkit-scrollbar-thumb': { background: v } }),
  scrollbarThumbColorHovered: (v: PV<'color'>) => ({
    '&::-webkit-scrollbar-thumb:hover': { background: v },
  }),

  // font
  ff: (v: PV<'fontFamily'>) => ({ fontFamily: v }),
  fs: (v: PV<'fontSize'>) => ({ fontSize: v }),
  fw: (v: PV<'fontWeight'>) => ({ fontWeight: v }),
  c: (v: PV<'color'>) => ({ color: v }),
  lh: (v: PV<'lineHeight'>) => ({ lineHeight: v }),

  //todo position('absolute', 16, 16) === p=abs, t=16, y=16
  // toher
  bdrad: (v: PV<'borderRadius'>) => ({ borderRadius: v }),
  rad: (v: PV<'borderRadius'>) => ({ borderRadius: v }),
  bg: (v: PV<'background'>) => ({ background: v }),
  bgc: (v: PV<'backgroundColor'>) => ({ backgroundColor: v }),
  w: (v: PV<'width'>) => ({ width: v }),
  mw: (v: PV<'minWidth'>) => ({ minWidth: v }),
  h: (v: PV<'height'>) => ({ height: v }),
  mh: (v: PV<'minHeight'>) => ({ minHeight: v }),
  size: (v: PV<'width'>) => ({ width: v, height: v }),
  s: (v: PV<'width'>) => ({ width: v, height: v }),
  container: (v: string) => ({ containerName: v, containerType: 'inline-size' }),
  linearGradient: (v: string) => ({ backgroundImage: `linear-gradient(${v})` }),
  areas: (areas: string[]) => ({ gridTemplateAreas: areas.join(' ') }),
  gtc: (v: PV<'gridTemplateColumns'>) => ({ gridTemplateColumns: v }),
  gtr: (v: PV<'gridTemplateRows'>) => ({ gridTemplateRows: v }),
  gta: (v: PV<'gridTemplateAreas'>) => ({ gridTemplateAreas: v }),
  d: (v: PV<'display'>) => ({ display: v }),
  fd: (v: PV<'flexDirection'>) => ({ flexDirection: v }),
  jc: (v: PV<'justifyContent'>) => ({ justifyContent: v }),
  ai: (v: PV<'alignItems'>) => ({ alignItems: v }),
  pc: (v: PV<'placeContent'>) => ({ placeContent: v }),
  pos: (v: PV<'position'>) => ({ position: v }),
  g: (v: PV<'gap'>) => ({ gap: v }),
  of: (v: PV<'overflow'>) => ({ overflow: v }),
  tt: (v: PV<'textTransform'>) => ({ textTransform: v }),
  z: (v: PV<'zIndex'>) => ({ zIndex: v }),
  ol: (v?: PV<'color'>) => ({ outline: `1px solid ${v}` }),
}

// section #########################################################################################
//  EXPORT
// #################################################################################################

export const stitches = createStitches({ theme, media, utils })
