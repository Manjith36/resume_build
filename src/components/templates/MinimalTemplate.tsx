import type { ResumeData } from '../../types/resume';
import { formatDate } from '../../types/resume';

/**
 * Minimal Template
 * - Single-column, generous whitespace, thin hairline dividers
 * - Inter throughout (clean sans-serif)
 * - Monochrome — black text, light gray dividers, no color blocks
 * - Ultra-clean, design-focused — suits creative/design roles
 */
export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, projects, education, certifications, skills } = data;
  const hasContact = personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedinUrl || personalInfo.portfolioUrl;
  const hasExperience = experience.some(e => e.role || e.company);
  const hasProjects = projects.some(p => p.title);
  const hasEducation = education.some(e => e.degree || e.institution);
  const hasCertifications = certifications.some(c => c.name);
  const hasSkills = skills.length > 0;
  const hasSummary = summary.trim().length > 0;

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: 14,
  };

  const dividerStyle: React.CSSProperties = {
    height: 1,
    backgroundColor: '#e5e5e5',
    margin: '20px 0',
    border: 'none',
  };

  return (
    <div className="resume-page" style={{ fontFamily: "'Inter', sans-serif", padding: '52px 56px' }}>
      {/* ── Header ── */}
      <div style={{ marginBottom: 8 }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 300,
          color: '#1a1a1a',
          letterSpacing: '-0.02em',
        }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {hasContact && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px 16px',
            fontSize: 11,
            color: '#777',
            marginTop: 8,
          }}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedinUrl && <span>{personalInfo.linkedinUrl}</span>}
            {personalInfo.portfolioUrl && <span>{personalInfo.portfolioUrl}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {hasSummary && (
        <>
          <hr style={dividerStyle} />
          <div>
            <h2 style={sectionTitleStyle}>About</h2>
            <p style={{ fontSize: 11, lineHeight: 1.8, color: '#444' }}>{summary}</p>
          </div>
        </>
      )}

      {/* Experience */}
      {hasExperience && (
        <>
          <hr style={dividerStyle} />
          <div>
            <h2 style={sectionTitleStyle}>Experience</h2>
            {experience.filter(e => e.role || e.company).map((exp, i) => (
              <div key={exp.id} className="experience-card" style={{
                marginBottom: 18,
                paddingBottom: i < experience.filter(e => e.role || e.company).length - 1 ? 18 : 0,
                borderBottom: i < experience.filter(e => e.role || e.company).length - 1
                  ? '1px solid #f0f0f0'
                  : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                    {exp.role}
                  </h3>
                  {(exp.startDate || exp.endDate !== undefined) && (
                    <span style={{ fontSize: 10, color: '#aaa', whiteSpace: 'nowrap' }}>
                      {formatDate(exp.startDate)}{exp.startDate && (exp.endDate !== undefined) ? ' — ' : ''}{formatDate(exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <p style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{exp.company}</p>
                )}
                {exp.description && (
                  <p style={{ fontSize: 11, lineHeight: 1.7, color: '#555', marginTop: 8 }}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Education */}
      {hasEducation && (
        <>
          <hr style={dividerStyle} />
          <div>
            <h2 style={sectionTitleStyle}>Education</h2>
            {education.filter(e => e.degree || e.institution).map((edu) => (
              <div key={edu.id} className="education-card" style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                      {edu.degree}
                    </h3>
                    {edu.institution && (
                      <p style={{ fontSize: 11, color: '#888', marginTop: 1 }}>{edu.institution}</p>
                    )}
                  </div>
                  {(edu.startDate || edu.endDate !== undefined) && (
                    <span style={{ fontSize: 10, color: '#aaa', whiteSpace: 'nowrap' }}>
                      {formatDate(edu.startDate)}{edu.startDate && (edu.endDate !== undefined) ? ' — ' : ''}{formatDate(edu.endDate)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Skills */}
      {hasSkills && (
        <>
          <hr style={dividerStyle} />
          <div className="skills-section">
            <h2 style={sectionTitleStyle}>Skills</h2>
            <ul style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              columnGap: 16,
              rowGap: 8,
              margin: 0,
              padding: 0,
              paddingLeft: 16,
              listStyleType: 'disc',
            }}>
              {skills.map((skill, i) => (
                <li key={i} style={{
                  color: '#555',
                  fontSize: 11,
                  lineHeight: 1.5,
                }}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Projects */}
      {hasProjects && (
        <>
          <hr style={dividerStyle} />
          <div>
            <h2 style={sectionTitleStyle}>Projects</h2>
            {projects.filter(p => p.title).map((proj, i) => (
              <div key={proj.id} className="experience-card" style={{
                marginBottom: 18,
                paddingBottom: i < projects.filter(p => p.title).length - 1 ? 18 : 0,
                borderBottom: i < projects.filter(p => p.title).length - 1
                  ? '1px solid #f0f0f0'
                  : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                    {proj.title}
                  </h3>
                  {(proj.startDate || proj.endDate !== undefined) && (
                    <span style={{ fontSize: 10, color: '#aaa', whiteSpace: 'nowrap' }}>
                      {formatDate(proj.startDate)}{proj.startDate && (proj.endDate !== undefined) ? ' — ' : ''}{formatDate(proj.endDate)}
                    </span>
                  )}
                </div>
                {proj.technologies && (
                  <p style={{ fontSize: 10, color: '#999', fontStyle: 'italic', marginTop: 2 }}>
                    {proj.technologies}
                  </p>
                )}
                {proj.description && (
                  <p style={{ fontSize: 11, lineHeight: 1.7, color: '#555', marginTop: 8 }}>
                    {proj.description}
                  </p>
                )}
                {proj.url && (
                  <p style={{ fontSize: 10, color: '#888', marginTop: 4 }}>
                    {proj.url}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Certifications */}
      {hasCertifications && (
        <>
          <hr style={dividerStyle} />
          <div className="skills-section">
            <h2 style={sectionTitleStyle}>Certifications</h2>
            {certifications.filter(c => c.name).map((cert) => (
              <div key={cert.id} className="education-card" style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                      {cert.name}
                    </h3>
                    {cert.issuer && (
                      <p style={{ fontSize: 11, color: '#888', marginTop: 1 }}>{cert.issuer}</p>
                    )}
                  </div>
                  {cert.date && (
                    <span style={{ fontSize: 10, color: '#aaa', whiteSpace: 'nowrap' }}>
                      {formatDate(cert.date)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
