"use client";

import { useAtom, useAtomValue } from "jotai";
import { investmentAtom } from "@/features/investment/application/atoms/investmentAtom";
import { investmentCommand } from "@/features/investment/application/commands/investmentCommand";
import { authAtom } from "@/features/auth/application/atoms/authAtom";

export function useInvestmentDecision() {
  const [state, setState] = useAtom(investmentAtom);
  const authState = useAtomValue(authAtom);

  async function requestDecision(query: string) {
    if (authState.status !== "AUTHENTICATED") {
      setState({ status: "ERROR", message: "로그인이 필요한 서비스입니다." });
      return;
    }

    setState({ status: "LOADING" });

    try {
      const result = await investmentCommand.REQUEST_DECISION({
        type: "REQUEST_DECISION",
        query,
      });
      setState({ status: "SUCCESS", answer: result.answer, disclaimer: result.disclaimer });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "요청 처리 중 오류가 발생했습니다.";
      setState({ status: "ERROR", message });
    }
  }

  function reset() {
    setState({ status: "IDLE" });
  }

  return { state, requestDecision, reset };
}
