"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { fetchAuthMe } from "@/features/auth/infrastructure/api/authApi";
import { authAtom } from "@/features/auth/application/atoms/authAtom";
import type { AuthState } from "@/features/auth/domain/state/authState";

export function useAuthCallback() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({ status: "LOADING" });
  const setAuth = useSetAtom(authAtom);

  useEffect(() => {
    // 쿠키는 백엔드 리다이렉트 시 이미 설정됨 — 별도 토큰 처리 불필요
    fetchAuthMe()
      .then((meResponse) => {
        if (!meResponse.is_registered) {
          setAuthState({ status: "TEMPORARY_TOKEN" });
          const params = new URLSearchParams({
            nickname: meResponse.nickname,
            email: meResponse.email,
          });
          router.replace(`/terms?${params.toString()}`);
        } else {
          const user = { id: meResponse.email, email: meResponse.email, nickname: meResponse.nickname };
          setAuth({ status: "AUTHENTICATED", user });
          setAuthState({ status: "AUTHENTICATED", user });
          router.replace("/");
        }
      })
      .catch(() => {
        setAuth({ status: "UNAUTHENTICATED" });
        setAuthState({ status: "UNAUTHENTICATED" });
        router.replace("/login");
      });
  }, [router, setAuth]);

  return { authState };
}
