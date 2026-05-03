import { atom } from "jotai";
import type { MseSectorsState } from "@/features/mse-sectors/domain/state/mseSectorsState";

export const mseSectorsAtom = atom<MseSectorsState>({ status: "LOADING" });
