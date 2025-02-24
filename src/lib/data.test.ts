import { describe, expect, test } from "@jest/globals";
import {
  getAllArticle,
  getAllCategory,
  getArticlesGroupByCategory,
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
    const articles = await getArticlesGroupByCategory();
    expect(articles.size).toBe(1);
    expect(articles.get("Computer Science")?.length).toBe(1);
  });
});
