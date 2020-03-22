import PropTypes from "prop-types"
import React from "react"
import { isMobile } from "react-device-detect"
import { ResponsiveContainer } from "recharts"

export function LoadingChart({ loading, chartData, children, chartTitle }) {
  return (
    <div className={"max-w"}>
      <div
        className="border-r border-b border-l border-gray-900 lg:border-l-0  rounded-lg py-6 pr-6 md:px-6  flex flex-col text-center"
        style={{
          backgroundColor: "#212024"
        }}
      >
        <span className="text-gray-400 text-lg">{chartTitle}</span>
        {loading ? (
          <div
            style={{
              height: isMobile ? 350 : 500
            }}
            className="flex"
          >
            <span className="text-white text-4xl m-auto">Carregando...</span>
          </div>
        ) : !loading && chartData.length === 0 ? (
          <div
            style={{
              height: isMobile ? 350 : 500
            }}
            className="flex"
          >
            <span className="text-white text-xl m-auto">
              Não foi possível carregar os dados, tente novamente mais tarde
            </span>
          </div>
        ) : (
          <ResponsiveContainer height={isMobile ? 350 : 500}>
            {children}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

LoadingChart.propTypes = {
  chartData: PropTypes.array,
  chartTitle: PropTypes.string,
  children: PropTypes.any,
  loading: PropTypes.bool
}
