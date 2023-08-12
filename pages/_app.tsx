import type { AppProps } from 'next/app'
import { reset as resetDefaultStyles } from '../styles/reset'
import { global as applyGlobalStyles } from '../styles/global'

function MyApp({ Component, pageProps }: AppProps) {
  resetDefaultStyles()
  applyGlobalStyles()
  return <Component {...pageProps} />
}

export default MyApp
