import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const Users = () => {
  const users = useSelector((s) => s.users);

  return (
    <div>
      <h1>Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name} </Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
