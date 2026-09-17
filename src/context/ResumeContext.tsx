import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import {
  type AppState,
  type ResumeData,
  type PersonalInfo,
  type WorkExperience,
  type Education,
  type Project,
  type Certification,
  type TemplateType,
  defaultAppState,
} from '../types/resume';

// ─── Storage ─────────────────────────────────────────────────────────

const STORAGE_KEY = 'resumeBuilderState';

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultAppState };
    const parsed = JSON.parse(raw) as AppState;
    // Basic shape validation
    if (
      parsed &&
      typeof parsed === 'object' &&
      parsed.resumeData &&
      typeof parsed.resumeData.personalInfo === 'object' &&
      Array.isArray(parsed.resumeData.experience) &&
      Array.isArray(parsed.resumeData.education) &&
      Array.isArray(parsed.resumeData.skills)
    ) {
      // Ensure new arrays exist for backward-compatible hydration
      if (!Array.isArray(parsed.resumeData.projects)) parsed.resumeData.projects = [];
      if (!Array.isArray(parsed.resumeData.certifications)) parsed.resumeData.certifications = [];
      return parsed;
    }
    return { ...defaultAppState };
  } catch {
    return { ...defaultAppState };
  }
}

function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

// ─── Actions ─────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'SET_SUMMARY'; payload: string }
  | { type: 'ADD_EXPERIENCE'; payload: WorkExperience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<WorkExperience> } }
  | { type: 'REMOVE_EXPERIENCE'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Partial<Project> } }
  | { type: 'REMOVE_PROJECT'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  | { type: 'ADD_CERTIFICATION'; payload: Certification }
  | { type: 'UPDATE_CERTIFICATION'; payload: { id: string; data: Partial<Certification> } }
  | { type: 'REMOVE_CERTIFICATION'; payload: string }
  | { type: 'SET_SKILLS'; payload: string[] }
  | { type: 'SET_TEMPLATE'; payload: TemplateType }
  | { type: 'SET_RESUME_DATA'; payload: ResumeData }
  | { type: 'RESET' };

// ─── Reducer ─────────────────────────────────────────────────────────

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PERSONAL_INFO':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          personalInfo: { ...state.resumeData.personalInfo, ...action.payload },
        },
      };

    case 'SET_SUMMARY':
      return {
        ...state,
        resumeData: { ...state.resumeData, summary: action.payload },
      };

    case 'ADD_EXPERIENCE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          experience: [...state.resumeData.experience, action.payload],
        },
      };

    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          experience: state.resumeData.experience.map((exp) =>
            exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
          ),
        },
      };

    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          experience: state.resumeData.experience.filter((exp) => exp.id !== action.payload),
        },
      };

    case 'ADD_PROJECT':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          projects: [...state.resumeData.projects, action.payload],
        },
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          projects: state.resumeData.projects.map((proj) =>
            proj.id === action.payload.id ? { ...proj, ...action.payload.data } : proj
          ),
        },
      };

    case 'REMOVE_PROJECT':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          projects: state.resumeData.projects.filter((proj) => proj.id !== action.payload),
        },
      };

    case 'ADD_EDUCATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: [...state.resumeData.education, action.payload],
        },
      };

    case 'UPDATE_EDUCATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.map((edu) =>
            edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
          ),
        },
      };

    case 'REMOVE_EDUCATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.filter((edu) => edu.id !== action.payload),
        },
      };

    case 'ADD_CERTIFICATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          certifications: [...state.resumeData.certifications, action.payload],
        },
      };

    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          certifications: state.resumeData.certifications.map((cert) =>
            cert.id === action.payload.id ? { ...cert, ...action.payload.data } : cert
          ),
        },
      };

    case 'REMOVE_CERTIFICATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          certifications: state.resumeData.certifications.filter((cert) => cert.id !== action.payload),
        },
      };

    case 'SET_SKILLS':
      return {
        ...state,
        resumeData: { ...state.resumeData, skills: action.payload },
      };

    case 'SET_TEMPLATE':
      return { ...state, selectedTemplate: action.payload };

    case 'SET_RESUME_DATA':
      return { ...state, resumeData: action.payload };

    case 'RESET':
      return { ...defaultAppState };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────

interface ResumeContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const ResumeContext = createContext<ResumeContextValue | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  // Debounced save to localStorage (500ms)
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedSave = useCallback((s: AppState) => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => saveState(s), 500);
  }, []);

  useEffect(() => {
    debouncedSave(state);
  }, [state, debouncedSave]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, []);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume(): ResumeContextValue {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within a ResumeProvider');
  return ctx;
}

export type { Action };
