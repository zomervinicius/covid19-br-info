import PropTypes from "prop-types"
import React from "react"
import Card from "./card"

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
        loadingCoronaVirusCases={loadingCoronaVirusCases}
        full
      ></Card>
      <div className="flex flex-wrap">
        <Card
          title="Casos confirmados"
          loadingCoronaVirusCases={loadingCoronaVirusCases}
          description={infectedCases}
        ></Card>
        <Card
          loadingCoronaVirusCases={loadingCoronaVirusCases}
          title="Casos descartados"
          description={testedNotInfectedCases}
        ></Card>
        <Card
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
