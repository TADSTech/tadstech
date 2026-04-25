'use client';

import { Loader } from 'lucide-react';

interface PdfPreviewProps {
  pdfUrl: string | null;
  isCompiling: boolean;
  compilerReady: boolean;
}

export default function PdfPreview({ pdfUrl, isCompiling, compilerReady }: PdfPreviewProps) {
  return (
    <div className="preview-wrapper">
      <div className="preview-toolbar">
        <span className="editor-toolbar__label">PDF Preview</span>
        {isCompiling && (
          <span className="editor-toolbar__status" style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Loader size={14} className="spin" aria-hidden="true" /> Compiling…
          </span>
        )}
        {!compilerReady && (
          <span className="editor-toolbar__status" style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Loader size={14} className="spin" aria-hidden="true" /> Loading compiler…
          </span>
        )}
      </div>

      {pdfUrl ? (
        <iframe
          className="preview-frame"
          src={pdfUrl}
          title="PDF Preview"
        />
      ) : (
        <div className="preview-placeholder">
          {isCompiling
            ? 'Compiling...'
            : 'PDF preview will appear here after compilation'}
        </div>
      )}
    </div>
  );
}
