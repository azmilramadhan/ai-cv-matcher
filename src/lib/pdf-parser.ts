export async function extractTextFromPdf(file: File): Promise<string> {
  if (file.type !== 'application/pdf') {
    throw new Error('Format file tidak didukung. Harap unggah file .pdf');
  }

  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ');
    fullText += pageText + '\n\n';
  }

  const cleanedText = fullText.replace(/\s+/g, ' ').trim();

  if (!cleanedText || cleanedText.length < 30) {
    throw new Error(
      'Teks tidak terbaca. Pastikan file PDF bukan hasil scan gambar, atau tempel teks CV secara manual.'
    );
  }

  return cleanedText;
}