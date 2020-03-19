import PropTypes from "prop-types"
import React from "react"
import { Helmet } from "react-helmet"
import { Footer } from "./Footer"
import Header from "./header"

function Layout({ children }) {
  return (
    <div
      className="flex flex-col font-sans min-h-screen"
      style={{ backgroundColor: "#262529" }}
    >
      <Helmet>
        <script
          data-ad-client="ca-pub-5598257228129274"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
        <meta
          name="google-site-verification"
          content="4EoBeuccwmG0j_AVpBVN6KbiDkfHYNQTUaepqhEcmfE"
        />
      </Helmet>
      <Header />
      <main className="flex flex-col flex-1 mx-auto px-4 py-8 md:p-8 w-full max-w-6xl">
        {children}
      </main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
