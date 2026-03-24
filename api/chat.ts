// src/api/chat.ts
export async function sendMessage(
  token: string,
  targetUserID: number,
  content: string,
) {
  const res = await fetch("/chat/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ target_user_id: targetUserID, content }),
  });

  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

export async function getChatHistory(token: string, targetUserID: number) {
  const params = new URLSearchParams({
    target_user_id: targetUserID.toString(),
  });
  const res = await fetch(`/chat/history?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch chat history");
  return res.json();
}
