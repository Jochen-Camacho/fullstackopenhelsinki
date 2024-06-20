import { useState, useEffect } from "react";
import CountryService from "./services/countries";
import WeatherService from "./services/weather";
import WeatherInfo from "./components/WeatherInfo";
import CountryInfo from "./components/CountryInfo";
import CountryList from "./components/CountryList";

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
        getWeather(selectedCountries[0].capital[0]);
      }
    });
  }, [search]);

  const getWeather = (capital) => {
    WeatherService.getWeather(capital)
      .then((data) => {
        setWeather({
          temp: (data.main.temp - 273.15).toFixed(2),
          icon: WeatherService.getIcon(data.weather[0].icon),
          wind: data.wind.speed,
        });
      })
      .catch(console.log("Failed to get Weather Data"));
  };

  const handleCountryShow = () => {
    setCountry(country);
    setResults([country]);
  };

  return (
    <div>
      find countries:
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {results.length === 1 ? (
        <div>
          <CountryInfo
            name={country.name.common}
            capital={country.capital[0]}
            area={country.area}
            languages={Object.values(country.languages)}
            flag={country.flags.png}
          />
          <WeatherInfo
            capital={country.capital[0]}
            temp={weather.temp}
            icon={weather.icon}
            wind={weather.wind}
          />
        </div>
      ) : results.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <CountryList results={results} handleClick={handleCountryShow} />
      )}
    </div>
  );
}

export default App;
