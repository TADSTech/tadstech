'use client';

interface ResumeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ResumeInput({ value, onChange }: ResumeInputProps) {
  return (
    <div className="card">
      <label className="card__label">Your Resume (Typst)</label>
      <textarea
        className="textarea textarea--mono"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`#set page(margin: 0.7in)
#set text(font: "Aptos", size: 10pt)

#text(size: 22pt, weight: "bold")[Your Name]
#text(size: 11pt)[Your Title]

== Experience
...`}
        spellCheck={false}
      />
    </div>
  );
}
