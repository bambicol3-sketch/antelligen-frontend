"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { newsAtom } from "@/features/news/application/atoms/newsAtom";
import { newsCommand } from "@/features/news/application/commands/newsCommand";
import { authAtom } from "@/features/auth/application/atoms/authAtom";

const PAGE_SIZE = 10;

export function useNewsList() {
  const [newsState, setNewsState] = useAtom(newsAtom);
  const [authState] = useAtom(authAtom);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (authState.status === "LOADING") return;
    if (authState.status !== "AUTHENTICATED") {
      setNewsState({ status: "UNAUTHENTICATED" });
      return;
    }

    setNewsState({ status: "LOADING" });

    newsCommand.FETCH_NEWS_PAGE({ type: "FETCH_NEWS_PAGE", keyword: "주식", page, pageSize: PAGE_SIZE })
      .then(({ articles, page: currentPage, totalPages, totalCount }) => {
        setNewsState({ status: "SUCCESS", articles, page: currentPage, totalPages, totalCount });
      })
      .catch(() => {
        setNewsState({ status: "ERROR", message: "뉴스를 불러오는데 실패했습니다." });
      });
  }, [page, authState.status, setNewsState]);

  function goToPage(nextPage: number) {
    setPage(nextPage);
  }

  return { newsState, page, goToPage };
}
