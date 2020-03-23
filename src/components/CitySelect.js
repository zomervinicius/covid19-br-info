import axios from "axios"
import csv from "csvtojson"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import Select from "react-select"

export function CitySelect({
  selectedCity,
  setSelectedCity,
  loadingCoronaVirusCases,
  selectKey,
  setInfectedCases
}) {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const loadOptions = async () => {
      const response = await axios.get(
        "https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-cities.csv"
      )
      const citiesCsv = response.data
      csv({
        output: "csv"
      })
        .fromString(citiesCsv)
        .then(function(citiesJson) {
          const allCities = citiesJson.map(city => ({
            value: city[2],
            label: city[2],
            confirmedCases: city[3]
          }))
          setOptions(allCities)
        })
    }
    loadOptions()
  }, [])

  const updateCityCases = select => {
    setSelectedCity(select.value)
    setInfectedCases(select.confirmedCases)
  }

  return (
    <Select
      isLoading={loadingCoronaVirusCases}
      isDisabled={loadingCoronaVirusCases}
      key={selectKey}
      options={options}
      placeholder="Selecione uma cidade..."
      onChange={select => updateCityCases(select)}
      noOptionsMessage={() => "Não há dados"}
      defaultValue={selectedCity}
      className="mb-5"
    />
  )
}

CitySelect.propTypes = {
  loadingCoronaVirusCases: PropTypes.bool,
  selectKey: PropTypes.number,
  selectedCity: PropTypes.string,
  setInfectedCases: PropTypes.func,
  setSelectKey: PropTypes.func,
  setSelectedCity: PropTypes.func
}
