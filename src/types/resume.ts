// ─── Resume Data Model ───────────────────────────────────────────────

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  portfolioUrl: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  startDate: string;       // "YYYY-MM" from <input type="month">
  endDate: string | null;  // null when isPresent is true
  isPresent: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string | null;
  isPresent: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  url: string;
  startDate: string;
  endDate: string | null;
  isPresent: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;            // "YYYY-MM" — date obtained
  credentialUrl: string;
  credentialId: string;
}

export type TemplateType = 'classic' | 'modern' | 'minimal' | 'bold';

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  skills: string[];
}

export interface AppState {
  resumeData: ResumeData;
  selectedTemplate: TemplateType;
}

// ─── Defaults ────────────────────────────────────────────────────────

export const emptyPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedinUrl: '',
  portfolioUrl: '',
};

export const emptyResumeData: ResumeData = {
  personalInfo: { ...emptyPersonalInfo },
  summary: '',
  experience: [],
  projects: [],
  education: [],
  certifications: [],
  skills: [],
};

export const defaultAppState: AppState = {
  resumeData: { ...emptyResumeData },
  selectedTemplate: 'classic',
};

// ─── Helpers ─────────────────────────────────────────────────────────

let _idCounter = 0;

export function createExperience(): WorkExperience {
  return {
    id: `exp-${Date.now()}-${_idCounter++}`,
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    isPresent: false,
    description: '',
  };
}

export function createEducation(): Education {
  return {
    id: `edu-${Date.now()}-${_idCounter++}`,
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    isPresent: false,
  };
}

export function createProject(): Project {
  return {
    id: `proj-${Date.now()}-${_idCounter++}`,
    title: '',
    description: '',
    technologies: '',
    url: '',
    startDate: '',
    endDate: '',
    isPresent: false,
  };
}

export function createCertification(): Certification {
  return {
    id: `cert-${Date.now()}-${_idCounter++}`,
    name: '',
    issuer: '',
    date: '',
    credentialUrl: '',
    credentialId: '',
  };
}

/**
 * Format a "YYYY-MM" date string into "MMM YYYY" (e.g. "2024-09" → "Sep 2024").
 * Returns "Present" for null values, empty string for empty/invalid input.
 */
export function formatDate(date: string | null): string {
  if (date === null) return 'Present';
  if (!date) return '';
  const [year, month] = date.split('-');
  if (!year || !month) return date;
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const monthIndex = parseInt(month, 10) - 1;
  if (monthIndex < 0 || monthIndex > 11) return date;
  return `${monthNames[monthIndex]} ${year}`;
}
