export const Filter = ({ handleSearchChange }) => {
  return (
    <div>
      filter shown with
      <input onChange={handleSearchChange} />
    </div>
  );
};
