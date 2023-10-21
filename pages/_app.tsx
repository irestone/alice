import type { AppProps } from 'next/app'

import { applyGlobalStyles, resetDefaultStyles } from '../_styles'

function App({ Component, pageProps }: AppProps) {
  resetDefaultStyles()
  applyGlobalStyles()
  return <Component {...pageProps} />
}

export default App
