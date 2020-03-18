import PropTypes from "prop-types"
import React from "react"
import Header from "./header"

function Layout({ children }) {
  return (
    <div
      className="flex flex-col font-sans min-h-screen"
      style={{ backgroundColor: "#262529" }}
    >
      <Header />
      <main className="flex flex-col flex-1 mx-auto px-4 py-8 md:p-8 w-full max-w-6xl">
        {children}
      </main>

      <footer className="bg-gray-900">
        <nav className="flex justify-between max-w-6xl mx-auto p-4 md:p-8 text-md">
          <p className="text-white">
            Criado por{` `}
            <a
              className="font-bold no-underline text-white"
              href="https://www.linkedin.com/in/vinicius-zomer/"
              target="_blank"
            >
              Vinícius Zomer
            </a>
          </p>

          <p>
            <a
              className="font-bold no-underline text-white"
              href="https://github.com/taylorbryant/gatsby-starter-tailwind"
            >
              infocoronavirusbr@gmail.com
            </a>
          </p>
        </nav>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
