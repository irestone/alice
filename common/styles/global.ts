import * as fonts from './fonts'
import { stitches } from './stitches'

export const global = stitches.globalCss({
  ':root': { '--mobile-head-height': 53, '--mobile-menu-height': 53 },
  '*::-webkit-scrollbar-button': { height: 0, width: 0 },
  'html, body, #__next': { height: '100%' },
  body: {
    font: `300 13px ${fonts.system.style.fontFamily}`,
    letterSpacing: '.03em',
    color: '#eaeaea',
    background: '#0b0b0b',
  },
})
