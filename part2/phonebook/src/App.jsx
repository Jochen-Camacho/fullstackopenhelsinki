import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState([...persons]);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("persons", persons);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("old persons", persons);
    console.log("newName", newName);
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPersonsList = [...persons, { name: newName, number: newNumber }];
    setPersons(newPersonsList);
    console.log("new persons", newPersonsList);
    setNewName("");
    setNewNumber("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredPersons = searchTerm
    ? persons.filter((person) => person.name.toLowerCase().includes(searchTerm))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleOnSubmit={handleOnSubmit}
      />
      <h2>Numbers</h2>
      <Persons searchResults={filteredPersons} />
    </div>
  );
}

export default App;
