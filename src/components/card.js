import PropTypes from "prop-types"
import React from "react"

export default function Card({
  title,
  description,
  loadingCoronaVirusCases,
  className
}) {
  return (
    <div className={className}>
      <div
        className="border-r border-b border-l border-gray-900 lg:border-l-0  rounded-lg py-8 px-12  flex flex-col text-center"
        style={{ backgroundColor: "#212024" }}
      >
        <span className="text-gray-400 text-lg">{title}</span>
        <span className="text-white text-6xl">
          {loadingCoronaVirusCases ? "..." : description}
        </span>
      </div>
    </div>
  )
}

Card.propTypes = {
  className: PropTypes.any,
  description: PropTypes.any,
  loadingCoronaVirusCases: PropTypes.any,
  title: PropTypes.any
}
