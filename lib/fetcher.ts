// src/lib/fetcher.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetcher(
  path: string,
  options?: RequestInit
) {
  const res = await fetch(`${BASE_URL}${path}`, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} - ${text}`);
  }

  return res.json();
}