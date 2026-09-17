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
  fullName: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '(555) 123-4567',
  location: 'San Francisco, CA',
  linkedinUrl: 'linkedin.com/in/janedoe',
  portfolioUrl: 'janedoe.dev',
};

export const emptyResumeData: ResumeData = {
  personalInfo: { ...emptyPersonalInfo },
  summary: 'Passionate and results-driven Software Engineer with 5+ years of experience in designing and developing scalable web applications. Proven ability to lead full-stack teams, optimize performance, and deliver robust software solutions that drive business growth.',
  experience: [
    {
      id: 'exp-example-1',
      role: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      startDate: '2021-03',
      endDate: null,
      isPresent: true,
      description: '• Spearheaded the migration of a legacy monolithic architecture to highly scalable microservices using Node.js and Docker, reducing latency by 40%.\n• Mentored a team of 4 junior developers and established CI/CD best practices.\n• Improved database query performance by 60% through aggressive indexing and caching strategies.',
    },
    {
      id: 'exp-example-2',
      role: 'Full Stack Developer',
      company: 'Creative Digital Agency',
      startDate: '2018-06',
      endDate: '2021-02',
      isPresent: false,
      description: '• Developed and deployed over 15 dynamic web applications for high-profile clients using React and TypeScript.\n• Collaborated closely with UI/UX designers to translate complex wireframes into responsive, accessible interfaces.\n• Implemented automated end-to-end testing, increasing test coverage to 85%.',
    }
  ],
  projects: [
    {
      id: 'proj-example-1',
      title: 'Open Source E-Commerce Platform',
      description: 'A fully open-source headless e-commerce solution that supports thousands of concurrent users. Features real-time inventory tracking and secure payment gateway integration.',
      technologies: 'Next.js, Tailwind CSS, Stripe API, PostgreSQL',
      url: 'github.com/janedoe/ecommerce',
      startDate: '2022-01',
      endDate: '2022-08',
      isPresent: false,
    }
  ],
  education: [
    {
      id: 'edu-example-1',
      degree: 'B.S. in Computer Science',
      institution: 'University of Technology',
      startDate: '2014-09',
      endDate: '2018-05',
      isPresent: false,
    }
  ],
  certifications: [
    {
      id: 'cert-example-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023-11',
      credentialUrl: '',
      credentialId: 'AWS-12345678',
    }
  ],
  skills: [
    'Frontend (React, Vue, TypeScript, Tailwind CSS)',
    'Backend (Node.js, Python, PostgreSQL, Redis)',
    'DevOps (Docker, Kubernetes, AWS, CI/CD)',
    'System Architecture & API Design',
  ],
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
