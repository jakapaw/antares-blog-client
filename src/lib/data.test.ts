import { describe, expect, test } from "@jest/globals";
import {
  getAllArticle,
  getAllCategory,
  getArticle,
  getArticlesByCategory,
  getAuthor,
  groupArticlesByCategory,
  searchArticle,
} from "./data";

// TODO: Create environtment for integration test

describe("test all data units", () => {
  test("should get all category", async () => {
    const categories = await getAllCategory();
    expect(categories.length).toBeGreaterThan(0);
  });

  test("should get all articles", async () => {
    const articles = await getAllArticle();
    expect(articles.length).toBeGreaterThan(0);
  });

  test("should group articles by each category", async () => {
    const articles = await groupArticlesByCategory(getAllArticle());
    if (!articles) throw new Error();
    expect(articles.size).not.toBe(0);
    articles.keys().forEach((key) => {
      expect(articles.get(key)?.length).not.toBe(0);
    });
  });

  test("should get article by its slug", async () => {
    const article = await getArticle("article-1");
    expect(article.title).not.toBe(null);
  });

  test("should get author by its slug", async () => {
    const author = await getAuthor("captainjack1");
    expect(author[0].fullname).not.toBe(null);
  });

  test("when search by keyword, then return array articles", async () => {
    const articles = await searchArticle("N");
    expect(articles.length).toBeGreaterThan(0);
  });

  test("should get articles by a category", async () => {
    const result = await getArticlesByCategory("Computer Science");
    expect(result).not.toBeNull();
  });
});
