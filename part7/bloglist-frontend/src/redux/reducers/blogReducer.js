import { createSlice } from '@reduxjs/toolkit';
import blogService from '../../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    setBlogs(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      return state.filter((b) => b.id !== action.payload);
    },
    updateBlog(state, action) {
      return state
        .map((b) => {
          if (b.id === action.payload.id) return action.payload;
          else return b;
        })
        .sort((a, b) => b.likes - a.likes);
    },
  },
});

export const { appendBlog, setBlogs, deleteBlog, updateBlog } =
  blogSlice.actions;
export default blogSlice.reducer;

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(sortedBlogs));
  };
};

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blogId);
    dispatch(deleteBlog(blogId));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog);
    dispatch(updateBlog(updatedBlog));
  };
};
