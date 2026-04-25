import { PersonalInfo, Experience, ProfileProject } from '@/types';

/**
 * Generates a complete Typst resume document from profile data.
 * Returns a valid Typst string ready to paste into the editor.
 */
export function generateTypstResume(
  personalInfo: PersonalInfo,
  experience: Experience[],
  projects: ProfileProject[],
): string {
  const name = personalInfo.fullName || 'Your Name';
  const title = personalInfo.jobTitle || 'Your Title';
  const email = personalInfo.email || '';
  const phone = personalInfo.phone || '';
  const location = personalInfo.location || '';
  const linkedIn = personalInfo.linkedIn || '';
  const github = personalInfo.github || '';
  const portfolio = personalInfo.portfolio || '';
  const summary = personalInfo.summary || '';

  // Build contact line
  const contactParts = [email, phone, location, linkedIn, github, portfolio].filter(Boolean);
  const contactLine = contactParts.join(' · ');

  // Build experience section
  const experienceSection = experience.length > 0
    ? experience.map((e) => {
        const dateRange = [e.startDate, e.endDate].filter(Boolean).join(' – ');
        const locationStr = e.location ? ` · ${e.location}` : '';
        const skillsStr = e.skills.length > 0
          ? `\n  #text(size: 9pt, style: "italic")[Skills: ${e.skills.join(', ')}]`
          : '';
        return `=== ${e.jobTitle}${e.company ? ` — ${e.company}` : ''}
#text(size: 9pt, fill: gray)[${dateRange}${locationStr}]

${e.description || '// Add your responsibilities and achievements here'}
${skillsStr}`;
      }).join('\n\n')
    : `// No experience entries yet — add them in your Profile
=== Job Title — Company
#text(size: 9pt, fill: gray)[Start Date – End Date · Location]

- Responsibility or achievement
- Another key contribution`;

  // Build projects section
  const projectsSection = projects.length > 0
    ? projects.map((p) => {
        const dateRange = [p.startDate, p.endDate].filter(Boolean).join(' – ');
        const skillsStr = p.skills.length > 0
          ? `\n#text(size: 9pt, style: "italic")[${p.skills.join(', ')}]`
          : '';
        return `=== ${p.name}
#text(size: 9pt, fill: gray)[${dateRange}]

${p.description || '// Add a description of this project'}
${skillsStr}`;
      }).join('\n\n')
    : `// No projects yet — add them in your Profile
=== Project Name
#text(size: 9pt, fill: gray)[Start Date – End Date]

Brief description of the project and your role.`;

  return `#set page(
  paper: "a4",
  margin: (top: 0.7in, bottom: 0.7in, left: 0.65in, right: 0.65in),
)
#set text(font: "Libertinus Serif", size: 10pt)
#set par(justify: true, leading: 0.65em)
#show heading.where(level: 2): it => [
  #v(0.4em)
  #text(size: 11pt, weight: "bold")[#it.body]
  #line(length: 100%, stroke: 0.5pt)
  #v(0.2em)
]
#show heading.where(level: 3): it => [
  #text(size: 10pt, weight: "bold")[#it.body]
]

// ── Header ────────────────────────────────────────────────────────────────────

#align(center)[
  #text(size: 22pt, weight: "bold")[${name}]
  #linebreak()
  #text(size: 12pt, fill: gray)[${title}]
  #linebreak()
  #text(size: 9pt)[${contactLine}]
]

#v(0.6em)

${summary ? `// ── Summary ──────────────────────────────────────────────────────────────────

== Summary

${summary}

#v(0.4em)
` : ''}
// ── Experience ────────────────────────────────────────────────────────────────

== Experience

${experienceSection}

#v(0.4em)

// ── Projects ──────────────────────────────────────────────────────────────────

== Projects

${projectsSection}
`;
}
