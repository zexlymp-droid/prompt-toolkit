"use client";

import { useState } from "react";
import { templates, categories } from "@/lib/templates";
import TemplateCard from "./TemplateCard";

export default function TemplateLibrary() {
  const [active, setActive] = useState<string>("Semua");

  const filtered =
    active === "Semua" ? templates : templates.filter((t) => t.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {["Semua", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide border transition-colors ${
              active === cat
                ? "bg-gold text-ink border-gold"
                : "border-border text-muted hover:border-gold/50 hover:text-parchment"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <TemplateCard key={t.id} template={t} />
        ))}
      </div>
    </div>
  );
}
