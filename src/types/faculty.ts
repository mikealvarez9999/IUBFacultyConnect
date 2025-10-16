export interface Faculty {
  id: number;
  name: string;
  designation: string;
  department: string;
  school: string;
  email: string;
  phone?: string;
  image?: string;
  profile_url?: string;
  research_interests?: string[];
  education?: string[];
}

export interface FacultyResponse {
  data: Faculty[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

export interface SearchFilters {
  school: string;
  department: string;
  query: string;
  page: number;
  size: number;
}
