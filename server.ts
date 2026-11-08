import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '20mb' }));

// Middleware to allow iframe embedding on any website & CORS
app.use((req: Request, res: Response, next) => {
  const allowed = (process.env.ALLOWED_ORIGINS || '*').split(',').map((o) => o.trim());
  const origin = req.headers.origin as string | undefined;
  if (allowed.includes('*')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else if (origin && allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Explicitly remove X-Frame-Options to allow embedding across school sites/WordPress/Google Sites
  res.removeHeader('X-Frame-Options');
  res.setHeader('Content-Security-Policy', "frame-ancestors *");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Simple in-memory rate limiter for AI endpoints (per IP)
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 10; // requests
const RATE_LIMIT_WINDOW_MS = 60_000; // per minute
const hits = new Map<string, { count: number; reset: number }>();
function rateLimit(req: Request, res: Response, next: () => void) {
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.ip || 'unknown';
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }
  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return res.status(429).json({ success: false, error: 'Terlalu banyak permintaan. Coba lagi sebentar lagi.' });
  }
  next();
}
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
}, RATE_LIMIT_WINDOW_MS).unref();
app.set('trust proxy', 1);

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Generator endpoint
app.post('/api/generate-rpp', rateLimit, async (req: Request, res: Response) => {
  try {
    const { materi, metadata, settings, useGoogleSearch = true } = req.body;

    if (!materi || typeof materi !== 'string' || materi.trim().length === 0) {
      return res.status(400).json({ error: 'Materi atau bahan ajar wajib diisi.' });
    }

    const searchGuidance = useGoogleSearch
      ? `\nGUNAKAN GOOGLE SEARCH GROUNDING: Carilah referensi resmi terkini dari BSKAP Kemendikbudristek RI mengenai Capaian Pembelajaran (CP), regulasi kurikulum terbaru, serta standar industri/DUDIKA riil di Indonesia yang relevan dengan topik ini agar RPP berbasis data faktual paling mutakhir.\n`
      : '';

    const promptText = `
Anda adalah konsultan ahli Kurikulum Merdeka Kemendikbudristek RI dan perancang Pembelajaran Mendalam (Deep Learning) yang berkesadaran, bermakna, dan menggembirakan khusus untuk jenjang SMK (Sekolah Menengah Kejuruan) dan SMA (Sekolah Menengah Atas) di Indonesia.
${searchGuidance}
Susunlah Rencana Pembelajaran Mendalam (RPP / Modul Ajar) LENGKAP, SIAP CETAK, dan BERMUTU TINGGI berdasarkan MATERI / BAHAN AJAR berikut:

--- MATERI / BAHAN AJAR INPUT DARI GURU ---
${materi.trim()}
-------------------------------------------

Informasi Tambahan / Preferensi Guru (Gunakan jika relevan, atau lengkapi secara profesional jika kosong):
- Nama Satuan Pendidikan: ${settings?.namaSekolah || 'SMK Negeri 1 Indonesia'}
- Nama Guru: ${settings?.namaGuru || 'Guru Pengampu, S.Pd.'}
- NIP Guru: ${settings?.nipGuru || '19850101 201001 1 001'}
- Nama Kepala Sekolah: ${settings?.namaKepalaSekolah || 'Kepala Sekolah, M.Pd.'}
- NIP Kepala Sekolah: ${settings?.nipKepalaSekolah || '19750505 200003 1 002'}
- Mata Pelajaran / Konsentrasi Keahlian: ${settings?.mataPelajaran || 'Auto-detect dari materi'}
- Fase / Kelas / Semester: ${settings?.faseKelasSemester || 'Fase E (Kelas X) atau Fase F (Kelas XI/XII SMK)'}
- Topik Pembelajaran: ${settings?.topikPembelajaran || 'Auto-detect dari materi'}
- Alokasi Waktu: ${settings?.alokasiWaktu || '2 Pertemuan x 2 JP atau 3-4 JP untuk praktik'}
- Tahun Pelajaran: ${settings?.tahunPelajaran || '2026/2027'}
- Praktik Pedagogis Utama: ${settings?.praktikPedagogis || 'Problem Based Learning / Project Based Learning / Teaching Factory'}
- Kota/Kabupaten Pengesahan: ${settings?.kota || 'Jakarta'}

PEDOMAN KHUSUS APABILA MATERI BERSIFAT KEJURUAN / SMK:
- Untuk SMK: Sesuaikan Fase E (Dasar Program Keahlian Kelas X) atau Fase F (Konsentrasi Keahlian Kelas XI & XII).
- Terapkan pendekatan kejuruan: Teaching Factory (TeFa), Project Based Learning (PjBL) berstandar DUDIKA (Dunia Usaha & Dunia Industri), Praktik Bengkel / Studio / Laboratorium Komputer.
- Integrasikan K3LH (Kesehatan, Keselamatan Kerja & Lingkungan Hidup) dan budaya kerja industri 5R (Ringkas, Rapi, Resik, Rawat, Rajin) ke dalam langkah pembelajaran inti dan rubrik.
- Pada Lampiran LKPD: Formatkan sebagai Jobsheet / Lembar Kerja Praktik Industri nyata lengkap dengan persiapan alat/bahan, APD, langkah kerja SOP, toleransi ukuran/konfigurasi, dan uji fungsi unjuk kerja.
- Pada Kemitraan: Sebutkan kemitraan dengan DUDIKA mitra atau praktisi industri / guru tamu.

Format yang dihasilkan WAJIB mengikuti struktur standar 6 komponen:
1. Identitas (Nama satuan pendidikan, Nama guru, Mata pelajaran/Konsentrasi Keahlian, Fase/kelas/semester, Topik pembelajaran, Alokasi waktu, Tahun pelajaran)
2. Identifikasi (Kesiapan belajar murid [sudah paham, sedang berkembang, perlu bantuan], Minat & gaya belajar, Latar belakang & kebutuhan khusus, Jenis pengetahuan materi [faktual, konseptual, prosedural, metakognitif], Relevansi materi dengan kehidupan nyata / dunia kerja industri di Indonesia, Dimensi Profil Lulusan yang ditargetkan dengan centang boolean dan penjelasan operasional)
3. Desain Pembelajaran (Capaian Pembelajaran/CP resmi elemen terkait, Lintas disiplin ilmu, Tujuan Pembelajaran kompetensi+konten, Topik pembelajaran kontekstual, Praktik pedagogis, Kemitraan pembelajaran, Lingkungan pembelajaran, Pemanfaatan digital)
4. Pengalaman Belajar (Rincian per pertemuan lengkap dengan alokasi waktu menit. Tahap awal: salam/doa/presensi, apersepsi & pertanyaan pemantik yang merangsang rasa ingin tahu, penyampaian tujuan dan ice breaking yang seru dan edukatif. Tahap inti: Memahami, Mengaplikasi [praktik/proyek], Merefleksi. Tahap penutup: kesimpulan & refleksi, umpan balik/info pertemuan berikutnya/doa)
5. Asesmen Pembelajaran (Asesmen awal diagnostik, Asesmen proses formatif, Asesmen akhir sumatif / unjuk kerja, serta Rubrik Penilaian 4 Kategori: Sangat Baik [4], Baik [3], Cukup [2], Perlu Bimbingan [1] untuk indikator TP dan Dimensi Profil Lulusan)
6. Lampiran (Lembar Kerja Peserta Didik / Jobsheet riil berisi langkah aktivitas/praktik dan soal-soal relevan; Bahan bacaan ringkas guru & murid serta glosarium istilah teknis; Instrumen refleksi murid & guru; Rencana pembelajaran diferensiasi konten, proses, produk; Pengesahan resmi)

HASILKAN DALAM FORMAT JSON MURNI yang valid dan terstruktur tanpa pembuka/penutup basa-basi.`;

    const systemInstruction = `Anda adalah asisten kecerdasan buatan spesialis penyusunan RPP dan Modul Ajar Kurikulum Merdeka Kemendikbudristek RI. Anda selalu merespons dengan JSON yang valid, terstruktur rapi, mendalam, dan kaya konten pendidikan berkualitas tinggi dalam Bahasa Indonesia.`;

    const config: any = {
      systemInstruction,
    };

    if (useGoogleSearch) {
      config.tools = [{ googleSearch: {} }];
    } else {
      config.responseMimeType = 'application/json';
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: promptText,
      config,
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error('Model tidak memberikan respon.');
    }

    // Extract Grounding Metadata from Google Search
    const grounding = response.candidates?.[0]?.groundingMetadata;
    const searchQueries: string[] = grounding?.webSearchQueries || [];
    const groundingChunks = grounding?.groundingChunks || [];
    const groundingSources = groundingChunks
      .filter((c: any) => c.web?.uri && c.web?.title)
      .map((c: any) => ({
        title: c.web.title,
        uri: c.web.uri,
      }));

    let parsedData: any;
    try {
      parsedData = JSON.parse(textOutput);
    } catch (parseErr) {
      // Find JSON block if search annotations or markdown wrap it
      const match = textOutput.match(/\{[\s\S]*\}/);
      if (match) {
        parsedData = JSON.parse(match[0]);
      } else {
        const cleaned = textOutput
          .replace(/^```json\s*/i, '')
          .replace(/^```\s*/i, '')
          .replace(/```$/i, '')
          .trim();
        parsedData = JSON.parse(cleaned);
      }
    }

    res.json({
      success: true,
      data: parsedData,
      groundingSources,
      searchQueries,
    });
  } catch (error: any) {
    console.error('Error generating RPP:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Terjadi kesalahan saat menyusun RPP dengan AI.',
    });
  }
});

// Refine section endpoint
app.post('/api/refine-section', rateLimit, async (req: Request, res: Response) => {
  try {
    const { sectionName, currentContent, userInstruction, contextInfo } = req.body;

    if (!sectionName || !userInstruction) {
      return res.status(400).json({ error: 'Section dan instruksi perbaikan wajib diisi.' });
    }

    const promptText = `
Anda adalah pakar kurikulum Merdeka. Perbaiki atau kembangkan bagian berikut dari Rencana Pembelajaran Mendalam (RPP) sesuai instruksi guru:

Bagian yang diperbaiki: "${sectionName}"
Konteks Mata Pelajaran & Topik: "${contextInfo?.mataPelajaran || ''} - ${contextInfo?.topik || ''}"
Konten Saat Ini:
${typeof currentContent === 'object' ? JSON.stringify(currentContent, null, 2) : currentContent}

Instruksi Perbaikan dari Guru:
"${userInstruction}"

Hasilkan konten hasil perbaikan dalam format JSON:
{
  "updatedContent": ... (konten baru yang disempurnakan sesuai tipe aslinya, baik object, array, atau string) ...,
  "summaryChanges": "penjelasan singkat 1 kalimat apa yang telah diubah"
}
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const textOutput = response.text || '{}';
    const cleaned = textOutput
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/i, '')
      .trim();
    const parsed = JSON.parse(cleaned);

    res.json({
      success: true,
      data: parsed,
    });
  } catch (error: any) {
    console.error('Error refining section:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Terjadi kesalahan saat memperbaiki bagian RPP.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RPP Pintar Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
