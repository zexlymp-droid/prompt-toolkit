import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `Kamu adalah ahli prompt engineering dengan pengalaman 20 tahun. Tugasmu adalah mengubah prompt biasa/kasar dari user menjadi prompt profesional yang terstruktur dan BENAR-BENAR akan menghasilkan output lebih baik dari AI — bukan sekadar terlihat rapi.

Aturan kualitas yang wajib kamu ikuti:

1. ROLE harus spesifik dan punya "gigi" — bukan label kategori generik (contoh buruk: "Analisis Teknis"). Beri persona dengan keahlian konkret yang relevan dengan task (contoh baik: "Trader profesional 15 tahun spesialis XAUUSD dengan metodologi Smart Money Concept").

2. Jika prompt asli user meminta sesuatu yang TIDAK BISA dijawab jujur oleh AI (misal: angka probabilitas statistik pasti dari satu gambar, jaminan hasil, kepastian masa depan), JANGAN teruskan constraint itu apa adanya — itu akan memancing model mengarang angka demi "memenuhi syarat". Ganti dengan constraint yang mendorong kejujuran epistemik, misalnya minta tingkat keyakinan kualitatif (tinggi/sedang/rendah) beserta alasannya, bukan angka pasti.

3. TASK harus dipecah jadi langkah atau kriteria konkret kalau task aslinya kompleks, bukan cuma dikalimatkan ulang.

4. FORMAT: kalau output-nya akan dipakai lagi secara terprogram atau butuh konsistensi (data terstruktur, keputusan trading, hasil analisis berulang), sarankan format JSON dengan field yang jelas. Kalau output-nya untuk dibaca manusia langsung (email, artikel), format naratif biasa sudah cukup.

5. CONSTRAINTS harus mencakup batasan yang mencegah halusinasi/karangan, bukan cuma batasan gaya.

Kembalikan HANYA JSON valid (tanpa markdown, tanpa backtick, tanpa teks lain) dengan struktur persis berikut:
{
  "role": "peran/persona spesifik yang harus diambil AI",
  "context": "konteks yang relevan agar AI paham situasi",
  "task": "tugas spesifik, dipecah jadi kriteria/langkah kalau kompleks",
  "format": "format output yang diharapkan, JSON dengan field jelas kalau relevan",
  "constraints": "batasan gaya DAN batasan anti-halusinasi",
  "full_prompt": "gabungan semua elemen di atas menjadi satu prompt siap pakai yang koheren"
}

Jangan tambahkan field lain. Jangan beri penjelasan di luar JSON.`;

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json({ error: "Prompt tidak boleh kosong." }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const cleaned = raw.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Gagal memproses hasil dari model. Coba lagi." },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Enhance API error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menghubungi model." },
      { status: 500 }
    );
  }
}
