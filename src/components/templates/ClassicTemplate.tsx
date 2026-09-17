import type { ResumeData } from '../../types/resume';
import { formatDate } from '../../types/resume';

/**
 * Classic Template
 * - Single-column, top-aligned navy header bar
 * - Merriweather (serif headings) + Inter (body)
 * - Traditional, conservative — suited for corporate
 */
export default function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, projects, education, certifications, skills } = data;
  const hasContact = personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedinUrl || personalInfo.portfolioUrl;
  const hasExperience = experience.some(e => e.role || e.company);
  const hasProjects = projects.some(p => p.title);
  const hasEducation = education.some(e => e.degree || e.institution);
  const hasCertifications = certifications.some(c => c.name);
  const hasSkills = skills.length > 0;
  const hasSummary = summary.trim().length > 0;

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: "'Merriweather', serif",
    fontSize: 14,
    fontWeight: 700,
    color: '#1e3a5f',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    paddingBottom: 6,
    borderBottom: '2px solid #1e3a5f',
    marginBottom: 14,
  };

  return (
    <div className="resume-page" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Header ── */}
      <div style={{
        backgroundColor: '#1e3a5f',
        color: 'white',
        padding: '36px 48px 28px',
      }}>
        <h1 style={{
          fontFamily: "'Merriweather', serif",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: '-0.01em',
        }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {hasContact && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px 20px',
            fontSize: 11,
            marginTop: 10,
            opacity: 0.85,
          }}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedinUrl && <span>{personalInfo.linkedinUrl}</span>}
            {personalInfo.portfolioUrl && <span>{personalInfo.portfolioUrl}</span>}
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '28px 48px 40px' }}>
        {/* Summary */}
        {hasSummary && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={sectionTitleStyle}>Professional Summary</h2>
            <p style={{ fontSize: 11, lineHeight: 1.75, color: '#333' }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {hasExperience && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={sectionTitleStyle}>Work Experience</h2>
            {experience.filter(e => e.role || e.company).map((exp) => (
              <div key={exp.id} className="experience-card" style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{
                      fontFamily: "'Merriweather', serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#1a1a1a',
                    }}>
                      {exp.role}
                    </h3>
                    {exp.company && (
                      <p style={{ fontSize: 12, color: '#1e3a5f', fontWeight: 500, marginTop: 1 }}>
                        {exp.company}
                      </p>
                    )}
                  </div>
                  {(exp.startDate || exp.endDate !== undefined) && (
                    <span style={{ fontSize: 10, color: '#777', whiteSpace: 'nowrap', fontStyle: 'italic' }}>
                      {formatDate(exp.startDate)}{exp.startDate && (exp.endDate !== undefined) ? ' – ' : ''}{formatDate(exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.description && (
                  <p style={{ fontSize: 11, lineHeight: 1.7, color: '#444', marginTop: 6 }}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {hasEducation && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={sectionTitleStyle}>Education</h2>
            {education.filter(e => e.degree || e.institution).map((edu) => (
              <div key={edu.id} className="education-card" style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                      {edu.degree}
                    </h3>
                    {edu.institution && (
                      <p style={{ fontSize: 12, color: '#1e3a5f', marginTop: 1 }}>
                        {edu.institution}
                      </p>
                    )}
                  </div>
                  {(edu.startDate || edu.endDate !== undefined) && (
                    <span style={{ fontSize: 10, color: '#777', whiteSpace: 'nowrap', fontStyle: 'italic' }}>
                      {formatDate(edu.startDate)}{edu.startDate && (edu.endDate !== undefined) ? ' – ' : ''}{formatDate(edu.endDate)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {hasSkills && (
          <div className="skills-section" style={{ marginBottom: 24 }}>
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
                  color: '#444',
                  fontSize: 11,
                  lineHeight: 1.5,
                }}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Projects */}
        {hasProjects && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={sectionTitleStyle}>Projects</h2>
            {projects.filter(p => p.title).map((proj) => (
              <div key={proj.id} className="experience-card" style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{
                      fontFamily: "'Merriweather', serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#1a1a1a',
                    }}>
                      {proj.title}
                    </h3>
                    {proj.technologies && (
                      <p style={{ fontSize: 11, color: '#1e3a5f', fontStyle: 'italic', marginTop: 2 }}>
                        {proj.technologies}
                      </p>
                    )}
                  </div>
                  {(proj.startDate || proj.endDate !== undefined) && (
                    <span style={{ fontSize: 10, color: '#777', whiteSpace: 'nowrap', fontStyle: 'italic' }}>
                      {formatDate(proj.startDate)}{proj.startDate && (proj.endDate !== undefined) ? ' – ' : ''}{formatDate(proj.endDate)}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <p style={{ fontSize: 11, lineHeight: 1.7, color: '#444', marginTop: 6 }}>
                    {proj.description}
                  </p>
                )}
                {proj.url && (
                  <p style={{ fontSize: 10, color: '#1e3a5f', marginTop: 4 }}>
                    {proj.url}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {hasCertifications && (
          <div className="skills-section">
            <h2 style={sectionTitleStyle}>Certifications</h2>
            {certifications.filter(c => c.name).map((cert) => (
              <div key={cert.id} className="education-card" style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                      {cert.name}
                    </h3>
                    {cert.issuer && (
                      <p style={{ fontSize: 12, color: '#1e3a5f', marginTop: 1 }}>
                        {cert.issuer}
                      </p>
                    )}
                    {cert.credentialId && (
                      <p style={{ fontSize: 10, color: '#777', marginTop: 2 }}>
                        ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                  {cert.date && (
                    <span style={{ fontSize: 10, color: '#777', whiteSpace: 'nowrap', fontStyle: 'italic' }}>
                      {formatDate(cert.date)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
