import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `Kamu adalah ahli prompt engineering dengan pengalaman 20 tahun. Tugasmu adalah mengubah prompt biasa/kasar dari user menjadi prompt profesional yang terstruktur.

Kembalikan HANYA JSON valid (tanpa markdown, tanpa backtick, tanpa teks lain) dengan struktur persis berikut:
{
  "role": "peran/persona yang harus diambil AI",
  "context": "konteks yang relevan agar AI paham situasi",
  "task": "tugas spesifik yang harus dilakukan, dibuat lebih jelas dan terukur dari prompt asli",
  "format": "format output yang diharapkan",
  "constraints": "batasan atau hal yang harus dihindari",
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
