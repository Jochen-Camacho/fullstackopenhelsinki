import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Blog = ({ blog, handleUpdate, handleDelete, userId }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!visible);
  const blogStyles = {
    border: '1px solid black',
    padding: '2px',
    display: 'flex',
    flexDirection: 'column',
    margin: '4px 0 0 0',
  };

  const handleLike = async () => {
    await handleUpdate({
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
    });
  };

  const handleDeleteInner = async (blogId) => {
    try {
      if (blog.user.id === userId) {
        window.confirm(`Remove blog: ${blog.title} by ${blog.author}`) &&
          (await handleDelete(blogId));
      } else {
        alert('You are not authorized to remove this blog!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={blogStyles}>
      <div className="blog">
        <Link to={`/blogs/${blog.id}`}>
          <span className="blogTitle">{blog.title}</span> {blog.author}{' '}
        </Link>
        <Button
          variant="primary"
          id="display-btn"
          className="showBtn"
          onClick={toggleVisibility}
        >
          {visible ? 'Hide' : 'View'}
        </Button>
        {visible && (
          <div>
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
            <p>
              Likes: <span className="blogLikes">{blog.likes}</span>
              <button id="like-btn" className="likeBtn" onClick={handleLike}>
                like
              </button>
            </p>
            <p>{blog.user.username}</p>
            {userId === blog.user.id && (
              <button onClick={() => handleDeleteInner(blog.id)}>Remove</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

export default Blog;
