"use client";

import { Provider } from "jotai";
import Navbar from "@/ui/components/Navbar";
import { useAuth } from "@/features/auth/application/hooks/useAuth";
import { useAuthInit } from "@/features/auth/application/hooks/useAuthInit";

function AppLayoutInner({ children }: { children: React.ReactNode }) {
  useAuthInit();
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
      <main className="pt-16">{children}</main>
    </>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <AppLayoutInner>{children}</AppLayoutInner>
    </Provider>
  );
}
