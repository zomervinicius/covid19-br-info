import React from "react"
export function Footer() {
  return (
    <footer className="bg-gray-900">
      <nav className="flex flex-wrap md:justify-between max-w-6xl mx-auto p-4 md:p-8 text-md">
        <p className="text-white">
          Criado por{` `}
          <a
            className="font-bold no-underline text-white"
            href="https://www.linkedin.com/in/vinicius-zomer/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vinícius Zomer
          </a>
        </p>

        <p>
          <a
            className="font-bold no-underline text-white"
            href="mailto:infocoronavirusbr@gmail.com"
          >
            infocoronavirusbr@gmail.com
          </a>
        </p>
      </nav>
    </footer>
  )
}
