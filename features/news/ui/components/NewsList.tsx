"use client";

import { useState } from "react";
import { useNewsList } from "@/features/news/application/hooks/useNewsList";
import { newsListStyles as s } from "@/features/news/ui/components/newsListStyles";
import { saveArticle } from "@/features/news/infrastructure/api/newsApi";
import type { NewsArticle } from "@/features/news/domain/model/newsArticle";

function SaveButton({ article }: { article: NewsArticle }) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "duplicate">("idle");

  if (!article.url) return null;

  async function handleSave() {
    setStatus("saving");
    try {
      await saveArticle({
        title: article.title,
        link: article.url,
        source: article.source,
        published_at: article.publishedAt,
        snippet: article.content,
      });
      setStatus("saved");
    } catch (e: unknown) {
      if (e instanceof Error && e.message.includes("409")) {
        setStatus("duplicate");
      } else {
        setStatus("idle");
      }
    }
  }

  if (status === "saved") return <span className={s.item.savedBadge}>저장됨</span>;
  if (status === "duplicate") return <span className={s.item.savedBadge}>이미 저장된 기사</span>;

  return (
    <button
      className={s.item.saveButton}
      onClick={handleSave}
      disabled={status === "saving"}
    >
      {status === "saving" ? "저장 중..." : "저장하기"}
    </button>
  );
}

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
            <div className="flex items-start justify-between gap-4">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={s.item.title}
              >
                {article.title}
              </a>
              <SaveButton article={article} />
            </div>
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
