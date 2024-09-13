import React, { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import './index.css';
import { fetchUsers } from './redux/reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNotification,
  timeoutNotification,
} from './redux/reducers/notificationReducer';
import { fetchBlogs } from './redux/reducers/blogReducer';
import { loginUser, setUser } from './redux/reducers/userReducer';
import { Route, Routes } from 'react-router';
import Users from './components/Users';
import UserPage from './components/UserPage';
import Blogs from './components/Blogs';
import BlogPage from './components/BlogPage';
import Menu from './components/Menu';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInBlogAppUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const handleLogin = async (username, password) => {
    try {
      const user = await dispatch(loginUser(username, password));
      console.log(user);
      if (!user) throw new Error('Login failed');
      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user));
    } catch (error) {
      dispatch(
        setNotification({
          message: 'Invalid Username or Password',
          type: 'error',
        })
      );
      dispatch(timeoutNotification());
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Notification />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <>
          <Menu />
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogPage />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
