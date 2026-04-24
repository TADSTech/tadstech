'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface UseTypstCompilerReturn {
  isReady: boolean;
  isCompiling: boolean;
  error: string | null;
  pdfUrl: string | null;
  svgHtml: string | null;
  compileToPdf: (code: string) => Promise<void>;
  compileToSvg: (code: string) => Promise<void>;
}

// Declare the global $typst variable from the all-in-one bundle
declare global {
  var $typst: {
    setCompilerInitOptions: (opts: { getModule: () => string }) => void;
    setRendererInitOptions: (opts: { getModule: () => string }) => void;
    pdf: (opts: { mainContent: string }) => Promise<Uint8Array>;
    svg: (opts: { mainContent: string }) => Promise<string>;
  };
}

export function useTypstCompiler(): UseTypstCompilerReturn {
  const [isReady, setIsReady] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [svgHtml, setSvgHtml] = useState<string | null>(null);
  const prevPdfUrl = useRef<string | null>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    // Load the all-in-one-lite bundle script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst.ts/dist/esm/contrib/all-in-one-lite.bundle.js';
    script.id = 'typst-loader';

    script.addEventListener('load', () => {
      try {
        if (typeof globalThis.$typst !== 'undefined') {
          globalThis.$typst.setCompilerInitOptions({
            getModule: () =>
              'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm',
          });
          globalThis.$typst.setRendererInitOptions({
            getModule: () =>
              'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm',
          });
          setIsReady(true);
        }
      } catch (err) {
        console.error('Typst init error:', err);
        setError('Failed to initialize Typst compiler');
      }
    });

    script.addEventListener('error', () => {
      setError('Failed to load Typst compiler');
    });

    document.head.appendChild(script);

    return () => {
      // Cleanup old PDF URLs
      if (prevPdfUrl.current) {
        URL.revokeObjectURL(prevPdfUrl.current);
      }
    };
  }, []);

  const compileToPdf = useCallback(async (code: string) => {
    if (!isReady || !globalThis.$typst) {
      setError('Compiler not ready');
      return;
    }

    setIsCompiling(true);
    setError(null);

    try {
      const pdfData = await globalThis.$typst.pdf({ mainContent: code });

      // Revoke old URL
      if (prevPdfUrl.current) {
        URL.revokeObjectURL(prevPdfUrl.current);
      }

      const arrayBuffer = pdfData.buffer.slice(
        pdfData.byteOffset,
        pdfData.byteOffset + pdfData.byteLength
      ) as ArrayBuffer;
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      prevPdfUrl.current = url;
      setPdfUrl(url);
    } catch (err) {
      console.error('Typst compile error:', err);
      setError(err instanceof Error ? err.message : 'Compilation failed');
    } finally {
      setIsCompiling(false);
    }
  }, [isReady]);

  const compileToSvg = useCallback(async (code: string) => {
    if (!isReady || !globalThis.$typst) {
      setError('Compiler not ready');
      return;
    }

    setIsCompiling(true);
    setError(null);

    try {
      const svg = await globalThis.$typst.svg({ mainContent: code });
      setSvgHtml(svg);
    } catch (err) {
      console.error('Typst SVG error:', err);
      setError(err instanceof Error ? err.message : 'SVG render failed');
    } finally {
      setIsCompiling(false);
    }
  }, [isReady]);

  return { isReady, isCompiling, error, pdfUrl, svgHtml, compileToPdf, compileToSvg };
}
