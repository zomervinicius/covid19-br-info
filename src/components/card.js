import PropTypes from "prop-types"
import React from "react"

export default function Card({
  title,
  description,
  full,
  loadingCoronaVirusCases
}) {
  return (
    <div
      className={
        full ? "max-w my-5 px-3" : "max-w-sm w-full md:w-1/3 px-3 mb-5"
      }
    >
      <div
        className="border-r border-b border-l border-gray-900 lg:border-l-0  rounded-lg py-8 px-12  flex flex-col text-center"
        style={{ backgroundColor: "#212024" }}
      >
        <span className="text-gray-400 text-base">{title}</span>
        <span className="text-white text-6xl">
          {loadingCoronaVirusCases ? "..." : description}
        </span>
      </div>
    </div>
  )
}

Card.propTypes = {
  description: PropTypes.any,
  full: PropTypes.any,
  loadingCoronaVirusCases: PropTypes.any,
  title: PropTypes.any
}
