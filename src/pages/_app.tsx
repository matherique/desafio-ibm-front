import * as React from 'react'
import { AppProps } from 'next/app'
import { AppProvider } from '../context/app-context'

import Head from 'next/head'
import GlobalStyles from '../styles/global'
import Layout from '../components/layout'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <Head>
        <title>Search GoogleBooks</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GlobalStyles />
    </AppProvider>
  )
}

export default MyApp
