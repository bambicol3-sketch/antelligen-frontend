"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  mseMarketAnalysisAtom,
  mseMarketAnalysisQueryAtom,
} from "@/features/mse-market-analysis/application/atoms/mseMarketAnalysisAtom";
import { mseMarketAnalysisCommand } from "@/features/mse-market-analysis/application/commands/mseMarketAnalysisCommand";
import { authAtom } from "@/features/auth/application/atoms/authAtom";

export function useMseMarketAnalysisDashboard() {
  const [mseMarketAnalysisState, setMseMarketAnalysisState] = useAtom(mseMarketAnalysisAtom);
  const [query] = useAtom(mseMarketAnalysisQueryAtom);
  const [authState] = useAtom(authAtom);

  useEffect(() => {
    if (authState.status === "LOADING") return;
    if (authState.status !== "AUTHENTICATED") {
      setMseMarketAnalysisState({ status: "UNAUTHENTICATED" });
      return;
    }

    let cancelled = false;
    setMseMarketAnalysisState({ status: "LOADING" });

    mseMarketAnalysisCommand
      .FETCH_MSE_MARKET_ANALYSIS_DASHBOARD({
        type: "FETCH_MSE_MARKET_ANALYSIS_DASHBOARD",
        query,
      })
      .then((dashboard) => {
        if (cancelled) return;
        setMseMarketAnalysisState({ status: "SUCCESS", dashboard });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const message =
          error instanceof Error && error.message.includes("401")
            ? "로그인이 필요합니다."
            : "시장 분석 대시보드를 불러오는데 실패했습니다.";
        setMseMarketAnalysisState({ status: "ERROR", message });
      });

    return () => {
      cancelled = true;
    };
  }, [authState.status, query, setMseMarketAnalysisState]);

  return { mseMarketAnalysisState };
}
