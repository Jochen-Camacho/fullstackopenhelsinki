import axios from "axios";
const baseURl = "http://localhost:3002/anecdotes";

const getAll = () => {
  const response = axios.get(baseURl);
  return response.then((r) => r.data);
};

const createAncedote = (content) => {
  const obj = {
    content,
    votes: 0,
  };

  const response = axios.post(baseURl, obj);

  return response.then((r) => r.data);
};

const updateAnecdote = (obj) => {
  const response = axios.put(`${baseURl}/${obj.id}`, obj);
  return response.then((r) => r.data);
};

export default { getAll, createAncedote, updateAnecdote };
