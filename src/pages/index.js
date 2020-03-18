import axios from "axios"
import React, { useEffect, useState } from "react"
import Card from "../components/card"
import Layout from "../components/layout"

export default function Index() {
  const [coronavirusCases, setCoronavirusCases] = useState([])
  const [loadingCoronaVirusCases, setLoadingCoronaVirusCases] = useState(true)
  const getCoronavirusCases = async () => {
    try {
      const response = await axios.get(
        "https://api.apify.com/v2/key-value-stores/TyToNta7jGKkpszMZ/records/LATEST"
      )
      setCoronavirusCases(response.data)
      setLoadingCoronaVirusCases(false)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCoronavirusCases()
  }, [])
  return (
    <Layout>
      <Card
        title="Casos suspeitos"
        description={coronavirusCases.suspiciousCases}
        loadingCoronaVirusCases={loadingCoronaVirusCases}
        full
        textColor="blue"
      ></Card>
      <div className="flex flex-wrap">
        <Card
          title="Casos confirmados"
          loadingCoronaVirusCases={loadingCoronaVirusCases}
          textColor="red"
          description={coronavirusCases.infected}
        ></Card>
        <Card
          loadingCoronaVirusCases={loadingCoronaVirusCases}
          title="Casos descartados"
          description={coronavirusCases.testedNotInfected}
          textColor="green"
        ></Card>
        <Card
          loadingCoronaVirusCases={loadingCoronaVirusCases}
          title="Mortes"
          description={coronavirusCases.deceased}
          textColor="gray"
        ></Card>
      </div>
    </Layout>
  )
}
