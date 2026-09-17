import { useResume } from '../context/ResumeContext';
import type { TemplateType } from '../types/resume';

const templates: { id: TemplateType; name: string; description: string; colors: string[]; icon: string }[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional & Corporate',
    colors: ['#1e3a5f', '#ffffff', '#eef2f7'],
    icon: '📄',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Tech & Startup',
    colors: ['#1a1a2e', '#16a085', '#ffffff'],
    icon: '🚀',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean & Design-focused',
    colors: ['#1a1a1a', '#999999', '#ffffff'],
    icon: '✨',
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Creative & Eye-catching',
    colors: ['#6c3483', '#2980b9', '#f0ecf5'],
    icon: '🎨',
  },
];

export default function TemplateSelector() {
  const { state, dispatch } = useResume();
  const { selectedTemplate } = state;

  return (
    <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
      {templates.map((t) => (
        <button
          key={t.id}
          className={`template-card ${selectedTemplate === t.id ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: t.id })}
          style={{ minWidth: 150, flexShrink: 0 }}
        >
          {/* Color swatches */}
          <div style={{
            display: 'flex',
            gap: 4,
            justifyContent: 'center',
            marginBottom: 8,
          }}>
            {t.colors.map((color, i) => (
              <div key={i} style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: color,
                border: '1px solid rgba(255,255,255,0.15)',
              }} />
            ))}
          </div>
          <div style={{ fontSize: 20, marginBottom: 4 }}>{t.icon}</div>
          <p style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: 2,
          }}>
            {t.name}
          </p>
          <p style={{
            fontSize: 11,
            color: 'var(--color-text-muted)',
          }}>
            {t.description}
          </p>
        </button>
      ))}
    </div>
  );
}
