import { stitches } from './stitches'
import { regularFont } from './fonts'

export const global = stitches.globalCss({
  '*::-webkit-scrollbar-button': { height: 0, width: 0 },
  'html, body, #__next': { height: '100%' },
  body: {
    background: '#121212',
    fontFamily: regularFont.style.fontFamily,
    fontSize: '.9rem',
    fontWeight: 300,
    letterSpacing: '.03em',
    color: '$gray700',
  },
})
