import {NextSeo} from 'next-seo'
import React from 'react'
import {Footer} from '../components/Footer'
import Header from '../components/Header'
import '../styles/index.css'

function MyApp({Component, pageProps}) {
  return (
    <div
      className="flex flex-col font-sans min-h-screen"
      style={{backgroundColor: '#262529'}}
    >
      <NextSeo
        title="Coronavírus Brasil"
        description="Demonstrar casos de coronavírus Brasil."
      />
      <Header />
      <main className="flex flex-col flex-1 mx-auto px-4 py-8 md:p-8 w-full max-w-6xl">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}

export default MyApp
