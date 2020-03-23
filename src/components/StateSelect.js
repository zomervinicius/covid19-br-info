import PropTypes from "prop-types"
import React, { useEffect } from "react"
import Select from "react-select"
import states from "../data/states.json"

export function StateSelect({
  loadingCoronaVirusCases,
  setSelectedState,
  selectedState,
  setInfectedCases,
  setDeceasedCases,
  brazilCoronavirusCases,
  selectKey
}) {
  const options = states
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(state => ({ value: state.abbr, label: state.name }))

  useEffect(() => {
    if (selectedState) {
      const stateData = brazilCoronavirusCases.find(
        item => item[1] === selectedState
      )
      const infectedCases = stateData[3]
      const deceasedCases = stateData[5]
      setInfectedCases(infectedCases)
      setDeceasedCases(deceasedCases)
      if (selectedState === "SC") {
        const updatedInfectedCases = 68
        setInfectedCases(
          infectedCases > updatedInfectedCases
            ? infectedCases
            : updatedInfectedCases
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
    </React.Fragment>
  )
}

StateSelect.propTypes = {
  brazilCoronavirusCases: PropTypes.array,
  loadingCoronaVirusCases: PropTypes.bool,
  selectKey: PropTypes.number,
  selectedState: PropTypes.string,
  setDeceasedCases: PropTypes.func,
  setInfectedCases: PropTypes.func,
  setSelectedState: PropTypes.func
}
