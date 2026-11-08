import React, { useState } from 'react';
import {
  Sparkles,
  Upload,
  BookOpen,
  Sliders,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  CheckCircle2,
  Clock,
  Layers,
  GraduationCap,
  RotateCcw,
  Globe,
} from 'lucide-react';
import { PRESET_MATERI, PresetMateri } from '../data/presets';
import { UserSchoolProfile } from '../types/rpp';

interface GeneratorFormProps {
  onGenerate: (payload: {
    materi: string;
    settings: any;
    useGoogleSearch?: boolean;
  }) => Promise<void>;
  isLoading: boolean;
  profile: UserSchoolProfile;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  onGenerate,
  isLoading,
  profile,
}) => {
  const [materi, setMateri] = useState<string>(PRESET_MATERI[0].materi);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESET_MATERI[0].id);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [filterJenjang, setFilterJenjang] = useState<'ALL' | 'AKL' | 'SMK' | 'SMA'>('ALL');
  const [useGoogleSearch, setUseGoogleSearch] = useState<boolean>(true);

  // Optional customizable settings (with intelligent defaults)
  const [mataPelajaran, setMataPelajaran] = useState<string>(PRESET_MATERI[0].mapel);
  const [faseKelas, setFaseKelas] = useState<string>('Fase F / Kelas XI SMK / Semester Ganjil');
  const [topikPembelajaran, setTopikPembelajaran] = useState<string>('Rekonsiliasi Bank & Penyesuaian Saldo Kas Perusahaan');
  const [alokasiWaktu, setAlokasiWaktu] = useState<string>('2 Pertemuan x 3 JP (135 Menit)');
  const [praktikPedagogis, setPraktikPedagogis] = useState<string>('Problem Based Learning (PBL)');
  const [tahunPelajaran, setTahunPelajaran] = useState<string>(profile.tahunPelajaranDefault || '2026/2027');

  const [loadingStep, setLoadingStep] = useState<number>(0);

  const filteredPresets = filterJenjang === 'ALL'
    ? PRESET_MATERI
    : filterJenjang === 'AKL'
    ? PRESET_MATERI.filter((p) => p.id.includes('akl') || p.mapel.toLowerCase().includes('akuntansi'))
    : PRESET_MATERI.filter((p) => p.jenjang === filterJenjang);

  const applyPreset = (preset: PresetMateri) => {
    setSelectedPresetId(preset.id);
    setMateri(preset.materi);
    setMataPelajaran(preset.mapel);
    setTopikPembelajaran(preset.judul);
    setFaseKelas(`${preset.fase} / ${preset.kelas} / Semester Ganjil`);
    setAlokasiWaktu(preset.alokasi);
    setPraktikPedagogis(preset.pedagogi);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setMateri(text);
        setSelectedPresetId('');
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!materi.trim()) return;

    // Simulate animated loading steps for rich feedback
    setLoadingStep(1);
    const t1 = setTimeout(() => setLoadingStep(2), 2200);
    const t2 = setTimeout(() => setLoadingStep(3), 4800);
    const t3 = setTimeout(() => setLoadingStep(4), 7800);

    try {
      await onGenerate({
        materi,
        useGoogleSearch,
        settings: {
          namaSekolah: profile.namaSekolah,
          namaGuru: profile.namaGuru,
          nipGuru: profile.nipGuru,
          namaKepalaSekolah: profile.namaKepalaSekolah,
          nipKepalaSekolah: profile.nipKepalaSekolah,
          kota: profile.kota,
          mataPelajaran,
          faseKelasSemester: faseKelas,
          topikPembelajaran,
          alokasiWaktu,
          praktikPedagogis,
          tahunPelajaran,
        },
      });
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      setLoadingStep(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200 shadow-2xs">
          <GraduationCap className="w-4 h-4 text-emerald-600" />
          <span>Format Resmi Rencana Pembelajaran Mendalam (Kurikulum Merdeka)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Susun RPP Otomatis dari{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
            Materi Bahan Ajar
          </span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          Cukup tempelkan materi atau bahan ajar Anda. Kecerdasan buatan akan menyusun rencana pembelajaran berkesadaran, bermakna, dan menggembirakan lengkap dengan LKPD dan rubrik penilaian.
        </p>
      </div>

      {/* Preset Chips */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Pilih Contoh Materi Siap Pakai:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {(['ALL', 'AKL', 'SMK', 'SMA'] as const).map((jenjang) => (
              <button
                key={jenjang}
                type="button"
                onClick={() => setFilterJenjang(jenjang)}
                className={`text-[11px] px-3 py-1 rounded-full font-bold transition-colors ${
                  filterJenjang === jenjang
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {jenjang === 'ALL'
                  ? 'Semua Materi'
                  : jenjang === 'AKL'
                  ? '📊 AKL (Akuntansi)'
                  : jenjang === 'SMK'
                  ? '🛠️ SMK Kejuruan'
                  : '🎓 SMA'}
              </button>
            ))}

            {selectedPresetId && (
              <button
                type="button"
                onClick={() => {
                  setSelectedPresetId('');
                  setMateri('');
                }}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 ml-1"
              >
                <RotateCcw className="w-3 h-3" /> Bersihkan
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset)}
              className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                selectedPresetId === preset.id
                  ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium shadow-2xs ring-1 ring-emerald-500'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-bold truncate text-[11px] ${
                  preset.jenjang === 'SMK' ? 'text-blue-700' : 'text-emerald-700'
                }`}>
                  {preset.jenjang} • {preset.mapel.split('(')[0].trim()}
                </span>
                <span className="text-[10px] text-slate-400">{preset.fase}</span>
              </div>
              <div className="font-semibold text-slate-900 line-clamp-1">
                {preset.judul}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 space-y-5">
          {/* Main Textarea */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Materi atau Bahan Ajar</span>
                <span className="text-red-500">*</span>
              </label>

              <label className="cursor-pointer text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors border border-emerald-200">
                <Upload className="w-3.5 h-3.5" />
                <span>Unggah File (.txt)</span>
                <input
                  type="file"
                  accept=".txt,.md,.doc"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <textarea
              value={materi}
              onChange={(e) => {
                setMateri(e.target.value);
                if (selectedPresetId) setSelectedPresetId('');
              }}
              rows={8}
              required
              placeholder="Ketik atau tempelkan (paste) ringkasan materi bahan ajar di sini. Contoh: Rangkuman bab sistem organ tubuh, teks prosedur nusantara, konsep pecahan senilai, hukum newton, materi fotosintesis, dll..."
              className="w-full p-4 text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-mono leading-relaxed"
            />

            <div className="flex items-center justify-between mt-1 text-xs text-slate-400">
              <span>{materi.length} karakter • Semakin lengkap bahan ajar, semakin presisi RPP yang dihasilkan</span>
              {materi.length > 50 && (
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Materi siap diproses
                </span>
              )}
            </div>
          </div>

          {/* Collapsible Fine Tuning Settings */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/70 text-left flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Penyesuaian Tambahan (Opsional)
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  — Jenjang, Mata Pelajaran, & Praktik Pedagogis
                </span>
              </div>
              <div className="text-slate-400">
                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showAdvanced && (
              <div className="p-4 sm:p-5 bg-white space-y-4 border-t border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mata Pelajaran / Konsentrasi Keahlian
                    </label>
                    <input
                      type="text"
                      value={mataPelajaran}
                      onChange={(e) => setMataPelajaran(e.target.value)}
                      placeholder="misal: Akuntansi Keuangan, Praktikum Akuntansi Lembaga, TKJ, IPA"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Fase / Kelas / Semester
                    </label>
                    <input
                      type="text"
                      value={faseKelas}
                      onChange={(e) => setFaseKelas(e.target.value)}
                      placeholder="contoh: Fase D / VIII / Ganjil"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Topik Pembelajaran
                    </label>
                    <input
                      type="text"
                      value={topikPembelajaran}
                      onChange={(e) => setTopikPembelajaran(e.target.value)}
                      placeholder="Judul topik spesifik"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Alokasi Waktu
                    </label>
                    <input
                      type="text"
                      value={alokasiWaktu}
                      onChange={(e) => setAlokasiWaktu(e.target.value)}
                      placeholder="contoh: 2 Pertemuan x 2 JP (80 Menit)"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Praktik Pedagogis / Model Pembelajaran
                    </label>
                    <select
                      value={praktikPedagogis}
                      onChange={(e) => setPraktikPedagogis(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      <option value="Problem Based Learning (PBL)">Problem Based Learning (PBL)</option>
                      <option value="Project Based Learning (PjBL)">Project Based Learning (PjBL)</option>
                      <option value="Teaching Factory (TeFa - Standar Industri / DUDIKA)">Teaching Factory (TeFa - Standar Industri / DUDIKA)</option>
                      <option value="Praktik Bengkel / Studio & Simulasi SOP K3LH">Praktik Bengkel / Studio & Simulasi SOP K3LH</option>
                      <option value="Inkuiri Terbimbing (Guided Inquiry)">Inkuiri Terbimbing (Guided Inquiry)</option>
                      <option value="Discovery Learning">Discovery Learning</option>
                      <option value="Pembelajaran Berdiferensiasi & Kolaboratif">Pembelajaran Berdiferensiasi & Kolaboratif</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tahun Pelajaran
                    </label>
                    <input
                      type="text"
                      value={tahunPelajaran}
                      onChange={(e) => setTahunPelajaran(e.target.value)}
                      placeholder="contoh: 2026/2027"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Google Search Grounding Toggle */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50/70 to-indigo-50/50 flex items-start justify-between gap-3 transition-colors">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-950 uppercase tracking-wide">
                    Google Search Grounding (Rujukan Resmi Terkini)
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                    Aktif
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                  AI akan mencari data Capaian Pembelajaran (CP) terbaru BSKAP Kemendikbudristek dan regulasi industri DUDIKA terkini agar RPP berbasis fakta mutakhir.
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                checked={useGoogleSearch}
                onChange={(e) => setUseGoogleSearch(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Submit Button Bar */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              Sekolah: <strong>{profile.namaSekolah || 'SMK Negeri 1 Indonesia'}</strong> • Guru:{' '}
              <strong>{profile.namaGuru || 'Guru Mapel'}</strong>
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading || !materi.trim()}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md flex items-center justify-center gap-2 transition-all ${
              isLoading || !materi.trim()
                ? 'bg-slate-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-500/25 active:scale-[0.98]'
            }`}
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>{isLoading ? 'Sedang Menyusun RPP...' : '✨ Susun RPP Mendalam Otomatis (AI)'}</span>
          </button>
        </div>
      </form>

      {/* Stepped Loading Animation */}
      {isLoading && (
        <div className="mt-8 bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 animate-spin">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">
                Menyusun RPP Mendalam (Deep Learning Kurikulum Merdeka)...
              </h3>
              <p className="text-xs text-slate-500">
                AI sedang merancang pembelajaran yang berkesadaran, bermakna, dan menggembirakan.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">Menganalisis konsep esensial & jenis pengetahuan dari materi bahan ajar</span>
            </div>
            <div
              className={`flex items-center gap-2 transition-opacity duration-300 ${
                loadingStep >= 2 ? 'text-slate-700 opacity-100' : 'text-slate-400 opacity-60'
              }`}
            >
              {loadingStep >= 2 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span>Merumuskan Capaian Pembelajaran (CP) dan Tujuan Pembelajaran (TP) spesifik</span>
            </div>
            <div
              className={`flex items-center gap-2 transition-opacity duration-300 ${
                loadingStep >= 3 ? 'text-slate-700 opacity-100' : 'text-slate-400 opacity-60'
              }`}
            >
              {loadingStep >= 3 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span>Merancang tahapan belajar berkesadaran: Memahami, Mengaplikasi, Merefleksi</span>
            </div>
            <div
              className={`flex items-center gap-2 transition-opacity duration-300 ${
                loadingStep >= 4 ? 'text-slate-700 opacity-100' : 'text-slate-400 opacity-60'
              }`}
            >
              {loadingStep >= 4 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span>Menyusun LKPD aplikatif, rubrik 4 kategori, dan rencana diferensiasi</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
