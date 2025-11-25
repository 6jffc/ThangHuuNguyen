import React from 'react';
import { PROJECTS } from '../constants';
import { Sidebar } from './Sidebar';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';

export const Projects: React.FC = () => {
  const { t } = useThemeLanguage();

  return (
    <div className="w-full bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                
                {/* --- LEFT COLUMN (MAIN CONTENT) --- */}
                <div className="lg:col-span-3">
                    <header className="mb-12 border-b border-gray-200 dark:border-gray-700 pb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-sans">{t.projects.header}</h1>
                        <p className="text-gray-500 dark:text-gray-400 font-serif italic">{t.projects.subHeader}</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {PROJECTS.map((project, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => project.link && window.open(project.link, '_blank')}
                                className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all group ${project.link ? 'cursor-pointer hover:border-academic-accent dark:hover:border-blue-400 hover:shadow-md' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className={`font-bold text-xl font-sans ${project.link ? 'text-academic-accent dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                                        {project.title}
                                    </h3>
                                    {project.link && <i className="fas fa-external-link-alt text-gray-300 dark:text-gray-600 group-hover:text-academic-accent dark:group-hover:text-blue-400 transition-colors"></i>}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed font-serif">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-xs rounded font-mono border border-gray-100 dark:border-gray-600">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- RIGHT COLUMN (SIDEBAR) --- */}
                <Sidebar />
            </div>
        </div>
    </div>
  );
};