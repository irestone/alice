import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import useMeasure from 'react-use-measure'
import { useViewportMeasure } from '@common/utils'
import { useStorage } from '@common/storage'

export default function App({ Component, pageProps }: AppProps) {
  useStorage((s) => s.init)()
  // setting up viewport measures used by media queries hook
  const [mref, measure] = useMeasure()
  const setViewportMeasure = useViewportMeasure((s) => s.setMeasure)
  useEffect(() => void setViewportMeasure(measure), [setViewportMeasure, measure])
  return (
    <>
      <Component {...pageProps} />
      <div ref={mref} style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }} />
    </>
  )
}
