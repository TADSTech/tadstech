'use client';

import { useRef, type ChangeEvent } from 'react';

interface ResumeInputProps {
  value: string;
  onChange: (value: string) => void;
  onUploadPdf: (file: File) => Promise<void>;
  isImporting: boolean;
  sourceLabel: string | null;
}

export default function ResumeInput({ value, onChange, onUploadPdf, isImporting, sourceLabel }: ResumeInputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    await onUploadPdf(file);
  };

  return (
    <div className="card">
      <div className="card__header">
        <label className="card__label">Your Resume</label>
        <div className="card__actions">
          <button className="btn btn--ghost btn--sm" onClick={() => fileInputRef.current?.click()} disabled={isImporting} type="button">
            {isImporting ? <span className="spinner" /> : 'Upload PDF'}
          </button>
          <input ref={fileInputRef} type="file" accept="application/pdf" hidden onChange={handleFileChange} />
        </div>
      </div>

      {sourceLabel && <p className="card__meta">Imported from {sourceLabel}</p>}

      <textarea
        className="textarea textarea--mono"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Paste Typst here, or upload a PDF to extract your resume first.

#set page(margin: 0.7in)
#set text(font: "Aptos", size: 10pt)

#text(size: 22pt, weight: "bold")[Your Name]
#text(size: 11pt)[Your Title]

== Experience
...`}
        spellCheck={false}
      />

      <p className="card__hint">Upload a PDF to extract text automatically, or paste Typst manually.</p>
    </div>
  );
}
