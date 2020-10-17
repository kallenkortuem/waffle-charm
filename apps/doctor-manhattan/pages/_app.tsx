import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import './styles.css'

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Doctor-Manhattan</title>
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
      </Head>
      <div className="app">
        <h1>Welcome to doctor-manhattan!</h1>
        <header>
          <img
            width="450"
            src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
            alt=""
          />
        </header>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}

export default CustomApp
