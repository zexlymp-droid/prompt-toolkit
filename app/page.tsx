import MagicPrompt from "@/components/MagicPrompt";
import TemplateLibrary from "@/components/TemplateLibrary";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      {/* Hero */}
      <header className="mb-14">
        <span className="font-mono text-xs tracking-widest text-gold">
          ATHANOR — TEMPAT PROMPT DITEMPA
        </span>
        <h1 className="font-display text-4xl md:text-5xl text-parchment mt-4 leading-tight">
          Prompt biasa masuk.
          <br />
          <span className="italic text-gold">Prompt profesional</span> keluar.
        </h1>
        <p className="text-muted mt-4 max-w-xl font-body">
          Tulis apa adanya di panel kiri. Athanor memisahkannya menjadi role,
          context, task, format, dan constraint — struktur yang dipakai
          prompt engineer berpengalaman.
        </p>
      </header>

      {/* Signature interactive element */}
      <section className="mb-24">
        <MagicPrompt />
      </section>

      {/* Template library */}
      <section>
        <div className="hairline pt-10 mb-8">
          <span className="font-mono text-xs tracking-widest text-muted">
            LIBRARY
          </span>
          <h2 className="font-display text-2xl text-parchment mt-2">
            Template siap pakai
          </h2>
        </div>
        <TemplateLibrary />
      </section>

      <footer className="hairline pt-8 mt-20 text-xs text-muted font-mono">
        Dibangun dengan Next.js, Firebase, dan Groq.
      </footer>
    </main>
  );
}
