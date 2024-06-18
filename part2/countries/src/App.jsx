import { useState, useEffect } from "react";
import CountryService from "./services/countries";
import WeatherService from "./services/weather";

function App() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState({
    temp: null,
    icon: null,
    wind: null,
  });

  useEffect(() => {
    CountryService.getCountries().then((response) => {
      const selectedCountries = response.data.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setResults(selectedCountries);
      if (selectedCountries.length === 1) {
        setCountry(selectedCountries[0]);
        WeatherService.getWeather(selectedCountries[0].capital[0]).then(
          (response) => {
            setWeather({
              temp: (response.data.main.temp - 273.15).toFixed(2),
              icon: WeatherService.getIcon(response.data.weather[0].icon),
              wind: response.data.wind.speed,
            });
          }
        );
      }
    });
  }, [search]);

  return (
    <div>
      find countries:
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {results.length === 1 ? (
        <div>
          <h1>{country.name.common}</h1>
          <div>capital {country.capital[0]}</div>
          <div>area {country.area}</div>
          <h2>languages:</h2>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt="flag" width="100" />\
          <h2>Weather in {country.capital[0]}</h2>
          <p>temperature {weather.temp} Celcius</p>
          <img src={weather.icon} alt="weather icon" width={120} />
          <p>wind {weather.wind} m/s</p>
        </div>
      ) : results.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        results.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button
              onClick={() => {
                setCountry(country);
                setResults([country]);
              }}
            >
              show
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
