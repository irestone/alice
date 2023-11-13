import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { applyGlobalStyles, getCssText, resetDefaultStyles } from '@common/styles'

export default class Document extends NextDocument {
  render() {
    resetDefaultStyles()
    applyGlobalStyles()
    return (
      <Html>
        <Head>
          <style id='stitches' dangerouslySetInnerHTML={{ __html: getCssText() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
