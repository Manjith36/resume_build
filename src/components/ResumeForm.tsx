import { useState, type KeyboardEvent, type ChangeEvent } from 'react';
import { useResume } from '../context/ResumeContext';
import { createExperience, createEducation, createProject, createCertification } from '../types/resume';

// ─── Icons (inline SVGs) ────────────────────────────────────────────

const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
  </svg>
);

// ─── Section Accordion ──────────────────────────────────────────────

function Section({
  title,
  icon,
  defaultOpen = true,
  children,
}: {
  title: string;
  icon: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="section-card">
      <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>
          <span>{icon}</span>
          {title}
        </h3>
        <ChevronDown className={`chevron ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && (
        <div className="section-body animate-slideDown">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Main Form Component ────────────────────────────────────────────

export default function ResumeForm() {
  const { state, dispatch } = useResume();
  const { resumeData } = state;
  const { personalInfo, summary, experience, projects, education, certifications, skills } = resumeData;

  // ── Skills input ──
  const [skillInput, setSkillInput] = useState('');

  const addSkill = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !skills.includes(trimmed)) {
      dispatch({ type: 'SET_SKILLS', payload: [...skills, trimmed] });
    }
  };

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (skillInput.trim()) {
        addSkill(skillInput);
        setSkillInput('');
      }
    }
  };

  const handleSkillBlur = () => {
    if (skillInput.trim()) {
      addSkill(skillInput);
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    dispatch({ type: 'SET_SKILLS', payload: skills.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ── Personal Info ── */}
      <Section title="Personal Information" icon="👤" defaultOpen={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="John Doe"
              value={personalInfo.fullName}
              onChange={(e) =>
                dispatch({ type: 'SET_PERSONAL_INFO', payload: { fullName: e.target.value } })
              }
            />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="john@example.com"
              value={personalInfo.email}
              onChange={(e) =>
                dispatch({ type: 'SET_PERSONAL_INFO', payload: { email: e.target.value } })
              }
            />
          </div>
          <div>
            <label className="form-label">Phone</label>
            <input
              className="form-input"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={personalInfo.phone}
              onChange={(e) =>
                dispatch({ type: 'SET_PERSONAL_INFO', payload: { phone: e.target.value } })
              }
            />
          </div>
          <div>
            <label className="form-label">Location</label>
            <input
              className="form-input"
              type="text"
              placeholder="San Francisco, CA"
              value={personalInfo.location}
              onChange={(e) =>
                dispatch({ type: 'SET_PERSONAL_INFO', payload: { location: e.target.value } })
              }
            />
          </div>
          <div>
            <label className="form-label">LinkedIn URL</label>
            <input
              className="form-input"
              type="url"
              placeholder="https://linkedin.com/in/johndoe"
              value={personalInfo.linkedinUrl}
              onChange={(e) =>
                dispatch({ type: 'SET_PERSONAL_INFO', payload: { linkedinUrl: e.target.value } })
              }
            />
          </div>
          <div className="sm:col-span-2">
            <label className="form-label">Portfolio / Website</label>
            <input
              className="form-input"
              type="url"
              placeholder="https://johndoe.dev"
              value={personalInfo.portfolioUrl}
              onChange={(e) =>
                dispatch({ type: 'SET_PERSONAL_INFO', payload: { portfolioUrl: e.target.value } })
              }
            />
          </div>
        </div>
      </Section>

      {/* ── Professional Summary ── */}
      <Section title="Professional Summary" icon="📝" defaultOpen={true}>
        <div>
          <label className="form-label">Summary</label>
          <textarea
            className="form-input form-textarea"
            placeholder="A brief overview of your professional background, key skills, and career objectives..."
            value={summary}
            onChange={(e) => dispatch({ type: 'SET_SUMMARY', payload: e.target.value })}
            rows={4}
          />
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
            {summary.length} / 500 characters
          </p>
        </div>
      </Section>

      {/* ── Work Experience ── */}
      <Section title="Work Experience" icon="💼" defaultOpen={true}>
        <div className="flex flex-col gap-4">
          {experience.map((exp, index) => (
            <div key={exp.id} className="entry-card animate-fadeIn">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  Experience {index + 1}
                </span>
                <button
                  className="btn-danger"
                  onClick={() => dispatch({ type: 'REMOVE_EXPERIENCE', payload: exp.id })}
                >
                  <TrashIcon /> Remove
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Job Title</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Senior Software Engineer"
                    value={exp.role}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { id: exp.id, data: { role: e.target.value } },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Company</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Google"
                    value={exp.company}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { id: exp.id, data: { company: e.target.value } },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Start Date</label>
                  <input
                    className="form-input"
                    type="month"
                    value={exp.startDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { id: exp.id, data: { startDate: e.target.value } },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">End Date</label>
                  <input
                    className="form-input"
                    type="month"
                    value={exp.endDate ?? ''}
                    disabled={exp.isPresent}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { id: exp.id, data: { endDate: e.target.value } },
                      })
                    }
                    style={exp.isPresent ? { opacity: 0.4 } : undefined}
                  />
                  <div className="present-checkbox">
                    <input
                      type="checkbox"
                      id={`exp-present-${exp.id}`}
                      checked={exp.isPresent}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: 'UPDATE_EXPERIENCE',
                          payload: {
                            id: exp.id,
                            data: {
                              isPresent: e.target.checked,
                              endDate: e.target.checked ? null : '',
                            },
                          },
                        })
                      }
                    />
                    <label htmlFor={`exp-present-${exp.id}`}>Currently working here</label>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Describe your responsibilities, achievements, and impact..."
                    value={exp.description}
                    rows={3}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { id: exp.id, data: { description: e.target.value } },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            className="btn-primary"
            onClick={() =>
              dispatch({ type: 'ADD_EXPERIENCE', payload: createExperience() })
            }
          >
            <PlusIcon /> Add Experience
          </button>
        </div>
      </Section>

      {/* ── Education ── */}
      <Section title="Education" icon="🎓" defaultOpen={true}>
        <div className="flex flex-col gap-4">
          {education.map((edu, index) => (
            <div key={edu.id} className="entry-card animate-fadeIn">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  Education {index + 1}
                </span>
                <button
                  className="btn-danger"
                  onClick={() => dispatch({ type: 'REMOVE_EDUCATION', payload: edu.id })}
                >
                  <TrashIcon /> Remove
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Degree</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="B.S. Computer Science"
                    value={edu.degree}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_EDUCATION',
                        payload: { id: edu.id, data: { degree: e.target.value } },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Institution</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="MIT"
                    value={edu.institution}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_EDUCATION',
                        payload: { id: edu.id, data: { institution: e.target.value } },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Start Date</label>
                  <input
                    className="form-input"
                    type="month"
                    value={edu.startDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_EDUCATION',
                        payload: { id: edu.id, data: { startDate: e.target.value } },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">End Date</label>
                  <input
                    className="form-input"
                    type="month"
                    value={edu.endDate ?? ''}
                    disabled={edu.isPresent}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_EDUCATION',
                        payload: { id: edu.id, data: { endDate: e.target.value } },
                      })
                    }
                    style={edu.isPresent ? { opacity: 0.4 } : undefined}
                  />
                  <div className="present-checkbox">
                    <input
                      type="checkbox"
                      id={`edu-present-${edu.id}`}
                      checked={edu.isPresent}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: 'UPDATE_EDUCATION',
                          payload: {
                            id: edu.id,
                            data: {
                              isPresent: e.target.checked,
                              endDate: e.target.checked ? null : '',
                            },
                          },
                        })
                      }
                    />
                    <label htmlFor={`edu-present-${edu.id}`}>Currently studying here</label>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            className="btn-primary"
            onClick={() =>
              dispatch({ type: 'ADD_EDUCATION', payload: createEducation() })
            }
          >
            <PlusIcon /> Add Education
          </button>
        </div>
      </Section>

      {/* ── Projects ── */}
      <Section title="Projects" icon="🚀" defaultOpen={true}>
        <div className="flex flex-col gap-4">
          {projects.map((proj, index) => (
            <div key={proj.id} className="entry-card animate-fadeIn">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  Project {index + 1}
                </span>
                <button
                  className="btn-danger"
                  onClick={() => dispatch({ type: 'REMOVE_PROJECT', payload: proj.id })}
                >
                  <TrashIcon /> Remove
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Project Title</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="E-commerce Platform"
                    value={proj.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_PROJECT',
                        payload: { id: proj.id, data: { title: e.target.value } },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Project URL</label>
                  <input
                    className="form-input"
                    type="url"
                    placeholder="https://github.com/user/project"
                    value={proj.url}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_PROJECT',
                        payload: { id: proj.id, data: { url: e.target.value } },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Start Date</label>
                  <input
                    className="form-input"
                    type="month"
                    value={proj.startDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_PROJECT',
                        payload: { id: proj.id, data: { startDate: e.target.value } },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">End Date</label>
                  <input
                    className="form-input"
                    type="month"
                    value={proj.endDate ?? ''}
                    disabled={proj.isPresent}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_PROJECT',
                        payload: { id: proj.id, data: { endDate: e.target.value } },
                      })
                    }
                    style={proj.isPresent ? { opacity: 0.4 } : undefined}
                  />
                  <div className="present-checkbox">
                    <input
                      type="checkbox"
                      id={`proj-present-${proj.id}`}
                      checked={proj.isPresent}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: 'UPDATE_PROJECT',
                          payload: {
                            id: proj.id,
                            data: {
                              isPresent: e.target.checked,
                              endDate: e.target.checked ? null : '',
                            },
                          },
                        })
                      }
                    />
                    <label htmlFor={`proj-present-${proj.id}`}>Ongoing project</label>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="form-label">Technologies Used</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="React, Node.js, PostgreSQL"
                    value={proj.technologies}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_PROJECT',
                        payload: { id: proj.id, data: { technologies: e.target.value } },
                      })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Describe the project, your role, and key outcomes..."
                    value={proj.description}
                    rows={3}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      dispatch({
                        type: 'UPDATE_PROJECT',
                        payload: { id: proj.id, data: { description: e.target.value } },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            className="btn-primary"
            onClick={() =>
              dispatch({ type: 'ADD_PROJECT', payload: createProject() })
            }
          >
            <PlusIcon /> Add Project
          </button>
        </div>
      </Section>

      {/* ── Certifications ── */}
      <Section title="Certifications" icon="🏆" defaultOpen={true}>
        <div className="flex flex-col gap-4">
          {certifications.map((cert, index) => (
            <div key={cert.id} className="entry-card animate-fadeIn">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  Certification {index + 1}
                </span>
                <button
                  className="btn-danger"
                  onClick={() => dispatch({ type: 'REMOVE_CERTIFICATION', payload: cert.id })}
                >
                  <TrashIcon /> Remove
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Certification Name</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="AWS Solutions Architect"
                    value={cert.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_CERTIFICATION',
                        payload: { id: cert.id, data: { name: e.target.value } },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Issuing Organization</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Amazon Web Services"
                    value={cert.issuer}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_CERTIFICATION',
                        payload: { id: cert.id, data: { issuer: e.target.value } },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Date Obtained</label>
                  <input
                    className="form-input"
                    type="month"
                    value={cert.date}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_CERTIFICATION',
                        payload: { id: cert.id, data: { date: e.target.value } },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Credential ID</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="ABC-123-XYZ"
                    value={cert.credentialId}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_CERTIFICATION',
                        payload: { id: cert.id, data: { credentialId: e.target.value } },
                      })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="form-label">Credential URL</label>
                  <input
                    className="form-input"
                    type="url"
                    placeholder="https://www.credly.com/badges/..."
                    value={cert.credentialUrl}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: 'UPDATE_CERTIFICATION',
                        payload: { id: cert.id, data: { credentialUrl: e.target.value } },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            className="btn-primary"
            onClick={() =>
              dispatch({ type: 'ADD_CERTIFICATION', payload: createCertification() })
            }
          >
            <PlusIcon /> Add Certification
          </button>
        </div>
      </Section>

      {/* ── Skills ── */}
      <Section title="Skills" icon="⚡" defaultOpen={true}>
        <div>
          <label className="form-label">Add Skills</label>
          <input
            className="form-input"
            type="text"
            placeholder="Type a skill and press Enter to add..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            onBlur={handleSkillBlur}
          />
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {skills.map((skill, i) => (
                <span key={i} className="skill-tag animate-fadeIn">
                  {skill}
                  <button onClick={() => removeSkill(i)} title="Remove skill">×</button>
                </span>
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
