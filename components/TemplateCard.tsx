"use client";

import { useState } from "react";
import type { Template } from "@/lib/templates";

export default function TemplateCard({ template }: { template: Template }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(template.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="border border-border rounded-lg p-5 bg-surface hover:border-gold/40 transition-colors flex flex-col">
      <span className="font-mono text-[10px] tracking-widest text-gold/70">
        {template.category.toUpperCase()}
      </span>
      <h3 className="font-display text-lg text-parchment mt-1">{template.title}</h3>
      <p className="text-sm text-muted mt-1 flex-1">{template.description}</p>
      <button
        onClick={handleCopy}
        className="mt-4 self-start text-xs font-mono text-muted hover:text-gold border border-border hover:border-gold/50 rounded px-3 py-1.5 transition-colors"
      >
        {copied ? "✓ Tersalin" : "Salin prompt"}
      </button>
    </div>
  );
}
