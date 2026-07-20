# Athanor — Prompt Engineering Toolkit

Template library + "magic prompt" enhancer yang mengubah prompt biasa menjadi
prompt terstruktur (role, context, task, format, constraints).

## Stack
- Next.js 14 (App Router) + TypeScript + Tailwind
- Firebase (Auth + Firestore) — siap dipakai untuk fitur save/login
- Groq API (Llama 3.3 70B) — gratis/murah untuk fitur enhance

## Setup lokal

1. Install dependencies:
   ```
   npm install
   ```

2. Firebase config sudah hardcoded di `lib/firebase.ts` (aman karena config client
   Firebase memang publik-facing, diamankan lewat Firestore Security Rules, bukan
   dengan menyembunyikan config).
3. Salin `.env.local.example` jadi `.env.local`, isi `GROQ_API_KEY` (daftar gratis
   di [console.groq.com](https://console.groq.com) → API Keys → Create Key).
   **Jangan** taruh Groq key di kode karena repo ini public — key ini harus tetap
   lewat environment variable, baik di `.env.local` (lokal) maupun Vercel (production).

4. Jalankan dev server:
   ```
   npm run dev
   ```
   Buka http://localhost:3000

## Deploy ke Vercel (gratis)

1. Push project ini ke repo GitHub (public oke, karena tidak ada secret di kode).
2. Buka [vercel.com](https://vercel.com) → New Project → import repo tersebut.
3. Sebelum/sesudah deploy, masuk ke Settings → Environment Variables → tambahkan
   `GROQ_API_KEY` dengan value dari console.groq.com.
4. Deploy. Setiap `git push` ke branch utama akan auto-deploy.

## Struktur project

```
app/
  page.tsx           → halaman utama (hero + demo + library)
  layout.tsx          → font & metadata
  api/enhance/route.ts → endpoint yang memanggil Groq
components/
  MagicPrompt.tsx      → panel transmutasi prompt (client)
  TemplateLibrary.tsx  → grid template dengan filter kategori
  TemplateCard.tsx     → satu kartu template + tombol salin
lib/
  firebase.ts           → inisialisasi Firebase
  templates.ts           → data template (edit/tambah di sini)
```

## Menambah template baru

Edit `lib/templates.ts`, tambahkan objek baru ke array `templates` dengan
kategori, judul, deskripsi, dan isi prompt.

## Roadmap fitur lanjutan
- Auth Firebase agar user bisa login
- Simpan template favorit ke Firestore per user
- Voting/submit komunitas
- Riwayat hasil "transmutasi" prompt
