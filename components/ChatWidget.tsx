"use client";

import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const starters = [
  "What projects did Gonzalo build?",
  "What skills does Gonzalo have?",
  "Which project is best for software engineering roles?",
  "Summarize Gonzalo in 3 sentences.",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! Ask me about Gonzalo’s skills, work history, or projects." },
  ]);

  async function sendText(text: string) {
    const q = text.trim();
    if (!q || loading) return;

    const next = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessages([...next, { role: "assistant", content: `API Error ${res.status}: ${data?.error ?? "Unknown"}` }]);
        return;
      }

      setMessages([...next, { role: "assistant", content: data.reply ?? "No reply." }]);
    } catch (e: any) {
      setMessages([...next, { role: "assistant", content: `Fetch error: ${e?.message ?? "Unknown"}` }]);
    } finally {
      setLoading(false);
    }
  }

  async function send() {
    await sendText(input);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="w-[340px] md:w-[420px] h-[520px] bg-[#070b14] border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">AI Assistant</p>
              <p className="text-xs text-gray-400">Ask about Gonzalo</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white" aria-label="Close">
              ✕
            </button>
          </div>

          {/* starter buttons */}
          <div className="p-3 border-b border-gray-800">
            <div className="flex flex-wrap gap-2">
              {starters.map((s) => (
                <button
                  key={s}
                  onClick={() => sendText(s)}
                  className="text-xs px-3 py-2 rounded-full border border-gray-700 text-gray-200 hover:border-[#4682B4] hover:text-white transition"
                  disabled={loading}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                  m.role === "user"
                    ? "ml-auto bg-white text-black"
                    : "mr-auto bg-[#0c1220] text-white border border-gray-800"
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
              className="flex-1 rounded-xl bg-black/40 border border-gray-800 px-3 py-2 text-white outline-none focus:border-[#4682B4]"
            />
            <button
              onClick={send}
              disabled={loading}
              className="rounded-xl bg-[#4682B4] text-black px-4 font-semibold disabled:opacity-60"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-[#4682B4] text-black font-semibold px-4 py-3 rounded-full shadow-lg hover:opacity-90 transition"
      >
        {open ? "Close" : "Ask AI"}
      </button>
    </div>
  );
}