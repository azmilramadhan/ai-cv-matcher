import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-emerald-50 rounded-3xl border border-emerald-100 max-w-5xl mx-auto my-6">
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

      {/* Visual Maskot */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-28 h-28 bg-amber-100 rounded-full flex items-center justify-center border-4 border-white shadow-md">
          <div className="h-full w-full overflow-hidden rounded-full flex items-center justify-center">
            <Image
              src="/kang-cek.png"
              alt="Maskot Kang Cek"
              width={112}
              height={112}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <span className="absolute -bottom-2 bg-amber-400 text-zinc-950 font-bold text-xs px-2.5 py-1 rounded-full shadow border border-amber-300">
            Kang Cek
          </span>
        </div>
        <p className="text-xs font-mono text-zinc-500 italic">&quot;Gak pake daftar, langsung gas!&quot;</p>
      </div>
    </div>
  );
}
