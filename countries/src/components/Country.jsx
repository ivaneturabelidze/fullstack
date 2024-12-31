const Country = ({ result, showCountry, weatherData }) => {

    if(result.length > 10){
        return(
            <p>Please provide more specific filter</p>
        )
    }else if (result.length === 1) {
        const country = result[0]
        return(
            <>
                <h1>{country.name.common}</h1>
                <p>capital: {country.capital}</p>
                <p>area: {country.area}</p>
                <h3>Languages:</h3>
                <ul>
                    {Object.entries(country.languages).map(lang => (
                        <li key={lang[0]}>{lang[1]}</li>
                    ))}
                </ul>
                <p style={{ fontSize: '200px' , margin: 0, padding: 0}}>{country.flag}</p>
                <h2>Weather in {country.capital}</h2>
                {
                    weatherData.current && (
                        <>
                            <p>temperature: {weatherData.current.temp_c} celsius</p>
                            <p>wind speed: {weatherData.current.wind_kph} kph</p>
                        </>
                    )
                }
            </>
        )
    }else if (result.length === 0) {
        return(
            <p>No countries found with the filter</p>
        )
    }else {
        return(
            <>
                <ul>
                    {result.map(country => (
                        <div key={country.ccn3 + 'div'} style={{display: 'flex'}}>
                            <li key={country.ccn3}>{country.name.common}</li>
                            <button key={country.ccn3 + 'button'} onClick={() => showCountry(country)}>show</button>
                        </div>
                    ))}
                </ul>
            </>
        )
    }
}

export default Country