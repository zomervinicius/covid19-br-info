import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import Select from "react-select"
import states from "../data/states.json"

export function HomeHeader({
  loadingCoronaVirusCases,
  setSelectedState,
  selectedState,
  coronavirusCases,
  setSuspiciousCases,
  setTestedNotInfectedCases,
  setInfectedCases,
  setDeceasedCases,
  getCoronavirusCases
}) {
  const [selectKey, setSelectKey] = useState(0)
  const options = states
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(state => ({ value: state.abbr, label: state.name }))

  useEffect(() => {
    if (selectedState) {
      console.log(selectedState)
      const suspiciousCasesByRegion = coronavirusCases.suspiciousCasesByRegion.find(
        item => item.state === selectedState
      )
      const testedNotInfectedByRegion = coronavirusCases.testedNotInfectedByRegion.find(
        item => item.state === selectedState
      )
      const infectedByRegion = coronavirusCases.infectedByRegion.find(
        item => item.state === selectedState
      )
      const deceasedByRegion = coronavirusCases.deceasedByRegion.find(
        item => item.state === selectedState
      )
      setSuspiciousCases(suspiciousCasesByRegion.count || 0)
      setTestedNotInfectedCases(testedNotInfectedByRegion.count || 0)
      setInfectedCases(infectedByRegion.count || 0)
      setDeceasedCases(deceasedByRegion.count || 0)
      selectedState === "SC" &&
        setInfectedCases(
          infectedByRegion.count > 40 ? infectedByRegion.count : 40
        )
    }
  }, [selectedState])
  return (
    <React.Fragment>
      <Select
        isLoading={loadingCoronaVirusCases}
        isDisabled={loadingCoronaVirusCases}
        key={selectKey}
        options={options}
        placeholder="Selecione um estado..."
        onChange={value => setSelectedState(value.value)}
        noOptionsMessage={() => "Não há dados"}
        defaultValue={selectedState}
        className="mb-5"
      />
      {selectedState && (
        <button
          className="text-white md:w-56"
          onClick={() => {
            setSelectedState("")
            setSelectKey(key => key + 1)
            getCoronavirusCases()
          }}
        >
          Voltar para os dados do Brasil
        </button>
      )}
    </React.Fragment>
  )
}

HomeHeader.propTypes = {
  coronavirusCases: PropTypes.any,
  getCoronavirusCases: PropTypes.any,
  loadingCoronaVirusCases: PropTypes.any,
  selectedState: PropTypes.any,
  setDeceasedCases: PropTypes.any,
  setInfectedCases: PropTypes.any,
  setSelectedState: PropTypes.any,
  setSuspiciousCases: PropTypes.any,
  setTestedNotInfectedCases: PropTypes.any
}
