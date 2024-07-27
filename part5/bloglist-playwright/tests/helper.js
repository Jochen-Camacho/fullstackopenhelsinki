const loginWith = async (page, username, password) => {
  await page.getByTestId("Username").fill(username);
  await page.getByTestId("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "new blog" }).click();
  await page.getByRole("heading", { name: "Create" }).isVisible();

  await page.getByTestId("Title").fill(title);
  await page.getByTestId("Author").fill(author);
  await page.getByTestId("Url").fill(url);

  await page.getByRole("button", { name: "Create" }).click();

  await page.waitForLoadState("networkidle");

  await page.getByText(`${title} ${author}`).waitFor();
};

module.exports = { loginWith, createBlog };
