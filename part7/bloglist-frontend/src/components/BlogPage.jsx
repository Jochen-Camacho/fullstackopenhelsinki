import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const { id } = useParams();
  const blogs = useSelector((s) => s.blogs);
  const blog = blogs.find((b) => b.id === id);
  if (!blog) return <h1>No Blog Found for {id}</h1>;
  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <Link to={blog.url} target="_blank">
        {blog.url}
      </Link>
      <p>
        {blog.likes} likes <button>like</button>
      </p>
      <p>added by {blog.user.name}</p>
    </div>
  );
};

export default BlogPage;
