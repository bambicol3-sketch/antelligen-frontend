import { atom } from "jotai";
import type { MseCreditState } from "@/features/mse-credit/domain/state/mseCreditState";

export const mseCreditAtom = atom<MseCreditState>({ status: "LOADING" });
