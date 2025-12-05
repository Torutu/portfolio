import { ReactNode } from 'react';

export interface PageContentProps {
  content: ReactNode;
  className?: string;
}

export interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
}

export interface ProviderProps {
  children: ReactNode;
}
