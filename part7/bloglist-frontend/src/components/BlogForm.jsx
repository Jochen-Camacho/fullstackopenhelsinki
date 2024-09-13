import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
      <Form onSubmit={handleBlogCreateLocal}>
        <Form.Group>
          <Form.Label>
            Title:
            <Form.Control
              type="text"
              name="Title"
              id="Title"
              data-testid="Title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Author:
            <Form.Control
              type="text"
              name="Author"
              id="Author"
              data-testid="Author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Url:
            <Form.Control
              type="text"
              name="Url"
              value={url}
              id="Url"
              data-testid="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Form.Label>
        </Form.Group>
        <Button type="submit" id="create-btn">
          Create
        </Button>
      </Form>
      <br></br>
    </div>
  );
};

export default BlogForm;
