import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addAncedote(state, action) {
      return [...state, action.payload];
    },
    voteOn(state, action) {
      return state.map((a) =>
        a.id === action.payload.id ? action.payload : a
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteOn, addAncedote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAncedote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAncedote(content);
    dispatch(addAncedote(newAnecdote));
  };
};

export const voteOnAnecdote = (prevAnecdote) => {
  return async (dispatch) => {
    const newAnecdote = {
      ...prevAnecdote,
      votes: prevAnecdote.votes + 1,
    };
    anecdoteService.updateAnecdote(newAnecdote);
    dispatch(voteOn(newAnecdote));
  };
};
