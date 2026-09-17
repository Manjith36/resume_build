import type { ResumeData } from '../../types/resume';
import { formatDate } from '../../types/resume';

/**
 * Modern Template
 * - Two-column: dark sidebar (contact + skills), right main content
 * - Outfit (headings) + Inter (body)
 * - Dark charcoal sidebar (#1a1a2e), teal accents (#16a085)
 * - Contemporary, tech/startup feel
 */
export default function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, projects, education, certifications, skills } = data;
  const hasContact = personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedinUrl || personalInfo.portfolioUrl;
  const hasExperience = experience.some(e => e.role || e.company);
  const hasProjects = projects.some(p => p.title);
  const hasEducation = education.some(e => e.degree || e.institution);
  const hasCertifications = certifications.some(c => c.name);
  const hasSkills = skills.length > 0;
  const hasSummary = summary.trim().length > 0;

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: '#16a085',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    paddingBottom: 6,
    borderBottom: '2px solid #16a085',
    marginBottom: 14,
  };

  const sidebarTitleStyle: React.CSSProperties = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    color: '#16a085',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: 12,
    paddingBottom: 5,
    borderBottom: '1px solid rgba(22, 160, 133, 0.3)',
  };

  return (
    <div className="resume-page" style={{ fontFamily: "'Inter', sans-serif", display: 'flex' }}>
      {/* ── Left Sidebar (dark) ── */}
      <div style={{
        width: 240,
        flexShrink: 0,
        backgroundColor: '#1a1a2e',
        color: '#e0e0e0',
        padding: '36px 24px',
      }}>
        {/* Name in sidebar */}
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: 'white',
          lineHeight: 1.3,
          marginBottom: 20,
        }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>

        {/* Contact */}
        {hasContact && (
          <div style={{ marginBottom: 28 }}>
            <h3 style={sidebarTitleStyle}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11 }}>
              {personalInfo.email && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#16a085', flexShrink: 0 }}>✉</span>
                  <span style={{ wordBreak: 'break-all' }}>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#16a085', flexShrink: 0 }}>☎</span>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#16a085', flexShrink: 0 }}>📍</span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedinUrl && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#16a085', flexShrink: 0 }}>🔗</span>
                  <span style={{ wordBreak: 'break-all' }}>{personalInfo.linkedinUrl}</span>
                </div>
              )}
              {personalInfo.portfolioUrl && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#16a085', flexShrink: 0 }}>🌐</span>
                  <span style={{ wordBreak: 'break-all' }}>{personalInfo.portfolioUrl}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        {hasSkills && (
          <div className="skills-section" style={{ marginBottom: 28 }}>
            <h3 style={sidebarTitleStyle}>Skills</h3>
            <ul style={{ margin: 0, padding: 0, paddingLeft: 16, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {skills.map((skill, i) => (
                <li key={i} style={{
                  color: 'white',
                  fontSize: 11,
                  lineHeight: 1.4,
                }}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Education in sidebar */}
        {hasEducation && (
          <div>
            <h3 style={sidebarTitleStyle}>Education</h3>
            {education.filter(e => e.degree || e.institution).map((edu) => (
              <div key={edu.id} className="education-card" style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'white', lineHeight: 1.3 }}>
                  {edu.degree}
                </p>
                {edu.institution && (
                  <p style={{ fontSize: 10, color: '#aaa', marginTop: 2 }}>{edu.institution}</p>
                )}
                {(edu.startDate || edu.endDate !== undefined) && (
                  <p style={{ fontSize: 10, color: '#16a085', marginTop: 3 }}>
                    {formatDate(edu.startDate)}{edu.startDate && (edu.endDate !== undefined) ? ' – ' : ''}{formatDate(edu.endDate)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications in sidebar */}
        {hasCertifications && (
          <div style={{ marginTop: 20 }}>
            <h3 style={sidebarTitleStyle}>Certifications</h3>
            {certifications.filter(c => c.name).map((cert) => (
              <div key={cert.id} className="education-card" style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'white', lineHeight: 1.3 }}>
                  {cert.name}
                </p>
                {cert.issuer && (
                  <p style={{ fontSize: 10, color: '#aaa', marginTop: 2 }}>{cert.issuer}</p>
                )}
                {cert.date && (
                  <p style={{ fontSize: 10, color: '#16a085', marginTop: 3 }}>
                    {formatDate(cert.date)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Right Content ── */}
      <div style={{ flex: 1, padding: '36px 36px 40px' }}>
        {/* Summary */}
        {hasSummary && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={sectionTitleStyle}>Professional Summary</h2>
            <p style={{ fontSize: 11, lineHeight: 1.75, color: '#333' }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {hasExperience && (
          <div>
            <h2 style={sectionTitleStyle}>Work Experience</h2>
            {experience.filter(e => e.role || e.company).map((exp) => (
              <div key={exp.id} className="experience-card" style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#1a1a2e',
                    }}>
                      {exp.role}
                    </h3>
                    {exp.company && (
                      <p style={{ fontSize: 12, color: '#16a085', fontWeight: 500, marginTop: 1 }}>
                        {exp.company}
                      </p>
                    )}
                  </div>
                  {(exp.startDate || exp.endDate !== undefined) && (
                    <span style={{ fontSize: 10, color: '#888', whiteSpace: 'nowrap' }}>
                      {formatDate(exp.startDate)}{exp.startDate && (exp.endDate !== undefined) ? ' – ' : ''}{formatDate(exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.description && (
                  <p style={{
                    fontSize: 11,
                    lineHeight: 1.7,
                    color: '#444',
                    marginTop: 8,
                    paddingLeft: 12,
                    borderLeft: '3px solid #d0ece7',
                  }}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {hasProjects && (
          <div>
            <h2 style={sectionTitleStyle}>Projects</h2>
            {projects.filter(p => p.title).map((proj) => (
              <div key={proj.id} className="experience-card" style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#1a1a2e',
                    }}>
                      {proj.title}
                    </h3>
                    {proj.technologies && (
                      <p style={{ fontSize: 11, color: '#16a085', fontStyle: 'italic', marginTop: 2 }}>
                        {proj.technologies}
                      </p>
                    )}
                  </div>
                  {(proj.startDate || proj.endDate !== undefined) && (
                    <span style={{ fontSize: 10, color: '#888', whiteSpace: 'nowrap' }}>
                      {formatDate(proj.startDate)}{proj.startDate && (proj.endDate !== undefined) ? ' – ' : ''}{formatDate(proj.endDate)}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <p style={{
                    fontSize: 11,
                    lineHeight: 1.7,
                    color: '#444',
                    marginTop: 8,
                    paddingLeft: 12,
                    borderLeft: '3px solid #d0ece7',
                  }}>
                    {proj.description}
                  </p>
                )}
                {proj.url && (
                  <p style={{ fontSize: 10, color: '#16a085', marginTop: 4 }}>
                    {proj.url}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
