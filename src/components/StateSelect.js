import PropTypes from "prop-types"
import React, { useEffect } from "react"
import Select from "react-select"
import states from "../data/states.json"

export function StateSelect({
  loadingCoronaVirusCases,
  setSelectedState,
  selectedState,
  coronavirusCases,
  setSuspiciousCases,
  setTestedNotInfectedCases,
  setInfectedCases,
  setDeceasedCases,
  selectKey,
  setSelectKey
}) {
  const options = states
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(state => ({ value: state.abbr, label: state.name }))

  useEffect(() => {
    if (selectedState) {
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
      if (selectedState === "SC") {
        setInfectedCases(
          infectedByRegion.count > 68 ? infectedByRegion.count : 68
        )
        setSuspiciousCases(
          suspiciousCasesByRegion.count > 410
            ? suspiciousCasesByRegion.count
            : 410
        )
      }
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
        <div>
          <button
            className="text-white"
            onClick={() => {
              setSelectedState("")
              setSelectKey(key => key + 1)
            }}
          >
            Voltar para os dados do Brasil
          </button>
        </div>
      )}
    </React.Fragment>
  )
}

StateSelect.propTypes = {
  coronavirusCases: PropTypes.any,
  loadingCoronaVirusCases: PropTypes.any,
  selectKey: PropTypes.any,
  selectedState: PropTypes.any,
  setDeceasedCases: PropTypes.any,
  setInfectedCases: PropTypes.any,
  setSelectKey: PropTypes.any,
  setSelectedState: PropTypes.any,
  setSuspiciousCases: PropTypes.any,
  setTestedNotInfectedCases: PropTypes.any
}
