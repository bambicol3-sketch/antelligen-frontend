import { env } from "@/infrastructure/config/env";

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    statusText: string,
    public readonly body: unknown = null
  ) {
    super(`HTTP ${status}: ${statusText}`);
    this.name = "HttpError";
  }
}

export async function httpClient<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${env.apiBaseUrl}${path}`;

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
      // 세션 만료 → 로그인 페이지로 이동
      window.location.replace("/login");
    }
    let body: unknown = null;
    try { body = await response.json(); } catch { /* ignore */ }
    throw new HttpError(response.status, response.statusText, body);
  }

  return response.json() as Promise<T>;
}
