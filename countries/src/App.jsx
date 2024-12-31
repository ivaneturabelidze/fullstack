import { useEffect, useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Country from './components/Country'

function App() {

  const [filteredCountries, setFilteredCountries] = useState([])
  const [weatherData, setWeatherData] = useState({})

  const countryChange = event => {
    if (event.target.value === '') {
      setFilteredCountries([])
      return
    }

    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      const countriesWithNativeName = response.data.filter(country => country.name.nativeName)

      const nativeMatched = countriesWithNativeName.filter(country => Object.entries(country['name']['nativeName']).some(lang => lang[1].official.includes(event.target.value)
        || lang[1].common.includes(event.target.value)))

      const nameMatched = response.data.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()) 
        || country.name.official.toLowerCase().includes(event.target.value.toLowerCase()))
      
      const mergedCountries = [...new Set([...nativeMatched, ...nameMatched])]
      setFilteredCountries(mergedCountries)
    })
  }

  useEffect(() => {
    
    if (filteredCountries.length === 1) {
      axios
      .get(`http://api.weatherapi.com/v1/current.json?key=961b24099c7a4f60b72184802241712&q=${filteredCountries[0].capital}&aqi=no`)
      .then(response => {
        setWeatherData(response.data)
      })
    }
  }, [filteredCountries])
  
  const showCountry = country => {
    setFilteredCountries([country])
  }

  return (
    <>
      <form>
        <label>find countries</label>
        <input type="text" onChange={countryChange}/>
      </form>
      <Country result={filteredCountries} showCountry={showCountry} weatherData={weatherData}/>
    </>
  )
}

export default App