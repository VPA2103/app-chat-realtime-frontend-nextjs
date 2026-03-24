import { fetcher } from "@/lib/fetcher";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function sendMessage(
  token: string,
  targetUserID: number,
  content: string
) {
  const res = await fetch(`${BASE_URL}/chat/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      target_user_id: targetUserID,
      content,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Send failed: ${res.status} - ${text}`);
  }

  return res.json();
}

export const getChatHistory = (token: string, targetUserID: number) => {
  const params = new URLSearchParams({
    target_user_id: targetUserID.toString(),
  });

  return fetcher(`/chat/history?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};