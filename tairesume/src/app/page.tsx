import Link from 'next/link';

export default function Home() {
  return (
    <div className="landing">
      <div className="landing__glow landing__glow--a" />
      <div className="landing__glow landing__glow--b" />

      <header className="landing-header">
        <div className="landing-header__brand">Tai<span>Resume</span></div>
        <nav className="landing-header__nav">
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/app" className="btn btn--primary">Open App</Link>
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero">
          <p className="hero__eyebrow">AI-powered Resume tailoring</p>
          <h1 className="hero__title">Sign up and get 5 free coins - tailor your first 5 resumes instantly.</h1>
          <p className="hero__subtitle">
            Paste your resume, drop in a job description, and generate an optimized version in seconds.
            Compile in-browser and export a clean PDF without leaving the page.
          </p>
          <div className="hero__actions">
            <Link href="/app" className="btn btn--primary btn--large">Start Tailoring</Link>
            <Link href="/pricing" className="btn btn--secondary btn--large">See Coin Packs</Link>
          </div>
        </section>

        <section className="landing-grid" id="features">
          <article className="landing-card">
            <h3>Tailor Fast</h3>
            <p>Streamed AI output updates your resume in real time while you review and edit.</p>
          </article>
          <article className="landing-card">
            <h3>Compile Instantly</h3>
            <p>Typst WASM runs in-browser so you can compile and preview PDFs with one click.</p>
          </article>
          <article className="landing-card">
            <h3>Earn or Buy Coins</h3>
            <p>Top up via rewarded ads or Paystack. Your balance and transactions stay synced.</p>
          </article>
        </section>

        <section className="pricing" id="pricing">
          <h2>Simple Coin Economy</h2>
          <div className="pricing__grid">
            <div className="pricing__item">
              <span>Google sign up bonus</span>
              <strong>+5</strong>
            </div>
            <div className="pricing__item">
              <span>Watch rewarded ad</span>
              <strong>+1</strong>
            </div>
            <div className="pricing__item">
              <span>Paystack purchase</span>
              <strong>+10</strong>
            </div>
            <div className="pricing__item">
              <span>Each tailor run</span>
              <strong>-1</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
