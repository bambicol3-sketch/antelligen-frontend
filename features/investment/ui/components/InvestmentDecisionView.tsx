"use client";

import { useState } from "react";
import { useInvestmentDecision } from "@/features/investment/application/hooks/useInvestmentDecision";

export default function InvestmentDecisionView() {
  const { state, requestDecision, reset } = useInvestmentDecision();
  const [query, setQuery] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    await requestDecision(query.trim());
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label
          htmlFor="investment-query"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          투자 판단 질문
        </label>
        <textarea
          id="investment-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="투자 판단을 원하는 질문을 입력하세요. (예: 삼성전자 지금 매수해도 될까요?)"
          rows={4}
          disabled={state.status === "LOADING"}
          className="w-full resize-none rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={state.status === "LOADING" || !query.trim()}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {state.status === "LOADING" ? "분석 중..." : "요청하기"}
          </button>
          {(state.status === "SUCCESS" || state.status === "ERROR") && (
            <button
              type="button"
              onClick={() => {
                reset();
                setQuery("");
              }}
              className="rounded-lg border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              초기화
            </button>
          )}
        </div>
      </form>

      {state.status === "LOADING" && (
        <div className="rounded-lg border border-blue-100 bg-blue-50 px-6 py-5 dark:border-blue-900 dark:bg-blue-950">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              투자 판단을 분석하고 있습니다...
            </p>
          </div>
        </div>
      )}

      {state.status === "SUCCESS" && (
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-zinc-200 bg-white px-6 py-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <h2 className="mb-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              투자 판단 결과
            </h2>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-900 dark:text-zinc-100">
              {state.answer}
            </p>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            ※ {state.disclaimer}
          </p>
        </div>
      )}

      {state.status === "ERROR" && (
        <div className="rounded-lg border border-red-100 bg-red-50 px-6 py-5 dark:border-red-900 dark:bg-red-950">
          <p className="text-sm text-red-700 dark:text-red-300">{state.message}</p>
        </div>
      )}
    </div>
  );
}
