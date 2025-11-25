import React from 'react';
import { RESEARCHERS } from '../constants';
import { Sidebar } from './Sidebar';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';

const CategorySection: React.FC<{ title: string, items: typeof RESEARCHERS }> = ({ title, items }) => {
  if (items.length === 0) return null;
  return (
    <div className="mb-12">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 font-sans border-l-4 border-academic-accent dark:border-blue-500 pl-3">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <a 
            key={idx} 
            href={item.url} 
            target="_blank" 
            rel="noreferrer"
            className="group block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-academic-accent dark:hover:border-blue-400 transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
               <h4 className="font-bold text-base text-gray-800 dark:text-gray-100 group-hover:text-academic-accent dark:group-hover:text-blue-400 transition-colors font-serif">{item.name}</h4>
               <i className="fas fa-external-link-alt text-gray-300 dark:text-gray-600 group-hover:text-academic-accent dark:group-hover:text-blue-400 text-xs"></i>
            </div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 font-sans">{item.role}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-serif line-clamp-3">{item.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export const Roadmap: React.FC = () => {
  const { t } = useThemeLanguage();

  return (
    <div className="w-full bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                
                {/* --- LEFT COLUMN (MAIN CONTENT) --- */}
                <div className="lg:col-span-3">
                    <header className="mb-12 border-b border-gray-200 dark:border-gray-700 pb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-sans">{t.roadmap.header}</h1>
                        <p className="text-gray-500 dark:text-gray-400 font-serif italic">{t.roadmap.subHeader}</p>
                    </header>

                    <CategorySection title={t.roadmap.godfathers} items={RESEARCHERS.filter(r => r.category === 'Godfather')} />
                    <CategorySection title={t.roadmap.blogs} items={RESEARCHERS.filter(r => r.category === 'Blogger')} />
                    <CategorySection title={t.roadmap.educators} items={RESEARCHERS.filter(r => r.category === 'Educator')} />
                    <CategorySection title={t.roadmap.labs} items={RESEARCHERS.filter(r => r.category === 'Researcher' || r.category === 'Lab')} />
                </div>

                {/* --- RIGHT COLUMN (SIDEBAR) --- */}
                <Sidebar />
            </div>
        </div>
    </div>
  );
};