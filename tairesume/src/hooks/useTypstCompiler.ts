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
  var __typstInitialized: boolean | undefined;
}

// Module-level flag — survives React Strict Mode double-mount
// because module scope is not reset between mounts.
let typstInitStarted = false;

export function useTypstCompiler(): UseTypstCompilerReturn {
  const [isReady, setIsReady] = useState(() => !!globalThis.__typstInitialized);
  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [svgHtml, setSvgHtml] = useState<string | null>(null);
  const prevPdfUrl = useRef<string | null>(null);

  useEffect(() => {
    // Already fully initialized — nothing to do
    if (globalThis.__typstInitialized) {
      setIsReady(true);
      return;
    }

    // Script load already kicked off by a previous mount — wait for it
    if (typstInitStarted) return;
    typstInitStarted = true;

    // Reuse an existing script tag if present (e.g. from a previous HMR cycle)
    const existing = document.getElementById('typst-loader');
    if (existing) {
      // Script already in DOM — $typst may already be available
      if (typeof globalThis.$typst !== 'undefined' && !globalThis.__typstInitialized) {
        try {
          globalThis.$typst.setCompilerInitOptions({
            getModule: () =>
              'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm',
          });
          globalThis.$typst.setRendererInitOptions({
            getModule: () =>
              'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm',
          });
          globalThis.__typstInitialized = true;
          setIsReady(true);
        } catch {
          // Already initialized by a previous call — treat as ready
          globalThis.__typstInitialized = true;
          setIsReady(true);
        }
      }
      return;
    }

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
          globalThis.__typstInitialized = true;
          setIsReady(true);
        }
      } catch {
        // $typst already initialized — still mark as ready
        globalThis.__typstInitialized = true;
        setIsReady(true);
      }
    });

    script.addEventListener('error', () => {
      setError('Failed to load Typst compiler');
      typstInitStarted = false; // allow retry
    });

    document.head.appendChild(script);

    return () => {
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
