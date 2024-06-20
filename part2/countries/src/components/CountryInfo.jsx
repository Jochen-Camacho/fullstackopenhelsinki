const CountryInfo = ({ name, capital, area, languages, flag }) => {
  return (
    <div>
      <h1>{name}</h1>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <h2>languages:</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flag} alt="flag" width="100" />
    </div>
  );
};

export default CountryInfo;
