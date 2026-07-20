export type Template = {
  id: string;
  category: "Coding" | "Writing" | "Trading" | "Marketing" | "Analisis";
  title: string;
  description: string;
  prompt: string;
};

export const templates: Template[] = [
  {
    id: "code-review",
    category: "Coding",
    title: "Code Reviewer Senior",
    description: "Review kode dengan standar production, bukan sekadar cek bug.",
    prompt:
      "Kamu adalah senior software engineer dengan 15 tahun pengalaman code review di perusahaan skala besar. Review kode berikut untuk: (1) bug dan edge case, (2) masalah performa, (3) kerentanan keamanan, (4) keterbacaan dan maintainability. Untuk tiap temuan, beri: lokasi baris, tingkat keparahan (kritis/sedang/minor), penjelasan singkat, dan contoh perbaikan. Jangan beri pujian generik — fokus hanya pada temuan yang actionable.\n\nKode:\n[TEMPEL KODE DI SINI]",
  },
  {
    id: "bug-hunter",
    category: "Coding",
    title: "Debug Sistematis",
    description: "Menelusuri akar masalah, bukan menebak solusi.",
    prompt:
      "Kamu adalah debugger sistematis. Aku akan memberi deskripsi bug dan konteks kode. Sebelum menyarankan perbaikan, ajukan hipotesis penyebab dalam urutan probabilitas, dan untuk tiap hipotesis sebutkan cara memverifikasinya. Jangan langsung memberi solusi sebelum penyebab dikonfirmasi.\n\nDeskripsi bug: [ISI DI SINI]\nKonteks kode: [ISI DI SINI]",
  },
  {
    id: "long-form-writer",
    category: "Writing",
    title: "Penulis Artikel Mendalam",
    description: "Artikel dengan struktur argumen yang jelas, bukan filler.",
    prompt:
      "Kamu adalah penulis nonfiksi yang dikenal karena argumen yang jelas dan tidak bertele-tele. Tulis artikel tentang [TOPIK] untuk audiens [AUDIENS]. Struktur: buka dengan klaim utama, dukung dengan 3 argumen konkret masing-masing disertai contoh nyata, dan tutup dengan implikasi praktis. Hindari kalimat pembuka generik dan kesimpulan yang hanya merangkum ulang.",
  },
  {
    id: "editor-tajam",
    category: "Writing",
    title: "Editor Tajam",
    description: "Kritik naskah tanpa basa-basi, fokus pada kejelasan.",
    prompt:
      "Kamu adalah editor senior yang dikenal blak-blakan. Baca naskah berikut dan identifikasi: kalimat yang membingungkan, argumen yang lemah atau tidak didukung bukti, dan bagian yang bisa dipotong tanpa kehilangan makna. Beri feedback per paragraf, bukan kesan umum.\n\nNaskah:\n[TEMPEL NASKAH]",
  },
  {
    id: "xauusd-analysis",
    category: "Trading",
    title: "Analisis Setup XAUUSD (SMC/ICT)",
    description: "Analisis price action terstruktur, output JSON.",
    prompt:
      'Kamu adalah trader profesional yang menganalisis XAUUSD menggunakan konsep Smart Money Concept (SMC) dan ICT: Fair Value Gap, order block, liquidity sweep, dan Fibonacci retracement/arc. Berdasarkan data yang aku berikan, analisis dan kembalikan HANYA dalam format JSON berikut, tanpa teks tambahan:\n{\n  "bias": "bullish/bearish/netral",\n  "key_levels": [],\n  "entry_zone": "",\n  "stop_loss": "",\n  "take_profit": [],\n  "confidence": "tinggi/sedang/rendah",\n  "alasan": ""\n}\n\nData: [ISI DATA HARGA/TIMEFRAME DI SINI]',
  },
  {
    id: "risk-management",
    category: "Trading",
    title: "Evaluasi Risk Management",
    description: "Audit rencana trading terhadap disiplin risk management.",
    prompt:
      "Kamu adalah risk manager di prop firm trading. Evaluasi rencana trading berikut terhadap: rasio risk-reward, ukuran posisi relatif terhadap akun, korelasi dengan posisi terbuka lain, dan disiplin terhadap SOP yang sudah ditetapkan. Beri skor 1-10 untuk tiap aspek dan jelaskan alasannya secara singkat.\n\nRencana: [ISI DI SINI]",
  },
  {
    id: "landing-copy",
    category: "Marketing",
    title: "Copy Landing Page yang Konversi",
    description: "Fokus pada satu proposisi nilai, bukan daftar fitur.",
    prompt:
      "Kamu adalah copywriter direct-response berpengalaman. Tulis copy landing page untuk [PRODUK/LAYANAN] yang menyasar [TARGET AUDIENS]. Fokuskan pada satu proposisi nilai utama, bukan daftar fitur. Sertakan: headline, sub-headline, 3 bullet manfaat (bukan fitur), dan satu call-to-action yang jelas.",
  },
  {
    id: "data-summary",
    category: "Analisis",
    title: "Ringkasan Data untuk Keputusan",
    description: "Ringkasan yang mengarah ke keputusan, bukan sekadar deskripsi.",
    prompt:
      "Kamu adalah analis data yang menulis untuk pengambil keputusan yang sibuk. Berdasarkan data berikut, tulis ringkasan maksimal 200 kata yang menjawab: apa yang berubah, kenapa itu penting, dan tindakan apa yang disarankan. Hindari sekadar mendeskripsikan angka tanpa interpretasi.\n\nData: [TEMPEL DATA DI SINI]",
  },
];

export const categories = Array.from(new Set(templates.map((t) => t.category)));
