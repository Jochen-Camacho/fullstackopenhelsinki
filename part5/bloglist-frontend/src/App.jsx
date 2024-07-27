import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import './index.css';
import Toggleable from './components/Toggleable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });
  const blogFormRef = useRef(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInBlogAppUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleBlogCreate = async (blog) => {
    try {
      const returnedBlog = await blogService.create(blog);
      console.log('Blog created:', returnedBlog);

      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
      setNotification({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        type: 'message',
      });
      setTimeout(() => {
        setNotification({
          message: null,
          type: null,
        });
      }, 5000);
      console.log('Before toggleVisibility');
      blogFormRef.current.toggleVisibility();
      console.log('After toggleVisibility');
    } catch (error) {
      console.error('Error creating blog:', error);
      setNotification({
        message: 'Failed to create blog',
        type: 'error',
      });
      setTimeout(() => {
        setNotification({
          message: null,
          type: null,
        });
      }, 5000);
    }
  };

  const handleBlogUpdate = async (blogObj) => {
    try {
      const blog = await blogService.update(blogObj);
      const tempBlogs = blogs
        .map((b) => {
          if (b.id === blog.id) return blog;
          else return b;
        })
        .sort((a, b) => b.likes - a.likes);
      setBlogs(tempBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      if (!user) throw new Error('Login failed');
      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
    } catch (error) {
      setNotification({
        message: 'Invalid Username or Password',
        type: 'error',
      });
      setTimeout(() => {
        setNotification({
          message: null,
          type: null,
        });
      }, 5000);
      console.log(error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId);
      setBlogs(blogs.filter((b) => b.id !== blogId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    blogService.setToken('');
  };

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <>
          <h2>Blogs</h2>
          <div>
            ~ {user.name} logged in{' '}
            <button onClick={handleLogout}>Logout</button>
          </div>

          <Toggleable label="new blog" ref={blogFormRef}>
            <BlogForm handleBlogCreate={handleBlogCreate} />
          </Toggleable>

          {blogs.map((b) => (
            <Blog
              key={b.id}
              blog={b}
              handleUpdate={handleBlogUpdate}
              handleDelete={handleDelete}
              userId={user.id}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
