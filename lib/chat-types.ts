export type TextBlock = { type: 'text'; text: string };
export type ToolUseBlock = { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> };
export type ToolResultBlock = { type: 'tool_result'; tool_use_id: string; content: string };
export type ContentBlock = TextBlock | ToolUseBlock | ToolResultBlock;

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string | ContentBlock[];
};
