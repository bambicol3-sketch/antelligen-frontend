"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSetAtom } from "jotai";
import { fetchAuthMe } from "@/features/auth/infrastructure/api/authApi";
import { authAtom } from "@/features/auth/application/atoms/authAtom";
import type { AuthState } from "@/features/auth/domain/state/authState";

export function useAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authState, setAuthState] = useState<AuthState>({ status: "LOADING" });
  const setAuth = useSetAtom(authAtom);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) return;

    fetchAuthMe(token)
      .then((meResponse) => {
        if (!meResponse.is_registered) {
          setAuthState({ status: "TEMPORARY_TOKEN" });
          const params = new URLSearchParams({
            nickname: meResponse.nickname,
            email: meResponse.email,
          });
          router.replace(`/terms?${params.toString()}`);
        } else {
          document.cookie = `user_token=${token}; path=/; SameSite=Lax`;
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
  }, [router, searchParams, setAuth]);

  return { authState };
}
