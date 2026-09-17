import { useRef, useState, useEffect } from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import ResumeForm from './components/ResumeForm';
import TemplateSelector from './components/TemplateSelector';
import ClassicTemplate from './components/templates/ClassicTemplate';
import ModernTemplate from './components/templates/ModernTemplate';
import MinimalTemplate from './components/templates/MinimalTemplate';
import BoldTemplate from './components/templates/BoldTemplate';
import { usePdfExport } from './hooks/usePdfExport';

// ─── Template Renderer ──────────────────────────────────────────────

function TemplateRenderer() {
  const { state } = useResume();
  const { resumeData, selectedTemplate } = state;

  switch (selectedTemplate) {
    case 'classic':
      return <ClassicTemplate data={resumeData} />;
    case 'modern':
      return <ModernTemplate data={resumeData} />;
    case 'minimal':
      return <MinimalTemplate data={resumeData} />;
    case 'bold':
      return <BoldTemplate data={resumeData} />;
    default:
      return <ClassicTemplate data={resumeData} />;
  }
}

// ─── Preview Panel ──────────────────────────────────────────────────

function PreviewPanel() {
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { exportPdf, isExporting } = usePdfExport();
  const { state } = useResume();
  const [scale, setScale] = useState(0.5);

  // Calculate scale to fit the container
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 32; // padding
        const resumeWidth = 794; // A4 width in px at 96 DPI
        const newScale = Math.min(containerWidth / resumeWidth, 0.75);
        setScale(Math.max(newScale, 0.3));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleExport = async () => {
    const filename = state.resumeData.personalInfo.fullName
      ? `${state.resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
      : 'Resume.pdf';
    await exportPdf(previewRef, filename);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Export button */}
      <div className="flex justify-end">
        <button
          className="btn-export"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.49-8.49l2.83-2.83M2 12h4m12 0h4m-3.93 7.07l-2.83-2.83M7.76 7.76L4.93 4.93" />
              </svg>
              Generating PDF...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export as PDF
            </>
          )}
        </button>
      </div>

      {/* Preview container */}
      <div ref={containerRef} className="preview-container">
        <div className="preview-scroll" style={{ padding: 16 }}>
          <div style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: 794,
          }}>
            <div ref={previewRef} style={{ width: 794 }}>
              <TemplateRenderer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App Layout ─────────────────────────────────────────────────────

function AppContent() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--color-border)',
        background: 'linear-gradient(180deg, var(--color-surface-100) 0%, var(--color-surface-50) 100%)',
      }}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, var(--color-accent-500), #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}>
                📋
              </div>
              <div>
                <h1 style={{
                  fontFamily: 'var(--font-outfit)',
                  fontSize: 20,
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                }}>
                  Resume Builder
                </h1>
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                  Build professional resumes in minutes
                </p>
              </div>
            </div>
            <div style={{
              fontSize: 11,
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'var(--color-success-500)',
              }} />
              Auto-saved
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Template Selector */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            marginBottom: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Choose Template
          </h2>
          <TemplateSelector />
        </div>

        {/* Form + Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Panel */}
          <div style={{
            maxHeight: 'calc(100vh - 220px)',
            overflowY: 'auto',
            paddingRight: 8,
          }}>
            <ResumeForm />
          </div>

          {/* Preview Panel */}
          <div>
            <PreviewPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Root ───────────────────────────────────────────────────────────

export default function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}
