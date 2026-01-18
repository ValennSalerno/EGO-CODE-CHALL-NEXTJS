export async function safeFetchJson<T>(url: string, init?: RequestInit): Promise<{ ok: boolean; data?: T; error?: string }> {
  try {
    const res = await fetch(url, { ...init });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, error: `HTTP ${res.status} ${res.statusText}${body ? `: ${body}` : ""}` };
    }
    const data = (await res.json()) as T;
    return { ok: true, data };
  } catch (err: unknown) {
    if (err instanceof Error) return { ok: false, error: err.message };
    return { ok: false, error: String(err) };
  }
}
