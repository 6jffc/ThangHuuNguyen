import React from 'react';
import { AppRoute } from '../types';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';

interface NavigationProps { currentRoute: AppRoute; onNavigate: (route: AppRoute) => void; }

const NavLink: React.FC<{ active: boolean; label: string; onClick: () => void }> = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    aria-current={active ? 'page' : undefined}
    className={`shrink-0 px-1.5 md:px-2 py-2.5 text-[13px] md:text-sm font-medium border-b-2 transition-colors focus-visible:outline-offset-2 ${active ? 'border-blue-700 dark:border-blue-300 text-gray-950 dark:text-white' : 'border-transparent text-gray-500 hover:text-blue-700 dark:hover:text-blue-300'}`}
  >{label}</button>
);

export const Navigation: React.FC<NavigationProps> = ({ currentRoute, onNavigate }) => {
  const { theme, toggleTheme, language, toggleLanguage, t } = useThemeLanguage();
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <nav aria-label={language === 'vi' ? 'Điều hướng chính' : 'Primary navigation'} className="max-w-6xl mx-auto px-4 md:px-10 min-h-[68px] flex items-center justify-between gap-4">
        <button onClick={() => onNavigate(AppRoute.PROFILE)} className="shrink-0 font-serif text-xl md:text-2xl tracking-tight text-gray-950 dark:text-white no-underline">
          Thang Nguyen<span className="text-blue-700 dark:text-blue-300">.</span>
        </button>
        <div className="flex items-center gap-2 md:gap-5 overflow-x-auto">
          <NavLink active={currentRoute === AppRoute.PROFILE} onClick={() => onNavigate(AppRoute.PROFILE)} label={t.nav.profile} />
          <NavLink active={currentRoute === AppRoute.PROJECTS} onClick={() => onNavigate(AppRoute.PROJECTS)} label={t.nav.projects} />
          <NavLink active={currentRoute === AppRoute.BLOG} onClick={() => onNavigate(AppRoute.BLOG)} label={t.nav.blog} />
          <NavLink active={currentRoute === AppRoute.ROADMAP} onClick={() => onNavigate(AppRoute.ROADMAP)} label={t.nav.roadmap} />
          <span className="hidden sm:block h-5 border-l border-gray-200 dark:border-gray-800" aria-hidden="true" />
          <button onClick={toggleLanguage} className="shrink-0 px-2 py-2 text-xs font-semibold tracking-wide text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300" aria-label={language === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'}>{language.toUpperCase()}</button>
          <button onClick={toggleTheme} className="shrink-0 px-2 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300" aria-label={theme === 'light' ? 'Enable dark mode' : 'Enable light mode'}>{theme === 'light' ? 'Dark' : 'Light'}</button>
        </div>
      </nav>
    </header>
  );
};