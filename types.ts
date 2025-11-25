import React from 'react';

export interface ResearcherProfile {
  name: string;
  role: string;
  url?: string;
  description: string;
  category: 'Godfather' | 'Blogger' | 'Educator' | 'Researcher' | 'Lab';
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  route?: AppRoute; 
}

export interface NewsUpdate {
  date: string;
  content: string;
}

export interface Publication {
  year: string;
  title: string;
  venue: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: React.ReactNode; // Content can be JSX
}

export enum AppRoute {
  PROFILE = 'profile',
  BLOG = 'blog',
  PROJECTS = 'projects',
  ROADMAP = 'roadmap'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string;
  sources?: { uri: string; title: string }[];
  timestamp: number;
}