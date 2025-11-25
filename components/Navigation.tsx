import React from 'react';
import { AppRoute } from '../types';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';

interface NavigationProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const NavLink: React.FC<{ 
  active: boolean; 
  label: string; 
  onClick: () => void 
}> = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
      active 
        ? 'border-academic-accent text-academic-accent dark:text-blue-400 dark:border-blue-400' 
        : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
    }`}
  >
    {label}
  </button>
);

export const Navigation: React.FC<NavigationProps> = ({ currentRoute, onNavigate }) => {
  const { theme, toggleTheme, language, toggleLanguage, t } = useThemeLanguage();

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-academic-border dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">
        <div 
            className="flex items-center gap-2 mb-4 md:mb-0 cursor-pointer"
            onClick={() => onNavigate(AppRoute.PROFILE)}
        >
          <div className="w-8 h-8 bg-academic-accent dark:bg-blue-600 rounded-full flex items-center justify-center text-white font-serif font-bold text-lg">
            N
          </div>
          <span className="text-xl font-bold text-academic-text dark:text-white tracking-tight font-sans">
            Nguyen Huu Thang
          </span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-1 md:gap-4">
          <NavLink 
            active={currentRoute === AppRoute.PROFILE} 
            onClick={() => onNavigate(AppRoute.PROFILE)}
            label={t.nav.profile}
          />
          <NavLink 
            active={currentRoute === AppRoute.BLOG} 
            onClick={() => onNavigate(AppRoute.BLOG)}
            label={t.nav.blog}
          />
          <NavLink 
            active={currentRoute === AppRoute.PROJECTS} 
            onClick={() => onNavigate(AppRoute.PROJECTS)}
            label={t.nav.projects}
          />
           <NavLink 
            active={currentRoute === AppRoute.ROADMAP} 
            onClick={() => onNavigate(AppRoute.ROADMAP)}
            label={t.nav.roadmap}
          />

          {/* Controls */}
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
             {/* Language Toggle */}
             <button 
               onClick={toggleLanguage}
               className="text-xs font-bold font-sans px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
               title="Switch Language"
             >
               {language === 'en' ? 'EN' : 'VI'}
             </button>

             {/* Theme Toggle */}
             <button 
               onClick={toggleTheme}
               className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-yellow-600 dark:text-yellow-400 transition-colors"
               title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
             >
               {theme === 'light' ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};