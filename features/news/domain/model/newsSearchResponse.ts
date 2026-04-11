export interface NewsSearchResponseItem {
  news_id: string;
  title: string;
  content: string;
  source: string;
  url: string;
  published_at: string;
}

export interface NewsSearchResponse {
  news_list: NewsSearchResponseItem[];
  page: number;
  total_pages: number;
  total_count: number;
}
