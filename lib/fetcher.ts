// src/lib/fetcher.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetcher(path: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null; // hoặc cookie

  // console.log("🔑 token from localStorage:", token); // ← token có không?
  // console.log("🔑 all localStorage keys:", Object.keys(localStorage));

  console.log("📡 fetcher calling:", path);
  console.log("🔑 localStorage token:", token?.slice(-20)); // 20 ký tự cuối
  console.log("🔑 options.headers:", options.headers);

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
