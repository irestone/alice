import { globalCss } from './config'

export const global = globalCss({
  ':root': {
    '--navbar-width': '3rem',
    '--collection-width': '25rem',
  },
  'html, body, #__next': {
    height: '100%',
  },
  body: {
    background: '$gray100',
    color: '$gray900',
  },
})
