// src/lib/fetcher.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetcher(
  path: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("token"); // hoặc cookie

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} - ${text}`);
  }

  return res.json();
}