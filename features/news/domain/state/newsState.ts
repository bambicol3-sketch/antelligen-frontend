import type { NewsArticle } from "@/features/news/domain/model/newsArticle";

export type NewsState =
  | { status: "LOADING" }
  | { status: "UNAUTHENTICATED" }
  | { status: "ERROR"; message: string }
  | {
      status: "SUCCESS";
      articles: NewsArticle[];
      page: number;
      totalPages: number;
      totalCount: number;
    };
