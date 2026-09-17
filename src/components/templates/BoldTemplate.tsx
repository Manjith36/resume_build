import type { ResumeData } from '../../types/resume';
import { formatDate } from '../../types/resume';

/**
 * Bold Template
 * - Full-width gradient header (purple → indigo)
 * - Two-column body: left sidebar for contact + skills, right for content
 * - Outfit (headings) + Inter (body)
 * - Vibrant section markers
 *
 * ⚠ SPIKE: This template is built first to validate gradient + font rendering
 * through html2canvas → PDF export.
 */
export default function BoldTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, projects, education, certifications, skills } = data;
  const hasContact = personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedinUrl || personalInfo.portfolioUrl;
  const hasExperience = experience.some(e => e.role || e.company);
  const hasProjects = projects.some(p => p.title);
  const hasEducation = education.some(e => e.degree || e.institution);
  const hasCertifications = certifications.some(c => c.name);
  const hasSkills = skills.length > 0;
  const hasSummary = summary.trim().length > 0;

  return (
    <div className="resume-page" style={{ fontFamily: "'Inter', sans-serif", position: 'relative' }}>
      {/* ── Gradient Header ── */}
      {/* Using inline SVG background as fallback-safe approach for html2canvas */}
      <div
        style={{
          background: 'linear-gradient(135deg, #6c3483 0%, #2980b9 100%)',
          padding: '40px 48px 32px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -20,
          right: 60,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />

        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: 4,
          position: 'relative',
          zIndex: 1,
        }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>

        {hasContact && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px 20px',
            fontSize: 11,
            marginTop: 10,
            opacity: 0.9,
            position: 'relative',
            zIndex: 1,
          }}>
            {personalInfo.email && <span>✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span>☎ {personalInfo.phone}</span>}
            {personalInfo.location && <span>📍 {personalInfo.location}</span>}
            {personalInfo.linkedinUrl && <span>🔗 {personalInfo.linkedinUrl}</span>}
            {personalInfo.portfolioUrl && <span>🌐 {personalInfo.portfolioUrl}</span>}
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div style={{ display: 'flex', minHeight: 'calc(1123px - 140px)' }}>
        {/* ── Left Sidebar ── */}
        <div style={{
          width: 220,
          flexShrink: 0,
          backgroundColor: '#f0ecf5',
          padding: '28px 22px',
        }}>
          {/* Skills in sidebar */}
          {hasSkills && (
            <div className="skills-section" style={{ marginBottom: 28 }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#6c3483',
                marginBottom: 14,
                paddingBottom: 6,
                borderBottom: '2px solid #6c3483',
              }}>
                Skills
              </h3>
              <ul style={{ margin: 0, padding: 0, paddingLeft: 16, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {skills.map((skill, i) => (
                  <li key={i} style={{
                    color: '#444',
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
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#6c3483',
                marginBottom: 14,
                paddingBottom: 6,
                borderBottom: '2px solid #6c3483',
              }}>
                Education
              </h3>
              {education.filter(e => e.degree || e.institution).map((edu) => (
                <div key={edu.id} className="education-card" style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e', lineHeight: 1.4 }}>
                    {edu.degree}
                  </p>
                  {edu.institution && (
                    <p style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{edu.institution}</p>
                  )}
                  {(edu.startDate || edu.endDate !== undefined) && (
                    <p style={{ fontSize: 10, color: '#888', marginTop: 3 }}>
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
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#6c3483',
                marginBottom: 14,
                paddingBottom: 6,
                borderBottom: '2px solid #6c3483',
              }}>
                Certifications
              </h3>
              {certifications.filter(c => c.name).map((cert) => (
                <div key={cert.id} className="education-card" style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e', lineHeight: 1.4 }}>
                    {cert.name}
                  </p>
                  {cert.issuer && (
                    <p style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{cert.issuer}</p>
                  )}
                  {cert.date && (
                    <p style={{ fontSize: 10, color: '#888', marginTop: 3 }}>
                      {formatDate(cert.date)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right Content ── */}
        <div style={{ flex: 1, padding: '28px 36px' }}>
          {/* Summary */}
          {hasSummary && (
            <div style={{ marginBottom: 24 }}>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#2980b9',
                marginBottom: 10,
                paddingBottom: 6,
                borderBottom: '2px solid #2980b9',
              }}>
                Professional Summary
              </h2>
              <p style={{ fontSize: 11, lineHeight: 1.7, color: '#333' }}>{summary}</p>
            </div>
          )}

          {/* Experience */}
          {hasExperience && (
            <div>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#2980b9',
                marginBottom: 10,
                paddingBottom: 6,
                borderBottom: '2px solid #2980b9',
              }}>
                Work Experience
              </h2>
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
                        <p style={{
                          fontSize: 12,
                          color: '#6c3483',
                          fontWeight: 500,
                          marginTop: 2,
                        }}>
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
                      lineHeight: 1.65,
                      color: '#444',
                      marginTop: 8,
                      paddingLeft: 12,
                      borderLeft: '3px solid #e8ddf0',
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
            <div style={{ marginTop: 24 }}>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#2980b9',
                marginBottom: 10,
                paddingBottom: 6,
                borderBottom: '2px solid #2980b9',
              }}>
                Projects
              </h2>
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
                        <p style={{
                          fontSize: 11,
                          color: '#6c3483',
                          fontStyle: 'italic',
                          marginTop: 2,
                        }}>
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
                      lineHeight: 1.65,
                      color: '#444',
                      marginTop: 8,
                      paddingLeft: 12,
                      borderLeft: '3px solid #e8ddf0',
                    }}>
                      {proj.description}
                    </p>
                  )}
                  {proj.url && (
                    <p style={{ fontSize: 10, color: '#6c3483', marginTop: 4 }}>
                      {proj.url}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
