export type ProjectCategory = 
  'website development' | 
  'web app' | 
  'app development' | 
  'vfx' | 
  'digital marketing' | 
  'game design' | 
  '3d animation';

export interface SocialLinks {
  facebook: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  behance: string;
  github: string;
  youtube: string;
  dribbble: string;
}

export interface Skill {
  id: number;
  name: string;
  percentage: number;
}

export type MediaItem = {
  id: number | string; // string for new items, number for existing
  mediaType: 'image' | 'video';
  mediaUrl: string | null;
};

export type Project = {
  id: number | string; // string for new projects, number for existing
  title: string;
  description: string;
  category: string;
  subCategory?: string;
  mediaItems: MediaItem[]; // This is the new array
};

export interface Profile {
  id: number;
  name: string;
  photo: string | null;
  socialLinks: SocialLinks;
  cv: string | null;
  skills: Skill[];
  projects: Project[];
}

export interface Admin {
  id: number;
  username: string;
  password: string;
  name: string;
  role: string;
}

// New type for API responses
export interface ApiProfile {
  id: number;
  name: string;
  photo: string | null;
  socialLinks: string; // Stored as JSON string
  cv: string | null;
}

export interface FullProfile extends ApiProfile {
  skills: Skill[];
  projects: Project[];
}