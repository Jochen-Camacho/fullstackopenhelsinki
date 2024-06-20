const CountryList = ({ results, handleClick }) => {
  return (
    <div>
      {results.map((country) => (
        <div key={country.name.common}>
          {country.name.common} <button onClick={handleClick}>show</button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
