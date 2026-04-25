'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Wand2, CheckCircle, AlertCircle, FileText, Code2, Eye } from 'lucide-react';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import ResumeInput from '@/components/ResumeInput';
import JobInput from '@/components/JobInput';
import ProjectSelector from '@/components/ProjectSelector';
import TypstEditor from '@/components/TypstEditor';
import PdfPreview from '@/components/PdfPreview';
import AdModal from '@/components/AdModal';
import BuyCoinsModal from '@/components/BuyCoinsModal';
import ProfileManager from '@/components/ProfileManager';
import ResumeBuilder from '@/components/ResumeBuilder';
import TailorModal from '@/components/TailorModal';
import { useAuth } from '@/hooks/useAuth';
import { useStreamingTailor } from '@/hooks/useStreamingTailor';
import { useTypstCompiler } from '@/hooks/useTypstCompiler';
import { ProfileProvider, useProfile } from '@/context/ProfileContext';
import { profileProjectToProject } from '@/types';
import { extractTextFromPdfFile, readTextFile } from '@/lib/pdf';

type ToastKind = 'success' | 'error';
interface ToastState { type: ToastKind; message: string; }
type MobileTab = 'inputs' | 'editor' | 'preview';

// Inner component — must be inside ProfileProvider
function AppWorkspace() {
  const { user, coins, spend, earnFromAd, earnFromPurchase } = useAuth();
  const { projects } = useProfile();
  const { output, isStreaming, error: tailorError, startTailor } = useStreamingTailor();
  const { isReady, isCompiling, error: compileError, pdfUrl, compileToPdf } = useTypstCompiler();

  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [typstCode, setTypstCode] = useState('');
  const [resumeImporting, setResumeImporting] = useState(false);
  const [typstImporting, setTypstImporting] = useState(false);
  const [resumeSourceLabel, setResumeSourceLabel] = useState<string | null>(null);
  const [typstSourceLabel, setTypstSourceLabel] = useState<string | null>(null);
  const [showAdModal, setShowAdModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileManager, setShowProfileManager] = useState(false);
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);
  const [showTailorModal, setShowTailorModal] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>('inputs');
  const [toast, setToast] = useState<ToastState | null>(null);
  const [toastExiting, setToastExiting] = useState(false);
  const prevIsStreamingRef = useRef(false);
  const compileStatus = compileError ? 'error' : pdfUrl ? 'success' : null;

  const showToast = useCallback((type: ToastKind, message: string) => {
    setToastExiting(false);
    setToast({ type, message });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const exitTimer = setTimeout(() => setToastExiting(true), 2300);
    const clearTimer = setTimeout(() => { setToast(null); setToastExiting(false); }, 2500);
    return () => { clearTimeout(exitTimer); clearTimeout(clearTimer); };
  }, [toast]);

  useEffect(() => {
    if (output) setTypstCode(output);
  }, [output]);

  useEffect(() => {
    if (prevIsStreamingRef.current && !isStreaming && !tailorError) {
      showToast('success', 'Resume tailored successfully.');
      // Auto-switch to editor tab on mobile when streaming finishes
      setMobileTab('editor');
    }
    prevIsStreamingRef.current = isStreaming;
  }, [isStreaming, tailorError, showToast]);

  const toggleProject = useCallback((name: string) => {
    setSelectedProjects((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  }, []);

  const handleCompile = useCallback(async () => {
    if (!typstCode.trim()) { showToast('error', 'No Typst code to compile yet.'); return; }
    await compileToPdf(typstCode);
  }, [compileToPdf, showToast, typstCode]);

  const handleDownload = useCallback(() => {
    if (!pdfUrl) { showToast('error', 'Compile first to generate a PDF.'); return; }
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'tailored-resume.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, [pdfUrl, showToast]);

  const handleResumePdfUpload = useCallback(async (file: File) => {
    setResumeImporting(true);
    try {
      const extracted = await extractTextFromPdfFile(file);
      if (!extracted.trim()) { showToast('error', 'No text could be extracted from that PDF.'); return; }
      setResume(extracted);
      setResumeSourceLabel(file.name);
      setTypstCode('');
      setTypstSourceLabel(null);
      showToast('success', `Imported resume text from ${file.name}.`);
    } catch { showToast('error', 'Could not read that PDF. Try another resume file.'); }
    finally { setResumeImporting(false); }
  }, [showToast]);

  const handleTypstUpload = useCallback(async (file: File) => {
    setTypstImporting(true);
    try {
      const text = await readTextFile(file);
      if (!text.trim()) { showToast('error', 'That Typst file is empty.'); return; }
      setResume(text);
      setTypstCode(text);
      setResumeSourceLabel(file.name);
      setTypstSourceLabel(file.name);
      showToast('success', `Loaded Typst from ${file.name}.`);
    } catch { showToast('error', 'Could not read that Typst file.'); }
    finally { setTypstImporting(false); }
  }, [showToast]);

  const handleTailor = useCallback(async () => {
    if (!user) { setShowAuthModal(true); return; }
    if (!resume.trim() || !jobDescription.trim()) { showToast('error', 'Add your resume and job description first.'); return; }
    setShowTailorModal(true);
  }, [user, resume, jobDescription, showToast]);

  const handleTailorConfirm = useCallback(async (model: 'standard' | 'advanced') => {
    const cost = model === 'standard' ? 1 : 5;
    if (coins < cost) { showToast('error', 'Not enough coins.'); return; }
    const spendSucceeded = await spend(model);
    if (!spendSucceeded) { showToast('error', 'Unable to spend coins right now. Try again.'); return; }
    const selectedProfileProjects = projects
      .filter((p) => selectedProjects.includes(p.name))
      .map(profileProjectToProject);
    await startTailor({ resume, jobDescription, selectedProjects: selectedProfileProjects, model });
  }, [coins, jobDescription, projects, resume, selectedProjects, spend, startTailor]);

  const handleAdReward = useCallback(async () => {
    try { await earnFromAd(); showToast('success', 'You earned 1 coin.'); }
    catch { showToast('error', 'We could not credit the ad reward yet. Please try again.'); }
  }, [earnFromAd, showToast]);

  const handlePurchaseReward = useCallback(async (amount: number) => {
    try { await earnFromPurchase(amount); showToast('success', `Purchase confirmed. ${amount} coins added.`); }
    catch { showToast('error', 'Payment completed, but coins could not be credited yet. Refresh the page and try again.'); }
  }, [earnFromPurchase, showToast]);

  const inputsPanel = (
    <section className="panel panel--inputs">
      <ResumeInput
        value={resume}
        onChange={setResume}
        onUploadPdf={handleResumePdfUpload}
        isImporting={resumeImporting}
        sourceLabel={resumeSourceLabel}
      />
      <JobInput value={jobDescription} onChange={setJobDescription} />
      <ProjectSelector selected={selectedProjects} onToggle={toggleProject} />

      <div className="tailor-section">
        <button
          className="tailor-btn"
          onClick={handleTailor}
          disabled={isStreaming || !resume.trim() || !jobDescription.trim()}
          type="button"
        >
          {isStreaming ? (
            <><span className="spinner" /> Tailoring…</>
          ) : (
            <><Wand2 size={16} aria-hidden="true" /> Tailor Resume</>
          )}
          <span className="tailor-btn__cost">1–5 coins</span>
        </button>

        <div className="input-row" style={{ marginTop: 8 }}>
          <button className="btn btn--gold btn--full" onClick={() => setShowAdModal(true)} type="button">
            Watch Ad (+1)
          </button>
          <button className="btn btn--primary btn--full" onClick={() => setShowBuyModal(true)} type="button">
            Buy Coins
          </button>
        </div>

        <button
          className="btn btn--secondary btn--full"
          onClick={() => setShowResumeBuilder(true)}
          type="button"
          style={{ marginTop: 8 }}
        >
          Resume from Scratch
        </button>

        {(tailorError || compileError) && (
          <p style={{ marginTop: 10, fontSize: '0.78rem', color: 'var(--error)' }}>
            {tailorError || compileError}
          </p>
        )}
      </div>
    </section>
  );

  const outputPanel = (
    <section className="panel panel--output">
      <TypstEditor
        code={typstCode}
        onChange={setTypstCode}
        onUploadTypst={handleTypstUpload}
        isStreaming={isStreaming}
        onCompile={handleCompile}
        onDownload={handleDownload}
        isCompiling={isCompiling}
        compileStatus={compileStatus}
        isImporting={typstImporting}
        sourceLabel={typstSourceLabel}
      />
      <PdfPreview pdfUrl={pdfUrl} isCompiling={isCompiling} compilerReady={isReady} />
    </section>
  );

  return (
    <div className="app">
      <Header onOpenProfile={() => setShowProfileManager(true)} />

      <main className="main">
        {/* Desktop: side-by-side */}
        <div className="workspace workspace--desktop">
          {inputsPanel}
          {outputPanel}
        </div>

        {/* Mobile: tabbed panels */}
        <div className="workspace workspace--mobile">
          <div className={`mobile-panel${mobileTab === 'inputs' ? ' mobile-panel--active' : ''}`}>
            {inputsPanel}
          </div>
          <div className={`mobile-panel${mobileTab === 'editor' ? ' mobile-panel--active' : ''}`}>
            <section className="panel panel--output" style={{ height: '100%' }}>
              <TypstEditor
                code={typstCode}
                onChange={setTypstCode}
                onUploadTypst={handleTypstUpload}
                isStreaming={isStreaming}
                onCompile={handleCompile}
                onDownload={handleDownload}
                isCompiling={isCompiling}
                compileStatus={compileStatus}
                isImporting={typstImporting}
                sourceLabel={typstSourceLabel}
              />
            </section>
          </div>
          <div className={`mobile-panel${mobileTab === 'preview' ? ' mobile-panel--active' : ''}`}>
            <section className="panel panel--output" style={{ height: '100%' }}>
              <PdfPreview pdfUrl={pdfUrl} isCompiling={isCompiling} compilerReady={isReady} />
            </section>
          </div>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav" aria-label="Panel navigation">
        <button
          className={`mobile-nav__tab${mobileTab === 'inputs' ? ' mobile-nav__tab--active' : ''}`}
          onClick={() => setMobileTab('inputs')}
          type="button"
        >
          <FileText size={18} aria-hidden="true" />
          <span>Inputs</span>
        </button>
        <button
          className={`mobile-nav__tab${mobileTab === 'editor' ? ' mobile-nav__tab--active' : ''}`}
          onClick={() => setMobileTab('editor')}
          type="button"
        >
          <Code2 size={18} aria-hidden="true" />
          <span>Editor</span>
          {isStreaming && <span className="mobile-nav__dot" />}
        </button>
        <button
          className={`mobile-nav__tab${mobileTab === 'preview' ? ' mobile-nav__tab--active' : ''}`}
          onClick={() => setMobileTab('preview')}
          type="button"
        >
          <Eye size={18} aria-hidden="true" />
          <span>Preview</span>
          {pdfUrl && <span className="mobile-nav__dot mobile-nav__dot--success" />}
        </button>
      </nav>

      <footer className="footer">
        Tailoring costs 1–5 coins. Watch an ad or buy a pack to top up.
      </footer>

      <AdModal isOpen={showAdModal} onClose={() => setShowAdModal(false)} onComplete={handleAdReward} />
      <BuyCoinsModal isOpen={showBuyModal} onClose={() => setShowBuyModal(false)} onComplete={handlePurchaseReward} userEmail={user?.email ?? null} />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <TailorModal isOpen={showTailorModal} onClose={() => setShowTailorModal(false)} coins={coins} onConfirm={handleTailorConfirm} />
      <ProfileManager isOpen={showProfileManager} onClose={() => setShowProfileManager(false)} onOpenResumeBuilder={() => setShowResumeBuilder(true)} />
      <ResumeBuilder isOpen={showResumeBuilder} onClose={() => setShowResumeBuilder(false)} onGenerate={(typst) => setTypstCode(typst)} />

      {toast && (
        <div className={`toast ${toast.type === 'error' ? 'toast--error' : 'toast--success'}${toastExiting ? ' toast--exiting' : ''}`}>
          {toast.type === 'error' ? <AlertCircle size={16} aria-hidden="true" /> : <CheckCircle size={16} aria-hidden="true" />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default function AppPage() {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (!loading && !user) {
    return (
      <div className="app">
        <Header />
        <AuthModal isOpen={true} onClose={() => setShowAuthModal(false)} />
        {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />}
      </div>
    );
  }

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
    <ProfileProvider>
      <AppWorkspace />
    </ProfileProvider>
  );
}
