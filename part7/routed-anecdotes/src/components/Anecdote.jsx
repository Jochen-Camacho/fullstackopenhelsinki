import { Link } from "react-router-dom";

const Anecdote = ({ anecdote }) => {
  if (!anecdote)
    return (
      <div>
        <br></br>
        No Anecdote Found
        <br></br>
      </div>
    );

  return (
    <div>
      <h1>
        {anecdote.content} by {anecdote.author}
      </h1>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <Link to={anecdote.info} target="_blank" />
      </p>
    </div>
  );
};

export default Anecdote;
