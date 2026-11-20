import MascotImage from "@/components/MascotImage";

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-emerald-50 rounded-3xl max-w-5xl mx-auto my-6 shadow-sm">
      <div className="space-y-3 max-w-xl text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight leading-tight">
          Udah capek sebar CV tapi dicuekin HR? <br />
          Sini, <span className="text-emerald-600">Kang Cek</span> bantu bedah!
        </h1>
        <p className="text-zinc-600 text-sm md:text-base">
          Unggah CV dan syarat kerja incaranmu. Kang Cek bakal kasih bocoran 
          apa yang kurang dan cara nulisnya biar CV-mu makin nendang!
        </p>
      </div>

      {/* Visual Maskot Berdiri Sendiri */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="relative flex flex-col items-center justify-center">
          <MascotImage
            src="/mascots/kang-cek-hi.png"
            alt="Maskot Kang Cek"
            fallbackEmoji="🐱"
            className="h-28 w-28 object-contain animate-float"
          />
          <span className="-mt-1 bg-amber-400 text-zinc-950 font-bold text-xs px-2.5 py-0.5 rounded-full shadow">
            Kang Cek
          </span>
        </div>
        <p className="text-xs font-mono text-zinc-500 italic">&quot;Gak pake daftar, langsung gas!&quot;</p>
      </div>
    </div>
  );
}
