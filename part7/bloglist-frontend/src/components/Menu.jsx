import React from 'react';
import { removeUser } from '../redux/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);
  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(removeUser());
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/blogs">Blogs</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {user.name} logged in{' '}
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
