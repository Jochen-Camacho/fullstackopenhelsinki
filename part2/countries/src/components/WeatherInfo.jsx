const WeatherInfo = ({ capital, temp, icon, wind }) => {
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {temp} Celcius</p>
      <img src={icon} alt="weather icon" width={120} />
      <p>wind {wind} m/s</p>
    </div>
  );
};

export default WeatherInfo;
