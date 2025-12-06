import { JSX } from "react";

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  badges: (string | JSX.Element)[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
