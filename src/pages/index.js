import React, { useState } from "react"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import Card from "../components/InfoCard"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { StateSelect } from "../components/StateSelect"
import {
  useCoronavirusData,
  useCoronavirusHistoryData
} from "../utils/customHooks"
import { LoadingChart } from "./../components/LoadingChart"

export default function Index() {
  const [selectedState, setSelectedState] = useState("")
  const [suspiciousCases, setSuspiciousCases] = useState(0)
  const [testedNotInfectedCases, setTestedNotInfectedCases] = useState(0)
  const [infectedCases, setInfectedCases] = useState(0)
  const [deceasedCases, setDeceasedCases] = useState(0)
  const [selectKey, setSelectKey] = useState(0)
  const { coronavirusCases, loadingCoronaVirusCases } = useCoronavirusData(
    setSuspiciousCases,
    setTestedNotInfectedCases,
    setInfectedCases,
    setDeceasedCases,
    selectKey
  )
  const { casesByDay, loadingCasesByDay } = useCoronavirusHistoryData()

  return (
    <Layout>
      <SEO keywords={[`coronavirus`, `brasil`, `casos`]} title="Home" />

      <StateSelect
        {...{
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
        }}
      />
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
          className="max-w w-full md:w-1/3 mb-5"
          loadingCoronaVirusCases={loadingCoronaVirusCases}
          description={infectedCases}
        ></Card>
        <Card
          className="max-w w-full md:w-1/3 md:px-4 mb-5"
          loadingCoronaVirusCases={loadingCoronaVirusCases}
          title="Casos descartados"
          description={testedNotInfectedCases}
        ></Card>
        <Card
          className="max-w w-full md:w-1/3 mb-5"
          loadingCoronaVirusCases={loadingCoronaVirusCases}
          title="Mortes"
          description={deceasedCases}
        ></Card>
      </div>
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
      <span className="text-gray-400 text-left mt-5">
        Fontes: Ministério da saúde; Wordometer; Johns Hopkings
      </span>
    </Layout>
  )
}
