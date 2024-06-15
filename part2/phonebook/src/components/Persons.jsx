const Persons = ({ searchResults }) => {
  return (
    <div>
      {searchResults.length > 0
        ? searchResults.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))
        : "No results found"}
    </div>
  );
};

export default Persons;
