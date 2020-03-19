import axios from "axios"
import React, { useEffect, useState } from "react"
import { HomeCards } from "../components/HomeCards"
import { HomeFooter } from "../components/HomeFooter"
import { HomeHeader } from "../components/HomeHeader"
import Layout from "../components/layout"
import SEO from "../components/seo"

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
        "https://api.apify.com/v2/key-value-stores/TyToNta7jGKkpszMZ/records/LATEST?disableRedirect=true"
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
      <HomeFooter />
    </Layout>
  )
}
