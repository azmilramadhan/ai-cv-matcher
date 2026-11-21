import MascotImage from "@/components/MascotImage";
import Image from "next/image";

export default function Header() {
  return (
    <div className="relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl max-w-5xl mx-auto my-6 shadow-sm">
      {/* Background Image & Gradient Overlay */}
      <Image
        src="/mascots/bg-header.jpeg"
        alt="Header Background"
        fill
        priority
        className="object-cover object-center -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/80 to-emerald-950/70 -z-10" />

      <div className="space-y-3 max-w-xl text-center md:text-left z-10">
        <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
          Udah capek sebar CV tapi dicuekin HR? <br />
          Sini, <span className="text-amber-400">Kang Cek</span> bantu bedah!
        </h1>
        <p className="text-zinc-200 text-sm md:text-base leading-relaxed">
          Unggah CV dan syarat kerja incaranmu. Kang Cek bakal kasih bocoran 
          apa yang kurang dan cara nulisnya biar CV-mu makin nendang!
        </p>
      </div>

      {/* Visual Maskot Berdiri Sendiri */}
      <div className="flex flex-col items-center gap-1.5 z-10">
        <div className="relative flex flex-col items-center justify-center">
          <MascotImage
            src="/mascots/kang-cek-hi.png"
            alt="Maskot Kang Cek"
            fallbackEmoji="🐱"
            className="h-28 w-28 object-contain animate-float drop-shadow-md"
          />
          <span className="-mt-1 bg-amber-400 text-zinc-950 font-bold text-xs px-2.5 py-0.5 rounded-full shadow">
            Kang Cek
          </span>
        </div>
        <p className="text-xs font-mono text-zinc-300 italic">&quot;Gak pake daftar, langsung gas!&quot;</p>
      </div>
    </div>
  );
}
