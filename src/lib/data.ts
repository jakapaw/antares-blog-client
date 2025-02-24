import Article from "@/model/article";
import Category from "@/model/category";
import { notFound } from "next/navigation";
import qs from "qs";

const BASE_URL = new URL(
  "/",
  process.env.SERVER_URL || "http://localhost:1337"
);

class UnauthorizedError extends Error {
  constructor(fn: string, msg: string, cause?: unknown, stack?: string) {
    super();
    this.message = `[ERROR] ${fn}: ${msg}`;
    this.cause = cause;
    this.stack = stack;
  }
}

class EmptyResponse extends Error {
  constructor(fn: string, msg: string, cause?: unknown, stack?: string) {
    super();
    this.message = `[ERROR] ${fn}: ${msg}`;
    this.cause = cause;
    this.stack = stack;
  }
}

export async function getAllCategory(): Promise<Category[]> {
  const url = new URL("api/categories/", BASE_URL);
  return fetch(url)
    .then((response) => {
      switch (response.status) {
        case 401:
          throw new UnauthorizedError(
            getAllCategory.name,
            "Unauthorized access to /categories"
          );
      }
      return response.json();
    })
    .then((body) => {
      if (body) return body.data as Category[];
      else
        throw new EmptyResponse(
          getAllCategory.name,
          "Empty response from /categories"
        );
    });
}

export async function getAllArticle(): Promise<Article[]> {
  // get an array of category ids
  const categoryIds: number[] = await getAllCategory()
    .then((categories) => {
      return categories.map((cat) => cat.id);
    })
    .catch((reason) => {
      console.log(reason);
      return [];
    });

  const queryString = qs.stringify({
    filters: {
      category: {
        id: {
          $in: categoryIds,
        },
      },
    },
  });
  const url = new URL(
    `api/articles?populate=category&${queryString}`,
    BASE_URL
  );

  return fetch(url)
    .then((response) => {
      // handle status code except 200
      switch (response.status) {
        case 401:
          throw new UnauthorizedError(
            getAllArticle.name,
            "Unauthorized access to /articles"
          );
        case 404:
          throw notFound;
      }
      return response.json();
    })
    .then((body) => {
      if (body) {
        return body.data as Article[];
      } else {
        throw new EmptyResponse(
          getAllCategory.name,
          "Empty response from /articles"
        );
      }
    });
}

export async function getArticlesGroupByCategory(): Promise<
  Map<string, Article[]>
> {
  const articles = await getAllArticle();
  const articlesByCategory: Map<string, Article[]> = new Map();

  for (const article of articles) {
    if (articlesByCategory.has(article.category.name)) {
      articlesByCategory.get(article.category.name)?.push(article);
    } else {
      articlesByCategory.set(article.category.name, [article]);
    }
  }
  return articlesByCategory;
}
