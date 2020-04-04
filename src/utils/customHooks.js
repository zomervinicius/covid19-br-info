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
    setLoadingCoronaVirusCases(true)
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-total.csv"
      )
      const brazilCasesCsv = response.data

      const brazilCasesJson = csv({
        output: "csv",
      })
        .fromString(brazilCasesCsv)
        .then(function(brazilCasesJson) {
          const splittedCsv = brazilCasesCsv.split(",")
          const csvTotalCasesIndex = splittedCsv.findIndex(
            (item) => item === "totalCases"
          )
          const csvDeathsIndex = splittedCsv.findIndex(
            (item) => item === "deaths"
          )
          setBrazilCoronavirusCases(brazilCasesJson)
          setInfectedCases(brazilCasesJson[0][csvTotalCasesIndex] || 0)
          setDeceasedCases(brazilCasesJson[0][csvDeathsIndex] || 0)
        })
      return brazilCasesJson
    } catch (error) {
      alert("Não foi possível obter os dados, tente novamente mais tarde")
    } finally {
      setLoadingCoronaVirusCases(false)
    }
    return []
  }

  const getCoronavirusCases = async () => {
    getMinistryOfHealthData()
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
        output: "csv",
      })
        .fromString(statesCasesByDayCsv)
        .then(function(stateCasesByDayJson) {
          const splittedCsv = statesCasesByDayCsv.split(",")
          //get cases by key
          const csvCityOrState = selectedCity
            ? splittedCsv.findIndex((item) => item === "city")
            : splittedCsv.findIndex((item) => item === "state")

          const brazilCasesByDay =
            !selectedCity && !selectedState
              ? stateCasesByDayJson.filter(
                  (item) => item[csvCityOrState] === "TOTAL"
                )
              : selectedState && !selectedCity
              ? stateCasesByDayJson.filter(
                  (item) => item[csvCityOrState] === selectedState
                )
              : stateCasesByDayJson.filter(
                  (item) => item[csvCityOrState] === selectedCity
                )
          const csvDateIndex = splittedCsv.findIndex(
            (state) => state === "date"
          )
          const csvConfirmedIndex = splittedCsv.findIndex((item) =>
            item.includes("totalCases")
          )
          const csvNewCasesIndex = splittedCsv.findIndex(
            (item) => item === "newCases"
          )
          const csvDeathsIndex = splittedCsv.findIndex(
            (item) => item === "deaths"
          )

          const nonRepeatedBrazilCasesByDayWithFormattedDate = []
          for (let index = 0; index < brazilCasesByDay.length; index++) {
            const casesByDay = brazilCasesByDay[index]
            nonRepeatedBrazilCasesByDayWithFormattedDate.push({
              date: dayjs(casesByDay[csvDateIndex]).format("DD/MM/YYYY"),
              confirmed: Number(casesByDay[csvConfirmedIndex]),
              newCases: Number(casesByDay[csvNewCasesIndex]),
              deaths: !selectedCity && Number(casesByDay[csvDeathsIndex]),
              newDeaths:
                !selectedCity && index > 0
                  ? Number(casesByDay[csvDeathsIndex]) -
                    Number(brazilCasesByDay[index - 1][csvDeathsIndex])
                  : 0,
            })
          }
          // console.log(nonRepeatedBrazilCasesByDayWithFormattedDate)
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
