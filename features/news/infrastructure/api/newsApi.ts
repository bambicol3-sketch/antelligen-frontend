import { httpClient } from "@/infrastructure/http/httpClient";
import type { ApiResponse } from "@/infrastructure/http/apiResponse";
import type { NewsSearchResponse } from "@/features/news/domain/model/newsSearchResponse";
import type { NewsArticle } from "@/features/news/domain/model/newsArticle";

export interface NewsSearchResult {
  articles: NewsArticle[];
  page: number;
  totalPages: number;
  totalCount: number;
}

export async function searchNews(page: number, size: number): Promise<NewsSearchResult> {
  const { data } = await httpClient<ApiResponse<NewsSearchResponse>>(
    `/news/search?page=${page}&size=${size}`
  );

  const articles: NewsArticle[] = data.news_list.map((item) => ({
    newsId: item.news_id,
    title: item.title,
    content: item.content,
    source: item.source,
    url: item.url,
    publishedAt: item.published_at,
  }));

  return {
    articles,
    page: data.page,
    totalPages: data.total_pages,
    totalCount: data.total_count,
  };
}
