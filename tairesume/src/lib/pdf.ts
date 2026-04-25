'use client';

import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs';

let workerConfigured = false;

function configurePdfWorker() {
  if (workerConfigured) {
    return;
  }

  GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url).toString();
  workerConfigured = true;
}

export async function extractTextFromPdfFile(file: File): Promise<string> {
  configurePdfWorker();

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = getDocument({
    data: new Uint8Array(arrayBuffer),
    disableStream: true,
    disableAutoFetch: true,
    useWorkerFetch: false,
    isEvalSupported: false,
    disableFontFace: true,
  });

  const pdf = await loadingTask.promise;
  const pageTexts: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (pageText) {
      pageTexts.push(pageText);
    }

    page.cleanup();
  }

  await pdf.destroy();

  return pageTexts.join('\n\n').trim();
}

export async function readTextFile(file: File): Promise<string> {
  return file.text();
}