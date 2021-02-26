import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to scarecrow!</title>
      </Head>
      <div className="app">
        <header className="flex">
          <h1>Welcome to scarecrow!</h1>
        </header>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}

export default CustomApp
