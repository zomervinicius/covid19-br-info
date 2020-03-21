import axios from "axios"
import { format } from "date-fns"
import React, { useEffect, useState } from "react"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import { HomeCards } from "../components/HomeCards"
import { HomeFooter } from "../components/HomeFooter"
import { HomeHeader } from "../components/HomeHeader"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { getUnique } from "../utils/index"
import { LoadingChart } from "./../components/LoadingChart"

export default function Index() {
  const [coronavirusCases, setCoronavirusCases] = useState([])
  const [loadingCoronaVirusCases, setLoadingCoronaVirusCases] = useState(true)
  const [loadingCasesByDay, setLoadingCasesByDay] = useState(true)
  const [selectedState, setSelectedState] = useState("")
  const [suspiciousCases, setSuspiciousCases] = useState(0)
  const [testedNotInfectedCases, setTestedNotInfectedCases] = useState(0)
  const [infectedCases, setInfectedCases] = useState(0)
  const [deceasedCases, setDeceasedCases] = useState(0)
  const [casesByDay, setCasesByDay] = useState([])

  const getWordometerBrazilCases = async () => {
    try {
      const brazilConfirmedCasesRealTime = await axios.get(
        "https://corona.lmao.ninja/countries/Brazil"
      )
      return brazilConfirmedCasesRealTime.data
    } catch (error) {
      console.log(error)
    }
  }

  const getMinistryOfHealthBrazilAndStatesCases = async () => {
    try {
      const allCases = await axios.get(
        "https://api.apify.com/v2/key-value-stores/TyToNta7jGKkpszMZ/records/LATEST?disableRedirect=true"
      )
      return allCases.data
    } catch (error) {
      alert("Não foi possível obter os dados, tente novamente mais tarde")
    }
  }

  const getCoronavirusCases = async () => {
    setLoadingCoronaVirusCases(true)
    const allCases = await getMinistryOfHealthBrazilAndStatesCases()
    const brazilConfirmedCasesRealTime = await getWordometerBrazilCases()
    allCases && setCoronavirusCases(allCases)
    setSuspiciousCases(allCases?.suspiciousCases || 0)
    setTestedNotInfectedCases(allCases?.testedNotInfected || 0)
    //check which data source is more updated based on data
    setInfectedCases(
      brazilConfirmedCasesRealTime?.cases > allCases?.infected
        ? brazilConfirmedCasesRealTime?.cases
        : allCases?.infected || 0
    )
    setDeceasedCases(
      brazilConfirmedCasesRealTime?.deaths > allCases?.deceased
        ? brazilConfirmedCasesRealTime?.deaths
        : allCases?.deceased || 0
    )
    setLoadingCoronaVirusCases(false)
  }

  useEffect(() => {
    getCoronavirusCases()
    getCasesByDay()
  }, [])

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
      console.log(error)
    }
    setLoadingCasesByDay(false)
  }

  return (
    <Layout>
      <SEO keywords={[`coronavirus`, `brasil`, `casos`]} title="Home" />

      <HomeHeader
        {...{
          loadingCoronaVirusCases,
          setSelectedState,
          selectedState,
          coronavirusCases,
          setSuspiciousCases,
          setTestedNotInfectedCases,
          setInfectedCases,
          setDeceasedCases,
          getCoronavirusCases
        }}
      />
      <HomeCards
        suspiciousCases={suspiciousCases}
        loadingCoronaVirusCases={loadingCoronaVirusCases}
        infectedCases={infectedCases}
        testedNotInfectedCases={testedNotInfectedCases}
        deceasedCases={deceasedCases}
      />

      {!selectedState && (
        <LoadingChart
          loading={loadingCasesByDay}
          chartData={casesByDay}
          chartTitle="Relatório diário"
        >
          <LineChart
            data={casesByDay}
            margin={{
              left: 0,
              right: 16,
              top: 24,
              bottom: 24
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              textAnchor="middle"
              tick={{
                fontSize: 16,
                angle: -25,
                stroke: "white"
              }}
              tickMargin={20}
            />
            <YAxis dataKey="confirmed" />
            <Tooltip label="date" />
            <Line dataKey="confirmed" name="Confirmados" stroke="#e74c3c" />
            <Line dataKey="deaths" name="Mortes" stroke="black" />
            <Line dataKey="recovered" name="Recuperados" stroke="#2ecc71" />
          </LineChart>
        </LoadingChart>
      )}
      <HomeFooter />
    </Layout>
  )
}
