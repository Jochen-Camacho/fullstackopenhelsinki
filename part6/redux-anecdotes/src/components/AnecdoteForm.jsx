import { useDispatch } from "react-redux";
import { createAncedote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAncedote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    dispatch(createAncedote(content));
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addAncedote}>
        <input name="content" />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
