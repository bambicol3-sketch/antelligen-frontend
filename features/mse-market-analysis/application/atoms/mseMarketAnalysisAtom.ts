import { atom } from "jotai";
import type { MseMarketAnalysisState } from "@/features/mse-market-analysis/domain/state/mseMarketAnalysisState";
import type { MseMarketAnalysisQuery } from "@/features/mse-market-analysis/domain/model/mseMarketAnalysis";

export const mseMarketAnalysisAtom = atom<MseMarketAnalysisState>({ status: "LOADING" });

export const mseMarketAnalysisQueryAtom = atom<MseMarketAnalysisQuery>({});
