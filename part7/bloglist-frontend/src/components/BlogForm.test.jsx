import { render, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm /> event handler test', async () => {
  const mockHandler = vi.fn();

  const container = render(
    <BlogForm handleBlogCreate={mockHandler} />
  ).container;

  const user = userEvent.setup();

  const titleI = container.querySelector('#Title');
  const authorI = container.querySelector('#Author');
  const urlI = container.querySelector('#Url');
  const button = container.querySelector('#create-btn');

  await user.type(titleI, 'Title Typed');
  await user.type(authorI, 'Author Typed');
  await user.type(urlI, 'Url Typed');

  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
  console.log(mockHandler.mock.calls);
  expect(mockHandler.mock.calls[0][0].title).toBe('Title Typed');
  expect(mockHandler.mock.calls[0][0].author).toBe('Author Typed');
  expect(mockHandler.mock.calls[0][0].url).toBe('Url Typed');
});
