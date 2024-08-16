import { useState } from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import About from "./components/About";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import Footer from "./components/Footer";
import CreateNew from "./components/CreateNew";
import Anecdote from "./components/Anecdote";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState(null);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const displayNoti = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const match = useMatch("/anecdotes/:id");

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const anecdote = match ? anecdoteById(Number(match.params.id)) : null;

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id);

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1,
  //   };

  //   setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  // };
  console.log(notification);

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification !== null && notification}
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/create"
          element={<CreateNew addNew={addNew} setNotification={displayNoti} />}
        />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
