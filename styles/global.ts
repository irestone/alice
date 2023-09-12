import { Inter } from '@next/font/google'

import { globalCss } from './config'

const regularFont = Inter({
  subsets: ['cyrillic'],
  variable: '--font-regular',
})

export const global = globalCss({
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
