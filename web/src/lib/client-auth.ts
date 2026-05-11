/**
 * Browser-side Anthropic credentials. The user pastes their token in
 * Settings; we keep it in localStorage and send it with each chat /
 * section-mark request as `x-claude-auth: <token>`. The server prefers
 * this over its own env credentials, so a publicly-accessible deployment
 * never burns server tokens on stranger traffic.
 *
 * Auto-detects the token type by prefix so the server can pick apiKey
 * vs authToken on the Anthropic SDK client:
 *   - `sk-ant-api03-...` → API key
 *   - `sk-ant-oat01-...` → OAuth token (claude setup-token)
 */

const KEY = "lithium.claude_auth";

export type ClaudeAuthKind = "api-key" | "oauth";
export type ClaudeAuth = { token: string; kind: ClaudeAuthKind };

export function detectKind(token: string): ClaudeAuthKind {
  return token.startsWith("sk-ant-oat") ? "oauth" : "api-key";
}

export function getStoredAuth(): ClaudeAuth | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return null;
  return { token: raw, kind: detectKind(raw) };
}

export function setStoredAuth(token: string) {
  if (typeof window === "undefined") return;
  const trimmed = token.trim();
  if (!trimmed) {
    window.localStorage.removeItem(KEY);
    return;
  }
  window.localStorage.setItem(KEY, trimmed);
}

export function clearStoredAuth() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

/**
 * Add the auth header to a fetch RequestInit if we have a stored token.
 * Returns the original init unchanged when no token is set.
 */
export function withAuthHeader(init: RequestInit = {}): RequestInit {
  const auth = getStoredAuth();
  if (!auth) return init;
  const headers = new Headers(init.headers ?? {});
  headers.set("x-claude-auth", auth.token);
  return { ...init, headers };
}
