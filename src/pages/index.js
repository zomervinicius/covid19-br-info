import axios from "axios"
import React, { useEffect, useState } from "react"
import Select from "react-select"
import Card from "../components/card"
import Layout from "../components/layout"
import SEO from "../components/seo"
import states from "../data/states.json"

export default function Index() {
  const [coronavirusCases, setCoronavirusCases] = useState([])
  const [loadingCoronaVirusCases, setLoadingCoronaVirusCases] = useState(true)
  // eslint-disable-next-line no-unused-vars
  const [selectedState, setSelectedState] = useState("")
  const [suspiciousCases, setSuspiciousCases] = useState(0)
  const [testedNotInfectedCases, setTestedNotInfectedCases] = useState(0)
  const [infectedCases, setInfectedCases] = useState(0)
  const [deceasedCases, setDeceasedCases] = useState(0)
  const getCoronavirusCases = async () => {
    setLoadingCoronaVirusCases(true)
    setSelectedState("")
    try {
      const response = await axios.get(
        "https://api.apify.com/v2/key-value-stores/TyToNta7jGKkpszMZ/records/LATEST"
      )
      const brazilConfirmedCases = await axios.get(
        "https://corona.lmao.ninja/countries/Brazil"
      )
      const brazilConfirmedCasesResponse = brazilConfirmedCases.data
      const allCases = response.data
      setCoronavirusCases(allCases)
      setSuspiciousCases(allCases.suspiciousCases)
      setTestedNotInfectedCases(allCases.testedNotInfected)
      setInfectedCases(
        brazilConfirmedCasesResponse.cases > allCases.infected
          ? brazilConfirmedCasesResponse.cases
          : allCases.infected
      )
      setDeceasedCases(
        brazilConfirmedCasesResponse.deaths > allCases.deceased
          ? brazilConfirmedCasesResponse.deaths
          : allCases.deceased
      )
      setLoadingCoronaVirusCases(false)
    } catch (error) {
      alert(
        "Não foi possível obter os dados, avise nesse e-mail infocoronavirusbr@gmail.com"
      )
    }
  }
  useEffect(() => {
    getCoronavirusCases()
  }, [])

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
    }
  }, [selectedState])
  return (
    <Layout>
      <SEO keywords={[`coronavirus`, `brasil`, `casos`]} title="Home" />
      <Select
        isLoading={loadingCoronaVirusCases}
        isDisabled={loadingCoronaVirusCases}
        options={options}
        placeholder="Selecione um estado..."
        onChange={value => setSelectedState(value.value)}
        noOptionsMessage={() => "Não há dados"}
        defaultValue={selectedState}
        className="mb-5"
      />
      {selectedState && (
        <button
          className="text-white  md:w-56"
          onClick={() => getCoronavirusCases()}
        >
          Voltar para os dados do Brasil
        </button>
      )}
      <Card
        title="Casos suspeitos"
        description={suspiciousCases}
        loadingCoronaVirusCases={loadingCoronaVirusCases}
        full
        textColor="blue"
      ></Card>
      <div className="flex flex-wrap">
        <Card
          title="Casos confirmados"
          loadingCoronaVirusCases={loadingCoronaVirusCases}
          textColor="red"
          description={infectedCases}
        ></Card>
        <Card
          loadingCoronaVirusCases={loadingCoronaVirusCases}
          title="Casos descartados"
          description={testedNotInfectedCases}
          textColor="green"
        ></Card>
        <Card
          loadingCoronaVirusCases={loadingCoronaVirusCases}
          title="Mortes"
          description={deceasedCases}
          textColor="gray"
        ></Card>
        <span className="text-gray-400 text-center">
          Fonte: Ministério da saúde e Wordometer
        </span>
      </div>
    </Layout>
  )
}
