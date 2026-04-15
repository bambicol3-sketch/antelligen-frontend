import { atom } from "jotai";
import type { InvestmentState } from "@/features/investment/domain/state/investmentState";

export const investmentAtom = atom<InvestmentState>({ status: "IDLE" });
