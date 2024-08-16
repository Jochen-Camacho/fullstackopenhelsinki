import React from 'react';
import { removeUser } from '../redux/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);
  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(removeUser());
  };

  return (
    <div>
      <div>
        <Link to="/blogs">blogs</Link> <Link to="/users">users</Link>~{' '}
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </div>
      <h2>Blog App</h2>
    </div>
  );
};

export default Menu;
