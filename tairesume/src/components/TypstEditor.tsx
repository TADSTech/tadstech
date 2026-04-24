'use client';

interface TypstEditorProps {
  code: string;
  onChange: (code: string) => void;
  isStreaming: boolean;
  onCompile: () => void;
  onDownload: () => void;
  isCompiling: boolean;
  compileStatus: string | null;
}

export default function TypstEditor({
  code,
  onChange,
  isStreaming,
  onCompile,
  onDownload,
  isCompiling,
  compileStatus,
}: TypstEditorProps) {
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
            onClick={onCompile}
            disabled={!code || isCompiling || isStreaming}
            title="Compile to PDF"
          >
            {isCompiling ? <span className="spinner" /> : '▶'} Compile
          </button>
          <button
            className="btn btn--ghost"
            onClick={onDownload}
            disabled={!code}
            title="Download PDF"
          >
            ↓ PDF
          </button>
          <button
            className="btn btn--ghost"
            onClick={() => navigator.clipboard.writeText(code)}
            disabled={!code}
            title="Copy Typst code"
          >
            Copy
          </button>
        </div>
      </div>

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
