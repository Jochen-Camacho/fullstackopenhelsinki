const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");
const { timeout } = require("../playwright.config");
const assert = require("assert");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "useracc",
        password: "userpass",
        username: "useracc",
      },
    });

    await request.post("/api/users", {
      data: {
        name: "useracc2",
        password: "userpass2",
        username: "useracc2",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await page.getByText("Login Page").isVisible();
    await page.getByTestId("Username").isVisible();
    await page.getByTestId("Password").isVisible();
  });

  describe("login process", () => {
    test("successful login", async ({ page }) => {
      await loginWith(page, "useracc", "userpass");

      await page.getByText("Blogs").isVisible();
    });

    test("failed login", async ({ page }) => {
      await loginWith(page, "qwert", "12345");

      await page.getByText("Blogs").isHidden();
    });
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "useracc", "userpass");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "First Blog", "First Author", "www.url.com");
    });

    describe("when blog exists", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, "First Blog", "First Author", "www.url.com");
      });

      test("blog can be liked", async ({ page }) => {
        await page.getByRole("button", { name: "View" }).isVisible();
        await page.getByRole("button", { name: "View" }).click();

        await page.getByRole("button", { name: "like" }).click();

        await page.getByText("Likes 1").isVisible();
      });

      test("use who added a blog can delete it", async ({ page }) => {
        await expect(page.getByText("First Blog First Author")).toBeVisible();
        await page.getByRole("button", { name: "View" }).click();

        page.on("dialog", (dialog) => {
          dialog.accept();
        });

        await page.getByRole("button", { name: "Remove" }).click();

        await page.waitForLoadState("networkidle");

        await page.waitForTimeout(1000);

        await expect(page.getByText("First Blog First Author")).toBeHidden({
          timeout: 5000,
        });
      });

      test("use who did not add a blog cannot delete it", async ({ page }) => {
        await page.getByRole("button", { name: "Logout" }).click();

        await loginWith(page, "useracc2", "userpass2");

        await expect(page.getByText("First Blog First Author")).toBeVisible();
        await page.getByRole("button", { name: "View" }).click();

        page.on("dialog", (dialog) => {
          dialog.accept();
        });

        await expect(page.getByRole("button", { name: "Remove" })).toBeHidden();
      });

      describe("when multiple blogs exist", () => {
        test("blogs are sorted by likes", async ({ page }) => {
          await createBlog(page, "Second Blog", "Second Author", "www.url.com");
          await createBlog(page, "Third Blog", "Third Author", "www.url.com");
          await createBlog(page, "Forth Blog", "Forth Author", "www.url.com");
          const locator = await page.locator(".blog");
          const blogs = await locator.evaluateAll(async (blogs) => {
            timeout = 30000;
            const result = [];
            for (const b of blogs) {
              await b.querySelector(".showBtn").click();
              const likeAmt = Math.floor(Math.random() * 4);
              console.log(likeAmt);
              for (let i = 0; i < likeAmt; i++) {
                await b.querySelector(".likeBtn").click();
                await new Promise((resolve) => setTimeout(resolve, 500));
              }
              result.push({
                title: b.querySelector(".blogTitle").textContent,
                likes: b.querySelector(".blogLikes").textContent,
              });
            }
            return result;
          });
          console.log(blogs);
          const sortedOldBlogs = blogs.sort((a, b) => b.likes - a.likes);

          const likedBlogsElements = await page.locator(".blog");
          const likedBlogs = await likedBlogsElements.evaluateAll(
            async (blogs) =>
              blogs.map((b) => ({
                title: b.querySelector(".blogTitle").textContent,
                likes: b.querySelector(".blogLikes").textContent,
              }))
          );
          console.log(likedBlogs);

          expect(assert.deepStrictEqual(sortedOldBlogs, likedBlogs));
        });
      });
    });
  });
});
