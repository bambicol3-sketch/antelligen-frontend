import { httpClient } from "@/infrastructure/http/httpClient";
import type { ApiResponse } from "@/infrastructure/http/apiResponse";
import type { NewsSearchResponse } from "@/features/news/domain/model/newsSearchResponse";
import type { NewsArticle } from "@/features/news/domain/model/newsArticle";

export interface SaveArticleRequest {
  title: string;
  link: string;
  source?: string;
  published_at?: string;
  snippet?: string;
}

export interface BookmarkArticleResponse {
  article_id: number;
  saved_at: string;
}

// 저장된 기사 목록 조회에 사용되는 타입 (GET /news/saved)
export interface SavedArticleItem {
  article_id: number;
  title: string;
  link: string;
  source?: string;
  published_at?: string;
  snippet?: string;
  saved_at: string;
}

export interface SavedArticlesResult {
  articles: SavedArticleItem[];
  page: number;
  totalPages: number;
  totalCount: number;
}

export async function getSavedArticles(page: number, pageSize: number): Promise<SavedArticlesResult> {
  const { data } = await httpClient<ApiResponse<{ articles: SavedArticleItem[]; page: number; page_size: number; total_count: number }>>(
    `/api/v1/news/saved?page=${page}&page_size=${pageSize}`
  );
  return {
    articles: data.articles,
    page: data.page,
    totalPages: Math.max(1, Math.ceil(data.total_count / pageSize)),
    totalCount: data.total_count,
  };
}

/** 인증된 사용자가 저장한 관심 기사를 삭제 (DELETE /api/v1/news/bookmark/{id}) */
export async function deleteBookmark(articleId: number): Promise<void> {
  await httpClient<void>(`/api/v1/news/bookmark/${articleId}`, { method: "DELETE" });
}

/** 인증된 사용자가 관심 기사를 저장 (POST /api/v1/news/bookmark, 사용자+링크 기반 중복 체크) */
export async function saveArticle(req: SaveArticleRequest): Promise<BookmarkArticleResponse> {
  const { data } = await httpClient<ApiResponse<BookmarkArticleResponse>>("/api/v1/news/bookmark", {
    method: "POST",
    body: JSON.stringify(req),
  });
  return data;
}

export interface NewsSearchResult {
  articles: NewsArticle[];
  page: number;
  totalPages: number;
  totalCount: number;
}

export async function searchNews(keyword: string, page: number, pageSize: number): Promise<NewsSearchResult> {
  const { data } = await httpClient<ApiResponse<NewsSearchResponse>>(
    `/api/v1/news/search?keyword=${encodeURIComponent(keyword)}&page=${page}&page_size=${pageSize}`
  );

  const articles: NewsArticle[] = (data.articles ?? []).map((item, index) => ({
    newsId: index,
    title: item.title,
    content: item.snippet,
    source: item.source,
    url: item.link ?? "",
    publishedAt: item.published_at,
  }));

  const totalPages = Math.max(1, Math.ceil(data.total_count / pageSize));

  return {
    articles,
    page: data.page,
    totalPages,
    totalCount: data.total_count,
  };
}
