'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import ResumeInput from '@/components/ResumeInput';
import JobInput from '@/components/JobInput';
import ProjectSelector from '@/components/ProjectSelector';
import TypstEditor from '@/components/TypstEditor';
import PdfPreview from '@/components/PdfPreview';
import AdModal from '@/components/AdModal';
import BuyCoinsModal from '@/components/BuyCoinsModal';
import { useAuth } from '@/hooks/useAuth';
import { useStreamingTailor } from '@/hooks/useStreamingTailor';
import { useTypstCompiler } from '@/hooks/useTypstCompiler';
import { getProjects } from '@/lib/projects';

type ToastKind = 'success' | 'error';

interface ToastState {
  type: ToastKind;
  message: string;
}

const DEFAULT_MODEL = 'standard' as const;
const DEFAULT_COST = 1;

export default function AppPage() {
  const router = useRouter();
  const projects = useMemo(() => getProjects(), []);
  const { user, coins, loading, signInWithGoogle, spend, earnFromAd, earnFromPurchase } = useAuth();
  const { output, isStreaming, error: tailorError, startTailor } = useStreamingTailor();
  const {
    isReady,
    isCompiling,
    error: compileError,
    pdfUrl,
    compileToPdf,
  } = useTypstCompiler();

  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [typstCode, setTypstCode] = useState('');
  const [showAdModal, setShowAdModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const compileStatus = compileError ? 'error' : pdfUrl ? 'success' : null;

  // Auth guard: redirect to home if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const showToast = useCallback((type: ToastKind, message: string) => {
    setToast({ type, message });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (output) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTypstCode(output);
    }
  }, [output]);

  const toggleProject = useCallback((name: string) => {
    setSelectedProjects((prev) => {
      if (prev.includes(name)) {
        return prev.filter((p) => p !== name);
      }
      return [...prev, name];
    });
  }, []);

  const handleCompile = useCallback(async () => {
    if (!typstCode.trim()) {
      showToast('error', 'No Typst code to compile yet.');
      return;
    }

    await compileToPdf(typstCode);
  }, [compileToPdf, showToast, typstCode]);

  const handleDownload = useCallback(() => {
    if (!pdfUrl) {
      showToast('error', 'Compile first to generate a PDF.');
      return;
    }

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'tailored-resume.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, [pdfUrl, showToast]);

  const handleTailor = useCallback(async () => {
    if (!user) {
      await signInWithGoogle();
      return;
    }

    if (!resume.trim() || !jobDescription.trim()) {
      showToast('error', 'Add your resume and job description first.');
      return;
    }

    if (coins < DEFAULT_COST) {
      showToast('error', 'Not enough coins.');
      return;
    }

    const spendSucceeded = await spend(DEFAULT_MODEL);
    if (!spendSucceeded) {
      showToast('error', 'Unable to spend coins right now. Try again.');
      return;
    }

    await startTailor({
      resume,
      jobDescription,
      selectedProjects: projects.filter((project) => selectedProjects.includes(project.name)),
      model: DEFAULT_MODEL,
    });
  }, [
    coins,
    jobDescription,
    projects,
    resume,
    selectedProjects,
    showToast,
    signInWithGoogle,
    spend,
    startTailor,
    user,
  ]);

  const handleAdReward = useCallback(async () => {
    await earnFromAd();
    showToast('success', 'You earned 1 coin.');
  }, [earnFromAd, showToast]);

  const handlePurchaseReward = useCallback(async () => {
    await earnFromPurchase();
    showToast('success', 'Purchase confirmed. 10 coins added.');
  }, [earnFromPurchase, showToast]);

  // Show loading state while auth check is in progress
  if (loading || !user) {
    return (
      <div className="app">
        <Header />
        <main className="main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="spinner" style={{ marginBottom: '1rem' }} />
            <p>Loading workspace...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />

      <main className="main">
        <div className="workspace">
          <section className="panel panel--inputs">
            <ResumeInput value={resume} onChange={setResume} />
            <JobInput value={jobDescription} onChange={setJobDescription} />
            <ProjectSelector
              projects={projects}
              selected={selectedProjects}
              onToggle={toggleProject}
            />

            <div className="tailor-section">
              <button
                className="tailor-btn"
                onClick={handleTailor}
                disabled={isStreaming || !resume.trim() || !jobDescription.trim()}
                type="button"
              >
                {isStreaming ? <span className="spinner" /> : 'Tailor Resume'}
                <span className="tailor-btn__cost">{DEFAULT_COST} coin</span>
              </button>

              <div className="input-row" style={{ marginTop: 8 }}>
                <button className="btn btn--secondary btn--full" onClick={() => setShowAdModal(true)} type="button">
                  Watch Ad (+1)
                </button>
                <button className="btn btn--primary btn--full" onClick={() => setShowBuyModal(true)} type="button">
                  Buy Coins (+10)
                </button>
              </div>

              {(tailorError || compileError) && (
                <p style={{ marginTop: 10, fontSize: '0.78rem', color: 'var(--error)' }}>
                  {tailorError || compileError}
                </p>
              )}
            </div>
          </section>

          <section className="panel panel--output">
            <TypstEditor
              code={typstCode}
              onChange={setTypstCode}
              isStreaming={isStreaming}
              onCompile={handleCompile}
              onDownload={handleDownload}
              isCompiling={isCompiling}
              compileStatus={compileStatus}
            />
            <PdfPreview pdfUrl={pdfUrl} isCompiling={isCompiling} compilerReady={isReady} />
          </section>
        </div>
      </main>

      <footer className="footer">
        Tailoring costs 1 coin per run. Need more credits? Watch an ad or buy a pack.
      </footer>

      <AdModal isOpen={showAdModal} onClose={() => setShowAdModal(false)} onComplete={handleAdReward} />
      <BuyCoinsModal
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
        onComplete={handlePurchaseReward}
        userEmail={user?.email ?? null}
      />

      {toast && (
        <div className={`toast ${toast.type === 'error' ? 'toast--error' : 'toast--success'}`}>
          <span>{toast.type === 'error' ? '!' : 'OK'}</span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
