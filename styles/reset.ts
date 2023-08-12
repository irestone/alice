import { globalCss } from './config'

export const reset = globalCss({
  '*, ::before, ::after': {
    boxSizing: 'border-box',
  },
  html: {
    fontSize: 16,
  },
  body: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    padding: 0,
    margin: 0,
  },
  a: {
    color: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    textDecoration: 'none',
  },
  button: {
    border: 'none',
    padding: 0,
    background: 'none',
    color: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    textAlign: 'inherit',
    textTransform: 'inherit',
    letterSpacing: 'inherit',
    lineHeight: 'inherit',
    cursor: 'pointer',
  },
  'h1, h2, h3, h4, h5, h6, p': {
    padding: 0,
    margin: 0,
    fontSize: 'inherit',
  },
  'p + p': {
    marginTop: '1.2em',
  },
  'ul, ol': {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  input: {
    border: 'none',
    outline: 'none',
    background: 'inherit',
  },
})
