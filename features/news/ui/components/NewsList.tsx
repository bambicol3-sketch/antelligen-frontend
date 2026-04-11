"use client";

import { useNewsList } from "@/features/news/application/hooks/useNewsList";
import { newsListStyles as s } from "@/features/news/ui/components/newsListStyles";

export default function NewsList() {
  const { newsState, page, goToPage } = useNewsList();

  if (newsState.status === "LOADING") {
    return (
      <div className={s.card}>
        <p className={s.loading}>뉴스를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (newsState.status === "UNAUTHENTICATED") {
    return (
      <div className={s.card}>
        <p className={s.error}>로그인이 필요한 서비스입니다.</p>
      </div>
    );
  }

  if (newsState.status === "ERROR") {
    return (
      <div className={s.card}>
        <p className={s.error}>{newsState.message}</p>
      </div>
    );
  }

  const { articles, totalPages } = newsState;

  if (articles.length === 0) {
    return (
      <div className={s.card}>
        <p className={s.empty}>표시할 뉴스가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={s.card}>
      <ul className={s.list}>
        {articles.map((article) => (
          <li key={article.newsId} className={s.item.wrap}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={s.item.title}
            >
              {article.title}
            </a>
            <div className={s.item.meta}>
              <span className={s.item.source}>{article.source}</span>
              <span>{new Date(article.publishedAt).toLocaleDateString("ko-KR")}</span>
            </div>
            <p className={s.item.content}>{article.content}</p>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className={s.pagination.wrap}>
          <button
            className={s.pagination.button}
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
          >
            이전
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
            p === page ? (
              <span key={p} className={s.pagination.active}>
                {p}
              </span>
            ) : (
              <button
                key={p}
                className={s.pagination.button}
                onClick={() => goToPage(p)}
              >
                {p}
              </button>
            )
          )}

          <button
            className={s.pagination.button}
            onClick={() => goToPage(page + 1)}
            disabled={page >= totalPages}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
