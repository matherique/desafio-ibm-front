import * as React from 'react'
import { AppProps } from 'next/app'
import { AppProvider } from 'context/app-context'

import Head from 'next/head'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <Head>
        <title>Search GoogleBooks</title>
      </Head>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
