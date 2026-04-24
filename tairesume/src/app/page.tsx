'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import ResumeInput from '@/components/ResumeInput';
import JobInput from '@/components/JobInput';
import ModelSelector from '@/components/ModelSelector';
import ProjectSelector from '@/components/ProjectSelector';
import TypstEditor from '@/components/TypstEditor';
import PdfPreview from '@/components/PdfPreview';
import AdModal from '@/components/AdModal';
import BuyCoinsModal from '@/components/BuyCoinsModal';
import { useAuth } from '@/hooks/useAuth';
import { useStreamingTailor } from '@/hooks/useStreamingTailor';
import { useTypstCompiler } from '@/hooks/useTypstCompiler';
import { getProjects } from '@/lib/projects';

type TailorModel = 'standard' | 'advanced';
type ToastKind = 'success' | 'error';

interface ToastState {
  type: ToastKind;
  message: string;
}

export default function Home() {
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
  const [model, setModel] = useState<TailorModel>('standard');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [typstCode, setTypstCode] = useState('');
  const [showAdModal, setShowAdModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const compileStatus = compileError ? 'error' : pdfUrl ? 'success' : null;

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

    const requiredCoins = model === 'standard' ? 1 : 5;
    if (coins < requiredCoins) {
      showToast('error', 'Not enough coins for this model.');
      return;
    }

    const spendSucceeded = await spend(model);
    if (!spendSucceeded) {
      showToast('error', 'Unable to spend coins right now. Try again.');
      return;
    }

    await startTailor({
      resume,
      jobDescription,
      selectedProjects: projects.filter((project) => selectedProjects.includes(project.name)),
      model,
    });
  }, [
    coins,
    jobDescription,
    model,
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
    showToast('success', 'You earned 5 coins.');
  }, [earnFromAd, showToast]);

  const handlePurchaseReward = useCallback(async () => {
    await earnFromPurchase();
    showToast('success', 'Purchase confirmed. 10 coins added.');
  }, [earnFromPurchase, showToast]);

  return (
    <div className="app">
      <Header />

      {!loading && !user && (
        <div className="signup-banner">
          <p className="signup-banner__text">
            <strong>Sign up and get 5 free coins</strong> — tailor your first 5 resumes instantly!
          </p>
          <button className="signup-banner__cta" onClick={signInWithGoogle} type="button">
            Sign in with Google
          </button>
        </div>
      )}

      <main className="main">
        <div className="workspace">
          <section className="panel panel--inputs">
            <ResumeInput value={resume} onChange={setResume} />
            <JobInput value={jobDescription} onChange={setJobDescription} />
            <ModelSelector model={model} onChange={setModel} coins={coins} />
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
                <span className="tailor-btn__cost">{model === 'standard' ? '1 coin' : '5 coins'}</span>
              </button>

              <div className="input-row" style={{ marginTop: 8 }}>
                <button className="btn btn--secondary btn--full" onClick={() => setShowAdModal(true)} type="button">
                  Watch Ad (+5)
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
        Standard uses NVIDIA Gemma 2 2B-IT (1 coin). Advanced uses Groq Llama 3.1 8B (5 coins).
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
          <span>{toast.type === 'error' ? '⚠' : '✓'}</span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
