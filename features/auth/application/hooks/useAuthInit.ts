"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { authAtom } from "@/features/auth/application/atoms/authAtom";
import { fetchAuthMe } from "@/features/auth/infrastructure/api/authApi";

export function useAuthInit() {
  const setAuth = useSetAtom(authAtom);

  useEffect(() => {
    // localStorage 대신 쿠키 기반 인증 — fetchAuthMe가 쿠키를 자동으로 전송
    fetchAuthMe()
      .then((meResponse) => {
        if (meResponse.is_registered) {
          setAuth({
            status: "AUTHENTICATED",
            user: {
              id: meResponse.email,
              email: meResponse.email,
              nickname: meResponse.nickname,
            },
          });
        } else {
          setAuth({ status: "UNAUTHENTICATED" });
        }
      })
      .catch(() => {
        setAuth({ status: "UNAUTHENTICATED" });
      });
  }, [setAuth]);
}
