import React from 'react';
import { AppRoute } from '../types';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';

interface NavigationProps { currentRoute: AppRoute; onNavigate: (route: AppRoute) => void; }

const NavLink: React.FC<{active:boolean;label:string;onClick:()=>void}> = ({active,label,onClick}) => (
  <button onClick={onClick} aria-current={active?'page':undefined} className={`px-2 py-2 text-sm transition-colors border-b ${active?'border-gray-950 dark:border-white text-gray-950 dark:text-white':'border-transparent text-gray-500 hover:text-gray-950 dark:hover:text-white'}`}>{label}</button>
);

export const Navigation: React.FC<NavigationProps> = ({ currentRoute, onNavigate }) => {
  const { theme, toggleTheme, language, toggleLanguage, t } = useThemeLanguage();
  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-6 min-h-[64px] flex flex-wrap items-center justify-between gap-3">
        <button onClick={()=>onNavigate(AppRoute.PROFILE)} className="font-semibold tracking-tight text-gray-950 dark:text-white">THANG NGUYEN<span className="text-blue-600 dark:text-blue-400">.</span></button>
        <div className="flex items-center flex-wrap gap-1 md:gap-4">
          <NavLink active={currentRoute===AppRoute.PROFILE} onClick={()=>onNavigate(AppRoute.PROFILE)} label={t.nav.profile}/>
          <NavLink active={currentRoute===AppRoute.BLOG} onClick={()=>onNavigate(AppRoute.BLOG)} label={t.nav.blog}/>
          <NavLink active={currentRoute===AppRoute.PROJECTS} onClick={()=>onNavigate(AppRoute.PROJECTS)} label={t.nav.projects}/>
          <NavLink active={currentRoute===AppRoute.ROADMAP} onClick={()=>onNavigate(AppRoute.ROADMAP)} label={t.nav.roadmap}/>
          <span className="mx-1 h-5 border-l border-gray-200 dark:border-gray-800"/>
          <button onClick={toggleLanguage} className="text-xs font-mono text-gray-600 dark:text-gray-300 px-2 py-1 hover:text-blue-600" aria-label="Toggle language">{language.toUpperCase()}</button>
          <button onClick={toggleTheme} className="text-xs text-gray-600 dark:text-gray-300 px-2 py-1 hover:text-blue-600" aria-label="Toggle color theme">{theme==='light'?'Dark':'Light'}</button>
        </div>
      </div>
    </nav>
  );
};
