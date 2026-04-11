"use client";

import { useEffect, useState } from "react";
import { getSavedArticles, deleteBookmark, type SavedArticleItem } from "@/features/news/infrastructure/api/newsApi";
import { newsListStyles as s } from "@/features/news/ui/components/newsListStyles";

const PAGE_SIZE = 10;

const deleteButtonStyle =
  "shrink-0 rounded-md border border-red-200 bg-white px-3 py-1 text-xs text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-800 dark:bg-zinc-800 dark:text-red-400 dark:hover:bg-zinc-700";

export default function SavedNewsPage() {
  const [articles, setArticles] = useState<SavedArticleItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    setStatus("loading");
    getSavedArticles(page, PAGE_SIZE)
      .then((result) => {
        setArticles(result.articles);
        setTotalPages(result.totalPages);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, [page]);

  async function handleDelete(articleId: number) {
    setDeletingIds((prev) => new Set(prev).add(articleId));
    try {
      await deleteBookmark(articleId);
      setArticles((prev) => prev.filter((a) => a.article_id !== articleId));
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(articleId);
        return next;
      });
    }
  }

  return (
    <div className={s.page}>
      <div className={s.container}>
        <div className={s.header.wrap}>
          <h1 className={s.header.title}>저장된 기사</h1>
        </div>

        <div className={s.card}>
          {status === "loading" && <p className={s.loading}>불러오는 중...</p>}
          {status === "error" && <p className={s.error}>기사를 불러오는데 실패했습니다.</p>}
          {status === "success" && articles.length === 0 && (
            <p className={s.empty}>저장된 기사가 없습니다.</p>
          )}
          {status === "success" && articles.length > 0 && (
            <>
              <ul className={s.list}>
                {articles.map((article) => (
                  <li key={article.article_id} className={s.item.wrap}>
                    <div className="flex items-start justify-between gap-4">
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={s.item.title}
                      >
                        {article.title}
                      </a>
                      <button
                        className={deleteButtonStyle}
                        onClick={() => handleDelete(article.article_id)}
                        disabled={deletingIds.has(article.article_id)}
                      >
                        {deletingIds.has(article.article_id) ? "삭제 중..." : "삭제"}
                      </button>
                    </div>
                    <div className={s.item.meta}>
                      {article.source && <span className={s.item.source}>{article.source}</span>}
                      {article.published_at && (
                        <span>{new Date(article.published_at).toLocaleDateString("ko-KR")}</span>
                      )}
                      <span className="text-zinc-400">
                        저장: {new Date(article.saved_at).toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                    {article.snippet && <p className={s.item.content}>{article.snippet}</p>}
                  </li>
                ))}
              </ul>

              {totalPages > 1 && (
                <div className={s.pagination.wrap}>
                  <button
                    className={s.pagination.button}
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page <= 1}
                  >
                    이전
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
                    p === page ? (
                      <span key={p} className={s.pagination.active}>{p}</span>
                    ) : (
                      <button key={p} className={s.pagination.button} onClick={() => setPage(p)}>
                        {p}
                      </button>
                    )
                  )}
                  <button
                    className={s.pagination.button}
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= totalPages}
                  >
                    다음
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
