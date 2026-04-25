import Link from 'next/link';

const featureCards = [
  {
    title: 'Streamed tailoring',
    description: 'Watch your resume rewrite itself in real time as the model adapts to the job description.',
  },
  {
    title: 'Typst in the browser',
    description: 'Compile and preview PDFs locally with WASM, without waiting on a server-side build queue.',
  },
  {
    title: 'Coin wallet economy',
    description: 'Sign up bonuses, rewarded ads, and Paystack top-ups keep the workflow simple.',
  },
  {
    title: 'Project highlighting',
    description: 'Bring the most relevant work forward so your strongest proof points stay in view.',
  },
  {
    title: 'Job scraping',
    description: 'Paste a job link and pull in the description for faster tailoring.',
  },
  {
    title: 'Responsive output',
    description: 'Edit, recompile, and export a polished resume from one workspace.',
  },
];

export default function FeaturesPage() {
  return (
    <div className="page-shell">
      <header className="landing-header">
        <div className="landing-header__brand">Tai<span>Resume</span></div>
        <nav className="landing-header__nav">
          <Link href="/" className="btn btn--ghost">Home</Link>
          <Link href="/pricing" className="btn btn--ghost">Pricing</Link>
          <Link href="/app" className="btn btn--primary">Open App</Link>
        </nav>
      </header>

      <main className="content-page">
        <section className="content-hero">
          <p className="hero__eyebrow">Features</p>
          <h1 className="hero__title">Everything built to turn one strong resume into many targeted versions.</h1>
          <p className="hero__subtitle">
            TaiResume combines coin-based access, live AI tailoring, and Typst compilation into a single flow.
          </p>
        </section>

        <section className="feature-grid">
          {featureCards.map((feature) => (
            <article key={feature.title} className="landing-card landing-card--feature">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
