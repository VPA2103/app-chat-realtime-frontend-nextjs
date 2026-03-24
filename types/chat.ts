export type MessageRole = 'user' | 'assistant';

export interface CodeBlock {
  lang: string;
  content: string;
}

export interface Message {
  id: number;
  role: MessageRole;
  content: string;
  time: string;
  code?: CodeBlock;
}

export interface Conversation {
  id: number;
  title: string;
  time: string;
  active: boolean;
  unread: number;
}

export type WSMessage = {
  type: "chat" | "typing" | "presence";
  user_id: number;
  room: number;
  content?: string;
  status?: string;
  timestamp: number;
}; 
