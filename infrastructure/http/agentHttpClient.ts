import { env } from "@/infrastructure/config/env";

export async function agentHttpClient<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${env.agentApiBaseUrl}${path}`;

  // credentials: "include" 로 HttpOnly 쿠키를 자동 전송
  const response = await fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      window.location.replace("/login");
    }
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
