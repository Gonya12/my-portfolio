"use client";

import { useState } from "react";

type Role = "user" | "assistant";
type Msg = { role: Role; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! Ask me about Gonzalo." },
  ]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Msg = { role: "user", content: text };
    const next: Msg[] = [...messages, userMsg];

    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      // If API returns non-200, show the error text
      if (!res.ok) {
        const errText = await res.text();
        setMessages([
          ...next,
          { role: "assistant", content: `API Error ${res.status}: ${errText}` },
        ]);
        return;
      }

      const data: unknown = await res.json();
      const reply =
        typeof (data as any)?.reply === "string"
          ? (data as any).reply
          : "No reply.";

      const botMsg: Msg = { role: "assistant", content: reply };
      setMessages([...next, botMsg]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Error calling the API route." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="w-80 h-[420px] bg-gray-950 border border-gray-800 rounded-2xl shadow-xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">AI Assistant</p>
              <p className="text-xs text-gray-400">Ask about Gonzalo</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-white text-black"
                    : "mr-auto bg-gray-900 text-white border border-gray-800"
                }`}
              >
                {m.content}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-800 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask a question..."
              className="flex-1 rounded-xl bg-black border border-gray-800 px-3 py-2 text-white outline-none"
            />
            <button
              onClick={send}
              disabled={loading}
              className="rounded-xl bg-white text-black px-4 font-semibold disabled:opacity-60"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-white text-black font-semibold px-4 py-3 rounded-full shadow-lg hover:bg-gray-200 transition"
      >
        {open ? "Close" : "Chat"}
      </button>
    </div>
  );
}