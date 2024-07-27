import React, { useState } from 'react';

const BlogForm = ({ handleBlogCreate }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleBlogCreateLocal = async (e) => {
    e.preventDefault();
    try {
      const blog = { title, author, url };
      await handleBlogCreate(blog);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Create</h1>
      <form onSubmit={handleBlogCreateLocal}>
        <div>
          <label>
            Title:
            <input
              type="text"
              name="Title"
              id="Title"
              data-testid="Title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              type="text"
              name="Author"
              id="Author"
              data-testid="Author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Url:
            <input
              type="text"
              name="Url"
              value={url}
              id="Url"
              data-testid="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit" id="create-btn">
          Create
        </button>
      </form>
      <br></br>
    </div>
  );
};

export default BlogForm;
