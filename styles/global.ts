import { Inter } from '@next/font/google'

import { globalCss } from './config'

const regularFont = Inter({
  subsets: ['cyrillic'],
  variable: '--font-regular',
})

export const global = globalCss({
  ':root': {
    // '--collection-width': '27rem',
  },
  '*::-webkit-scrollbar-button': {
    height: 0,
    width: 0,
  },
  'html, body, #__next': {
    height: '100%',
  },
  body: {
    background: '#121212',
    color: '$gray700',
    fontFamily: regularFont.style.fontFamily,
  },
})
