import axios from "axios"
import csv from "csvtojson"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

export function useCoronavirusData(
  setInfectedCases,
  setDeceasedCases,
  selectKey
) {
  const [loadingCoronaVirusCases, setLoadingCoronaVirusCases] = useState(true)
  const [brazilCoronavirusCases, setBrazilCoronavirusCases] = useState(true)
  const getMinistryOfHealthData = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-total.csv"
      )
      const brazilCasesCsv = response.data
      const brazilCasesJson = csv({
        output: "csv"
      })
        .fromString(brazilCasesCsv)
        .then(function(brazilCasesJson) {
          return brazilCasesJson
        })
      return brazilCasesJson
    } catch (error) {
      alert("Não foi possível obter os dados, tente novamente mais tarde")
    }
    return []
  }

  const getCoronavirusCases = async () => {
    setLoadingCoronaVirusCases(true)
    const brazilConfirmedCasesRealTime = await getMinistryOfHealthData()
    try {
      setBrazilCoronavirusCases(brazilConfirmedCasesRealTime)
      setInfectedCases(brazilConfirmedCasesRealTime[0][2] || 0)
      setDeceasedCases(brazilConfirmedCasesRealTime[0][5] || 0)
    } catch (error) {
      alert("Não foi possível obter os dados, tente novamente mais tarde")
    }
    setLoadingCoronaVirusCases(false)
  }

  useEffect(() => {
    getCoronavirusCases()
    //should reload data
  }, [selectKey])

  return { brazilCoronavirusCases, loadingCoronaVirusCases }
}

export function useCoronavirusHistoryData(selectedState, selectedCity) {
  const [loadingCasesByDay, setLoadingCasesByDay] = useState(true)
  const [casesByDay, setCasesByDay] = useState([])

  const getCasesByDay = async () => {
    setLoadingCasesByDay(true)
    try {
      const response = await axios.get(
        selectedCity
          ? "https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-cities-time.csv"
          : "https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-states.csv"
      )
      const statesCasesByDayCsv = response.data

      csv({
        output: "csv"
      })
        .fromString(statesCasesByDayCsv)
        .then(function(stateCasesByDayJson) {
          const brazilCasesByDay =
            !selectedCity && !selectedState
              ? stateCasesByDayJson.filter(item => item[2] === "TOTAL")
              : selectedState && !selectedCity
              ? stateCasesByDayJson.filter(item => item[2] === selectedState)
              : stateCasesByDayJson.filter(item => item[3] === selectedCity)

          const nonRepeatedBrazilCasesByDayWithFormattedDate = brazilCasesByDay.map(
            casesByDay => ({
              date: dayjs(casesByDay[0]).format("DD/MM/YYYY"),
              confirmed: selectedCity
                ? Number(casesByDay[6])
                : Number(casesByDay[6]),
              newCases: selectedCity
                ? Number(casesByDay[5])
                : Number(casesByDay[5])
            })
          )
          setCasesByDay(nonRepeatedBrazilCasesByDayWithFormattedDate)
        })
    } catch (error) {
      //console.log(error)
    }
    setLoadingCasesByDay(false)
  }

  useEffect(() => {
    getCasesByDay()
  }, [selectedState, selectedCity])

  return { casesByDay, loadingCasesByDay }
}
