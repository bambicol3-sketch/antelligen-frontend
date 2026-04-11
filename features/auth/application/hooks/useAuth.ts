"use client";

import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { authAtom } from "@/features/auth/application/atoms/authAtom";
import { isAuthenticatedAtom } from "@/features/auth/application/selectors/authSelectors";

export function useAuth() {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const setAuth = useSetAtom(authAtom);
  const router = useRouter();

  function logout() {
    document.cookie = "user_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    setAuth({ status: "UNAUTHENTICATED" });
    router.push("/login");
  }

  return { isAuthenticated, logout };
}
