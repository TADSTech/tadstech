'use client';

import { useRef, useCallback, type ChangeEvent } from 'react';
import { Upload, Play, Download, Copy, Loader, CheckCircle, AlertCircle, FileCode } from 'lucide-react';

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
    if (!file) return;
    await onUploadTypst(file);
  };

  const handleSaveTypst = useCallback(() => {
    if (!code.trim()) return;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.typ';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [code]);

  return (
    <div className="editor-wrapper">
      <div className="editor-toolbar">
        <div className="editor-toolbar__left">
          <span className="editor-toolbar__label">Typst</span>
          {isStreaming && (
            <span className="status-badge status-badge--streaming">
              <Loader size={14} className="spin" aria-hidden="true" /> Streaming…
            </span>
          )}
          {compileStatus && !isStreaming && (
            compileStatus === 'error' ? (
              <span className="status-badge status-badge--error">
                <AlertCircle size={14} aria-hidden="true" /> Error
              </span>
            ) : (
              <span className="status-badge status-badge--success">
                <CheckCircle size={14} aria-hidden="true" /> Compiled
              </span>
            )
          )}
        </div>
        <div className="editor-toolbar__right">
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting || isStreaming}
            title="Upload .typ file"
            type="button"
            aria-label="Upload .typ file"
          >
            {isImporting ? (
              <Loader size={15} className="spin" aria-hidden="true" />
            ) : (
              <Upload size={15} aria-hidden="true" />
            )}
          </button>
          <input ref={fileInputRef} type="file" accept=".typ,.typst,.txt,text/plain,application/octet-stream" hidden onChange={handleFileChange} />

          <button
            className="btn btn--ghost btn--sm"
            onClick={handleSaveTypst}
            disabled={!code}
            type="button"
            title="Save as .typ file"
            aria-label="Save as .typ file"
          >
            <FileCode size={15} aria-hidden="true" />
          </button>

          <button
            className="btn btn--ghost btn--sm"
            onClick={() => navigator.clipboard.writeText(code)}
            disabled={!code}
            type="button"
            title="Copy Typst code"
            aria-label="Copy Typst code"
          >
            <Copy size={15} aria-hidden="true" />
          </button>

          <button
            className="btn btn--secondary btn--sm toolbar-btn--text"
            onClick={onCompile}
            disabled={!code || isCompiling || isStreaming}
            type="button"
            title="Compile to PDF"
          >
            {isCompiling ? (
              <><Loader size={14} className="spin" aria-hidden="true" /><span className="toolbar-btn__label"> Compiling…</span></>
            ) : (
              <><Play size={14} aria-hidden="true" /><span className="toolbar-btn__label"> Compile</span></>
            )}
          </button>

          <button
            className="btn btn--primary btn--sm toolbar-btn--text"
            onClick={onDownload}
            disabled={!code}
            type="button"
            title="Download PDF"
          >
            <Download size={14} aria-hidden="true" /><span className="toolbar-btn__label"> PDF</span>
          </button>
        </div>
      </div>

      {sourceLabel && <p className="editor-source-label">Loaded from {sourceLabel}</p>}

      <textarea
        className="editor-textarea"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tailored Typst code will appear here…&#10;&#10;You can also paste or type Typst directly."
        spellCheck={false}
      />
      {isStreaming && <span className="streaming-cursor" />}
    </div>
  );
}
