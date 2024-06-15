const PersonForm = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  handleOnSubmit,
}) => {
  return (
    <form>
      <div>
        name:
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <br></br>
        number:
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={handleOnSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
