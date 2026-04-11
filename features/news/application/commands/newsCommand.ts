import type { NewsIntent } from "@/features/news/domain/intent/newsIntent";
import { searchNews } from "@/features/news/infrastructure/api/newsApi";

type NewsCommandHandler = (intent: NewsIntent) => ReturnType<typeof searchNews>;

export const newsCommand: Record<NewsIntent["type"], NewsCommandHandler> = {
  FETCH_NEWS_PAGE: (intent) => searchNews(intent.keyword, intent.page, intent.pageSize),
};
