import axios from "axios"
import { useEffect, useState } from "react"

export function useCoronavirusData(
  setSuspiciousCases,
  setTestedNotInfectedCases,
  setInfectedCases,
  setDeceasedCases,
  selectKey
) {
  const [coronavirusCases, setCoronavirusCases] = useState([])
  const [loadingCoronaVirusCases, setLoadingCoronaVirusCases] = useState(true)
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
      console.log(error)
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
    getCoronavirusCases(
      setSuspiciousCases,
      setTestedNotInfectedCases,
      setInfectedCases,
      setDeceasedCases
    )
    //should reload data
  }, [selectKey])

  return { coronavirusCases, loadingCoronaVirusCases }
}
