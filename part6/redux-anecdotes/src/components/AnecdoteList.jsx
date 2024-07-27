import { useSelector, useDispatch } from "react-redux";
import { voteOnAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    console.log(state);
    console.log(state.filter);
    const sortedAnecdotes = [...state.anecdotes].sort(
      (a, b) => b.votes - a.votes
    );
    const filteredAnecdotes = sortedAnecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    );
    return filteredAnecdotes;
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id);
    dispatch(voteOnAnecdote(anecdote));
    const newAnecdote = anecdotes.find((a) => a.id === id);
    dispatch(setNotification(`you voted ${newAnecdote.content}`, 5));
  };
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
