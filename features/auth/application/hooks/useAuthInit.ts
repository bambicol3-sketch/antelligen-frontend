"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { authAtom } from "@/features/auth/application/atoms/authAtom";
import { fetchAuthMe } from "@/features/auth/infrastructure/api/authApi";

export function useAuthInit() {
  const setAuth = useSetAtom(authAtom);

  useEffect(() => {
    const token = localStorage.getItem("user_token");

    if (!token) {
      setAuth({ status: "UNAUTHENTICATED" });
      return;
    }

    fetchAuthMe(token)
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
        localStorage.removeItem("user_token");
        setAuth({ status: "UNAUTHENTICATED" });
      });
  }, [setAuth]);
}
