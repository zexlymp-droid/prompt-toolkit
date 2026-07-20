"use client";

import { useState } from "react";

type EnhancedResult = {
  role: string;
  context: string;
  task: string;
  format: string;
  constraints: string;
  full_prompt: string;
};

const FIELD_LABELS: { key: keyof Omit<EnhancedResult, "full_prompt">; label: string }[] = [
  { key: "role", label: "ROLE" },
  { key: "context", label: "CONTEXT" },
  { key: "task", label: "TASK" },
  { key: "format", label: "FORMAT" },
  { key: "constraints", label: "CONSTRAINTS" },
];

export default function MagicPrompt() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<EnhancedResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleTransmute() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Terjadi kesalahan.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Tidak bisa menghubungi server. Cek koneksi.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result.full_prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="grid gap-px bg-border rounded-lg overflow-hidden border border-border md:grid-cols-2">
      {/* Raw input panel */}
      <div className="bg-surface p-6 flex flex-col">
        <span className="font-mono text-xs tracking-widest text-muted mb-3">
          PROMPT MENTAH
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="contoh: buatkan saya email penolakan vendor yang sopan tapi tegas"
          className="flex-1 min-h-[180px] bg-transparent font-mono text-sm text-parchment placeholder:text-muted/60 resize-none outline-none"
        />
        <button
          onClick={handleTransmute}
          disabled={loading || !input.trim()}
          className="mt-4 self-start px-5 py-2.5 bg-gold text-ink font-body font-medium text-sm rounded hover:bg-gold/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Mentransmutasi…" : "Transmutasikan →"}
        </button>
      </div>

      {/* Structured output panel */}
      <div className="bg-surface p-6 flex flex-col min-h-[280px]">
        <span className="font-mono text-xs tracking-widest text-gold mb-3">
          PROMPT TERSTRUKTUR
        </span>

        {error && (
          <p className="text-ember text-sm font-mono">{error}</p>
        )}

        {!result && !error && !loading && (
          <p className="text-muted text-sm italic font-display">
            Hasil transmutasi akan muncul di sini — role, context, task, format,
            dan constraint akan dipisah otomatis.
          </p>
        )}

        {loading && (
          <div className="space-y-2 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-3 bg-border rounded w-full" />
            ))}
          </div>
        )}

        {result && (
          <div className="space-y-3 flex-1">
            {FIELD_LABELS.map(({ key, label }) => (
              <div key={key}>
                <span className="font-mono text-[10px] tracking-widest text-gold/70">
                  {label}
                </span>
                <p className="text-sm text-parchment/90 font-body">{result[key]}</p>
              </div>
            ))}
            <button
              onClick={handleCopy}
              className="mt-2 text-xs font-mono text-muted hover:text-gold border border-border hover:border-gold/50 rounded px-3 py-1.5 transition-colors"
            >
              {copied ? "✓ Tersalin" : "Salin prompt lengkap"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
