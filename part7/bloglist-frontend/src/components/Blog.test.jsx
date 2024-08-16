import { findByText, render, screen } from '@testing-library/react';
import Blog from './Blog';
import { beforeEach, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('<Blog />', () => {
  const blog = {
    title: 'My Blog',
    author: 'This Author',
    likes: 0,
    url: 'www.website.com',
    id: '123',
    user: {
      id: '456',
      username: 'John',
      name: 'Johnny',
    },
  };

  let container;

  const mockHandler = vi.fn();

  beforeEach(
    () =>
      (container = render(
        <Blog blog={blog} handleUpdate={mockHandler} />
      ).container)
  );

  test('Blog renders to the screen with title and author', async () => {
    screen.debug();

    const title = screen.queryByText('My Blog');
    expect(title).toBeDefined();

    const author = screen.queryByText('This Author');
    expect(author).toBeDefined();

    const url = screen.queryByText('www.website.com');
    expect(url).toBeNull();
  });

  test('Blog view button displays additional information', async () => {
    const user = userEvent.setup();
    const button = container.querySelector('#display-btn');
    await user.click(button);

    const url = screen.queryByText('www.website.com');
    expect(url).toBeDefined();

    const likes = screen.queryByText('0');
    expect(likes).toBeDefined();
  });

  test('double click like', async () => {
    const user = userEvent.setup();

    const displayButton = container.querySelector('#display-btn');
    await user.click(displayButton);

    const button = container.querySelector('#like-btn');
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
    console.log(mockHandler.mock.calls);
  });
});
