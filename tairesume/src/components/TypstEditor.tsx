'use client';

import { useRef, type ChangeEvent } from 'react';

interface TypstEditorProps {
  code: string;
  onChange: (code: string) => void;
  onUploadTypst: (file: File) => Promise<void>;
  isStreaming: boolean;
  onCompile: () => void;
  onDownload: () => void;
  isCompiling: boolean;
  compileStatus: string | null;
  isImporting: boolean;
  sourceLabel: string | null;
}

export default function TypstEditor({
  code,
  onChange,
  onUploadTypst,
  isStreaming,
  onCompile,
  onDownload,
  isCompiling,
  compileStatus,
  isImporting,
  sourceLabel,
}: TypstEditorProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    await onUploadTypst(file);
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-toolbar">
        <div className="editor-toolbar__left">
          <span className="editor-toolbar__label">Typst Output</span>
          {isStreaming && (
            <span className="editor-toolbar__status" style={{ color: 'var(--accent)' }}>
              <span className="spinner" /> streaming...
            </span>
          )}
          {compileStatus && !isStreaming && (
            <span className={`editor-toolbar__status ${compileStatus === 'error' ? 'editor-toolbar__status--error' : ''}`}>
              {compileStatus === 'error' ? '✗ compile error' : '✓ compiled'}
            </span>
          )}
        </div>
        <div className="editor-toolbar__right">
          <button
            className="btn btn--ghost"
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting || isStreaming}
            title="Upload Typst file"
            type="button"
          >
            {isImporting ? <span className="spinner" /> : 'Upload'}
          </button>
          <input ref={fileInputRef} type="file" accept=".typ,.typst,.txt,text/plain,application/octet-stream" hidden onChange={handleFileChange} />
          <button
            className="btn btn--ghost"
            onClick={onCompile}
            disabled={!code || isCompiling || isStreaming}
            type="button"
            title="Compile to PDF"
          >
            {isCompiling ? <span className="spinner" /> : '▶'} Compile
          </button>
          <button
            className="btn btn--ghost"
            onClick={onDownload}
            disabled={!code}
            type="button"
            title="Download PDF"
          >
            ↓ PDF
          </button>
          <button
            className="btn btn--ghost"
            onClick={() => navigator.clipboard.writeText(code)}
            disabled={!code}
            type="button"
            title="Copy Typst code"
          >
            Copy
          </button>
        </div>
      </div>

      {sourceLabel && <p className="editor-source-label">Loaded from {sourceLabel}</p>}

      <textarea
        className="editor-textarea"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tailored Typst code will appear here...&#10;&#10;You can also paste or type Typst code directly to compile."
        spellCheck={false}
      />
      {isStreaming && <span className="streaming-cursor" />}
    </div>
  );
}
