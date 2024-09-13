import React, { useRef } from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Toggleable from './Toggleable';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNotification,
  timeoutNotification,
} from '../redux/reducers/notificationReducer';
import { addBlog, removeBlog, likeBlog } from '../redux/reducers/blogReducer';
import Table from 'react-bootstrap/Table';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const blogFormRef = useRef(null);

  const handleBlogCreate = async (blog) => {
    try {
      dispatch(addBlog(blog));

      dispatch(
        setNotification({
          message: `A new blog ${blog.title} by ${blog.author} added`,
          type: 'message',
        })
      );
      dispatch(timeoutNotification());

      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.error('Error creating blog:', error);

      dispatch(
        setNotification({
          message: 'Failed to create blog',
          type: 'error',
        })
      );
      dispatch(timeoutNotification());
    }
  };

  const handleBlogUpdate = async (blogObj) => {
    try {
      dispatch(likeBlog(blogObj));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      dispatch(removeBlog(blogId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toggleable label="new blog" ref={blogFormRef}>
        <BlogForm handleBlogCreate={handleBlogCreate} />
      </Toggleable>
      <Table striped>
        {blogs.map((b) => (
          <Blog
            key={b.id}
            blog={b}
            handleUpdate={handleBlogUpdate}
            handleDelete={handleDelete}
            userId={user.id}
          />
        ))}
      </Table>
    </div>
  );
};

export default Blogs;
