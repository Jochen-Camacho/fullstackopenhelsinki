import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const UserPage = () => {
  const users = useSelector((state) => state.users);
  const { id } = useParams();

  const user = users.find((u) => {
    return u.id === id;
  });

  if (!user) {
    return <h1>User not found</h1>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((b) => {
          return <li key={b.id}>{b.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default UserPage;
