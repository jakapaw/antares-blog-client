import Article from "@/model/article";
import Author from "@/model/author";
import Brand from "@/model/brand";
import Category from "@/model/category";
import { notFound } from "next/navigation";
import qs from "qs";
import { SERVER_URL } from "./config";

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
  const url = new URL("api/categories/", SERVER_URL);
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
    populate: [
      "category",
      "cover_image",
      "authors"
    ],
    filters: {
      category: {
        id: {
          $in: categoryIds,
        },
      },
    }
  });
  const url = new URL(
    `api/articles?${queryString}`,
    SERVER_URL
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

export async function groupArticlesByCategory(articles?: Promise<Article[]>): Promise<
  Map<string, Article[]> | undefined
> {
  const articlesByCategory: Map<string, Article[]> = new Map();
  
  if (!articles) return;

  for (const article of await articles) {
    if (articlesByCategory.has(article.category.name)) {
      articlesByCategory.get(article.category.name)?.push(article);
    } else {
      articlesByCategory.set(article.category.name, [article]);
    }
  }
  return articlesByCategory;
}

export async function getArticle(slug: string): Promise<Article> {
  const url = new URL(`api/articles/${slug}`, SERVER_URL);
  return fetch(url).then(
    (response) => {
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
    }).then((body) => {
      const article = (body as Article[]).at(0);
      if (!article) {
        throw new EmptyResponse(
          getAllCategory.name,
          `Empty response from ${url.href}`
        );
      }
      return article;
    })
}

export async function getAuthor(slug: string): Promise<Author[]> {
  const queryString = qs.stringify({
    populate: ["profile_photo", "social_media", "other_link"]
  });
  const url = new URL(`api/profiles/${slug}?${queryString}`, SERVER_URL);
  return fetch(url).then((response) => {
    // handle status code except 200
    switch (response.status) {
      case 401:
        throw new UnauthorizedError(
          getAllArticle.name,
          "Unauthorized access to /authors"
        );
      case 404:
        throw notFound;
    }
    return response.json();
  }).then((body) => {
    const author = body as Author[];
    if (!author) {
      throw new EmptyResponse(
        getAuthor.name,
        `Empty response from ${url.href}`
      )
    }
    return author;
  });
}

export async function getBrandInfo(): Promise<Brand> {
  const queryString = qs.stringify({
    populate: ["main_logo", "authors.profile_photo"]
  })
  const url = new URL(`/api/brand?${queryString}`, SERVER_URL);

  return fetch(url).then((response) => {
    // handle status code except 200
    switch (response.status) {
      case 401:
        throw new UnauthorizedError(
          getBrandInfo.name,
          "Unauthorized access to /authors"
        );
      case 404:
        throw notFound;
    }
    return response.json();
  }).then((body) => {
    const aboutUs = body.data as Brand;
    if (!aboutUs) {
      throw new EmptyResponse(
        getAuthor.name,
        `Empty response from ${url.href}`
      )
    }
    return aboutUs;
  });
}

export async function searchArticle(key: string): Promise<Article[]> {
  const url = new URL(`/api/search?key=${key}`, SERVER_URL);
  return fetch(url).then((response) => {
    // handle status code except 200
    switch (response.status) {
      case 401:
        throw new UnauthorizedError(
          searchArticle.name,
          "Unauthorized access to /search"
        );
      case 404:
        throw notFound;
    }
    return response.json();
  }).then((body) => {
    const articles = body as Article[];
    if (!articles) {
      throw new EmptyResponse(searchArticle.name, "No article found");
    }
    return articles;
  });
}

export async function getArticlesByCategory(categoryName: string) {
  const queryString = qs.stringify({
    filters: {
      name: {
        $eq: categoryName.replaceAll("%20", " ")
      }
    },
    populate: {
      articles: {
        populate: ["cover_image", "authors"],
        fields: {
          0: "id",
          1: "title",
          2: "updatedAt"
        }
      }
    }
  });
  const url = new URL(`/api/categories?${queryString}`, SERVER_URL);
  return fetch(url).then((response) => {
    // handle status code except 200
    switch (response.status) {
      case 401:
        throw new UnauthorizedError(
          getBrandInfo.name,
          "Unauthorized access to /authors"
        );
      case 404:
        throw notFound;
    }
    return response.json();
  }).then((body) => {
    const articles: Article[] = body.data[0].articles as Article[];
    const category: Category = {
      id: body.data[0].id,
      name: body.data[0].name,
      description: body.data[0].description,
      articles
    };
    return category;
  });
}