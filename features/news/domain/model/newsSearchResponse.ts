export interface NewsSearchResponseItem {
  title: string;
  snippet: string;
  source: string;
  link: string | null;
  published_at: string;
}

export interface NewsSearchResponse {
  articles: NewsSearchResponseItem[];
  page: number;
  page_size: number;
  total_count: number;
}
