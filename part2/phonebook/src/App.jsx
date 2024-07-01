import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import PhonebookService from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState([...persons]);
  const [message, setMessage] = useState({
    text: null,
    type: null,
  });

  useEffect(() => {
    PhonebookService.getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        console.log("Failed to fetch data: ", error);
      });
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (persons.map((person) => person.name).includes(newName)) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace teh old number with a new one?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        console.log("updating number for: ", newName);
        const newPerson = { ...person, number: newNumber };
        console.log("newPerson: ", newPerson);
        PhonebookService.update(newPerson.id, newPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== response.id ? person : response
              )
            );
          })
          .catch((error) => {
            console.log("Failed to update person: ", error);
          });
      }
      return;
    }

    PhonebookService.create({ name: newName, number: newNumber })
      .then((response) => {
        setPersons([...persons, response]);
        setMessage({ text: `Added ${response.name}`, type: "message" });
      })
      .catch((error) => {
        console.log("Failed to add new person: ", error);
        setMessage({ text: error.response.data.error, type: "error" });
      });

    setNewName("");
    setNewNumber("");
  };

  const handleDeleteClick = (id) => {
    console.log("deleting user: ", id);
    const person = persons.find((person) => person.id === id);
    console.log("person: ", person);
    if (confirm(`Delete ${person.name} ?`)) {
      PhonebookService.deletePerson(id)
        .then(() => {
          const newPersons = persons.filter((person) => person.id !== id);
          console.log("newPersons: ", newPersons);
          setPersons(newPersons);
          setMessage({ text: `Deleted ${person.name}`, type: "message" });
        })
        .catch((error) => {
          setMessage({
            text: `Information of ${person.name} has already been removed from the server`,
            type: "error",
          });
          console.log("Failed to delete person: ", error);
        });
    }
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
      <Notification message={message.text} type={message.type} />
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
      <Persons searchResults={filteredPersons} handleDel={handleDeleteClick} />
    </div>
  );
}

export default App;
