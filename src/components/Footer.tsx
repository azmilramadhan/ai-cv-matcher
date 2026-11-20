import { ExternalLink, Lightbulb } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="max-w-5xl mx-auto mt-16 pb-10 px-4">
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 mb-8 flex items-start sm:items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
          <Lightbulb className="w-4 h-4" />
        </div>
        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
          <span className="font-bold text-zinc-900">Tips Kang Cek:</span> CV yang gacor
          bukan yang paling penuh tulisan atau warna-warni, tapi yang paling nyambung
          sama kebutuhan posisi yang dilamar. Semangat pejuang loker!
        </p>
      </div>

      {/* Main Footer */}
      <div className="border-t border-zinc-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div className="text-center sm:text-left space-y-1">
          <p className="font-semibold text-zinc-800">
            LolosKerja - Bedah CV Bareng Kang Cek
          </p>
          <p>
            Dibangun oleh{' '}
            <span className="font-semibold text-zinc-700">Azmil Ramadhan</span>{' '}
            menggunakan Next.js, Tailwind CSS &amp; Gemini API.
          </p>
          <p className="text-[11px] text-zinc-400">
            © 2026 Azmil Ramadhan. Skor AI bersifat simulasi bantuan, keputusan seleksi
            sepenuhnya berada di tangan tim HR.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="https://linkedin.com/in/azmilbuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 font-semibold hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/50 transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            LinkedIn
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="https://github.com/azmilramadhan/ai-cv-matcher"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            Source Code
          </a>
        </div>
      </div>
    </footer>
  );
}