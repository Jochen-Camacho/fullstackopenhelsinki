const Persons = ({ searchResults, handleDel }) => {
  return (
    <div>
      {searchResults.length > 0
        ? searchResults.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}{" "}
              <button onClick={() => handleDel(person.id)}>Delete</button>
            </p>
          ))
        : "No results found"}
    </div>
  );
};

export default Persons;
