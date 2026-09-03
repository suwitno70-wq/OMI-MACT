import React from 'react';
import { Lightbulb, Clock, CheckCircle, Zap, Shield, Target, Compass, Sparkles } from 'lucide-react';

export const TipsStrategiView: React.FC = () => {
  const tipsList = [
    {
      icon: Clock,
      title: 'Strategi 3 Putaran Manajemen Waktu',
      color: 'from-emerald-500 to-teal-600',
      tag: 'Manajemen Waktu',
      desc: 'Jangan terpaku pada 1 soal sulit di awal waktu!',
      points: [
        'Putaran 1 (Menit 0 - 25): Sikat habis semua soal mudah dan sedang yang butuh waktu < 1 menit. Jika ragu, langsung tandai tombol "Ragu" dan lewati!',
        'Putaran 2 (Menit 25 - 45): Kerjakan soal sedang yang bertanda "Ragu" dan membutuhkan perhitungan aljabar/geometri 2-3 menit.',
        'Putaran 3 (Menit 45 - 60): Fokus pada 3-5 soal paling menantang (HOTS level olimpiade) dan lakukan pengecekan ulang lembar jawaban.'
      ]
    },
    {
      icon: Zap,
      title: 'Trik Eliminasi Opsi Pilihan Ganda',
      color: 'from-amber-500 to-orange-600',
      tag: 'Trik Efisien',
      desc: 'Tingkatkan peluang benar dengan membuang pilihan yang mustahil.',
      points: [
        'Uji Satuan Terakhir (Digit Satuan): Pada soal perkalian atau perpangkatan besar, cukup kalikan angka satuannya untuk mencoret 2 opsi yang salah.',
        'Uji Ganjil & Genap: Penjumlahan dua bilangan ganjil pasti menghasilkan bilangan genap. Gunakan sifat ini untuk mengeliminasi jawaban yang kontradiksi.',
        'Estimasi Batas Ekstrim: Jika luas persegi 100 cm², maka luas segitiga di dalamnya tidak mungkin lebih dari 50 cm²!'
      ]
    },
    {
      icon: Compass,
      title: 'Trik Berhitung Cepat di Luar Kepala',
      color: 'from-blue-500 to-indigo-600',
      tag: 'Numerasi Kilat',
      desc: 'Teknik mental math agar menghemat waktu saat kompetisi OMI.',
      points: [
        'Perkalian Bilangan Akhir 5: Misalnya 45 × 45 → Kalikan 4 dengan angka sesudahnya (4 × 5 = 20) lalu tempelkan 25 = 2.025.',
        'Membagi dengan 5: Kalikan angka tersebut dengan 2 lalu geser koma 1 langkah ke kiri (Contoh: 140 ÷ 5 → 140 × 2 = 280 → 28).',
        'Persentase Ajaib: 25% = 1/4, 20% = 1/5, 12,5% = 1/8, 33,33% = 1/3.'
      ]
    },
    {
      icon: Shield,
      title: 'Waspada Jebakan Soal Olimpiade (Trap Awareness)',
      color: 'from-rose-500 to-pink-600',
      tag: 'Ketelitian',
      desc: 'Soal kompetisi sering menyembunyikan jebakan kata kunci.',
      points: [
        'Perhatikan kata: "Kecuali", "Paling Sedikit", "Paling Banyak", "Selisih", atau "Urutan Turun".',
        'Jebakan Satuan: Selalu perhatikan apakah kecepatan dalam km/jam tetapi waktu dalam menit, atau volume bak dalam m³ sedangkan debit dalam liter/menit!',
        'Jebakan Keliling Bangun Gabungan: Jangan pernah menghitung garis pembatas yang berada di bagian dalam sambungan!'
      ]
    },
    {
      icon: Sparkles,
      title: 'Mental Juara & Doa Madrasah',
      color: 'from-purple-500 to-violet-600',
      tag: 'Karakter Islami',
      desc: 'Ketenangan batin dan adab menuntut ilmu kunci keberhasilan.',
      points: [
        'Awali dengan membaca Basmalah dan doa kelancaran berpikir (Robbisrohli sodri wa yassirli amri).',
        'Tarik napas dalam-dalam saat menemui soal yang terlihat rumit; pecah soal cerita panjang menjadi poin-poin sederhana yang diketahui dan ditanyakan.',
        'Tawakkal dan optimis: Usaha latihan yang tekun di MIN 1 Kotim insya Allah berbuah prestasi terbaik!'
      ]
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full">
            💡 Tips & Strategi OMI 2026
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
          Strategi Menembus Juara Olimpiade Matematika
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Kumpulan teknik praktis, manajemen waktu, dan trik pemecahan masalah yang disusun khusus oleh Pembina OMI MIN 1 Kotawaringin Timur.
        </p>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {tipsList.map((tip, idx) => {
          const Icon = tip.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tip.color} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      {tip.tag}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-base sm:text-lg mt-1">
                    {tip.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {tip.desc}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
                {tip.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
