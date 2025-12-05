export interface ProjectData {
  id: string;
  name: string;
  description: string;
  badges: string;
}

export type PageType = 'aboutMe' | 'projects' | 'skills';

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
