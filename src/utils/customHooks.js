import axios from "axios"
import csv from "csvtojson"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { getUnique } from "../utils"

export function useCoronavirusData(
  setInfectedCases,
  setDeceasedCases,
  selectKey
) {
  brazilCoronavirusCases
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

export function useCoronavirusHistoryData() {
  const [loadingCasesByDay, setLoadingCasesByDay] = useState(true)
  const [casesByDay, setCasesByDay] = useState([])

  const getCasesByDay = async () => {
    setLoadingCasesByDay(true)
    try {
      const response = await axios.get(
        "https://pomber.github.io/covid19/timeseries.json"
      )
      const brazilCasesByDay = response.data.Brazil
      const nonRepeatedBrazilCasesByDay = getUnique(
        brazilCasesByDay,
        "confirmed"
      )
      const nonRepeatedBrazilCasesByDayWithFormattedDate = nonRepeatedBrazilCasesByDay.map(
        casesByDay => ({
          date: format(new Date(casesByDay.date), "dd/MM/yyyy"),
          confirmed: casesByDay.confirmed,
          deaths: casesByDay.deaths,
          recovered: casesByDay.recovered
        })
      )
      setCasesByDay(nonRepeatedBrazilCasesByDayWithFormattedDate)
    } catch (error) {
      //console.log(error)
    }
    setLoadingCasesByDay(false)
  }

  useEffect(() => {
    getCasesByDay()
  }, [])

  return { casesByDay, loadingCasesByDay }
}
