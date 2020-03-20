import PropTypes from "prop-types"
import React from "react"
import Card from "./InfoCard"

export function HomeCards({
  suspiciousCases,
  loadingCoronaVirusCases,
  infectedCases,
  testedNotInfectedCases,
  deceasedCases
}) {
  return (
    <React.Fragment>
      <Card
        title="Casos suspeitos"
        description={suspiciousCases}
        className="max-w my-5"
        loadingCoronaVirusCases={loadingCoronaVirusCases}
        full
      ></Card>
      <div className="flex flex-wrap">
        <Card
          title="Casos confirmados"
          className="max-w-sm w-full md:w-1/3 mb-5"
          loadingCoronaVirusCases={loadingCoronaVirusCases}
          description={infectedCases}
        ></Card>
        <Card
          className="max-w-sm w-full md:w-1/3 md:px-6 mb-5"
          loadingCoronaVirusCases={loadingCoronaVirusCases}
          title="Casos descartados"
          description={testedNotInfectedCases}
        ></Card>
        <Card
          className="max-w-sm w-full md:w-1/3 mb-5"
          loadingCoronaVirusCases={loadingCoronaVirusCases}
          title="Mortes"
          description={deceasedCases}
        ></Card>
      </div>
    </React.Fragment>
  )
}

HomeCards.propTypes = {
  deceasedCases: PropTypes.any,
  infectedCases: PropTypes.any,
  loadingCoronaVirusCases: PropTypes.any,
  suspiciousCases: PropTypes.any,
  testedNotInfectedCases: PropTypes.any
}
