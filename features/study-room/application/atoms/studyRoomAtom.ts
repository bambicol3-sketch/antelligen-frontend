import { atom } from "jotai";
import type { StudyRoomState } from "@/features/study-room/domain/state/studyRoomState";

export const studyRoomAtom = atom<StudyRoomState>({ status: "LOADING" });
