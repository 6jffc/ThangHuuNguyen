import React from 'react';
import { NEWS } from '../constants';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';

export const Sidebar: React.FC = () => {
  const { t } = useThemeLanguage();

  return (
    <div className="hidden lg:block space-y-8">
        {/* 1. Mini Profile Card */}
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
            <div className="w-32 h-32 mx-auto bg-gray-300 dark:bg-gray-600 rounded-full mb-4 overflow-hidden">
                    <img src="https://via.placeholder.com/150" alt="Nguyen Huu Thang" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white font-sans mb-4">Nguyen Huu Thang</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-serif leading-relaxed mb-4">
                {t.sidebar.role}
            </p>
            <div className="flex justify-center space-x-4 text-gray-500 dark:text-gray-400">
                    <a href="#" className="hover:text-academic-accent dark:hover:text-blue-400"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="hover:text-academic-accent dark:hover:text-blue-400"><i className="fab fa-github"></i></a>
                    <a href="#" className="hover:text-academic-accent dark:hover:text-blue-400"><i className="fab fa-linkedin"></i></a>
            </div>
        </div>

        {/* 2. Search */}
        <div>
            <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3 font-sans">{t.sidebar.search}</h4>
            <div className="flex">
                <input 
                    type="text" 
                    placeholder={t.sidebar.searchPlaceholder}
                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm font-serif focus:outline-none focus:border-academic-accent dark:focus:border-blue-500 transition-colors"
                />
                <button className="bg-white dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-600 px-3 text-gray-500 dark:text-gray-400 hover:text-academic-accent dark:hover:text-blue-400 transition-colors">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>

        {/* 3. Recent Posts */}
        <div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3 font-sans">{t.sidebar.recentUpdates}</h4>
                <ul className="space-y-3">
                    {NEWS.slice(0, 4).map((item, idx) => (
                        <li key={idx} className="text-sm font-serif text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800 pb-2 last:border-0">
                            <span className="block text-xs text-gray-400 mb-1">{item.date}</span>
                            <a href="#" className="hover:text-academic-accent dark:hover:text-blue-400 transition-colors block">
                                {item.content}
                            </a>
                        </li>
                    ))}
                </ul>
        </div>

        {/* 4. Contact */}
        <div>
            <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3 font-sans">{t.sidebar.contact}</h4>
            <div className="text-sm font-serif text-gray-600 dark:text-gray-300 space-y-2">
                <p><strong>Neural Nexus Lab</strong></p>
                <p>Institute of Technology, Room 404</p>
                <p>Ho Chi Minh City, Vietnam</p>
                <div className="pt-2">
                    <p className="text-xs text-gray-400 uppercase">Email</p>
                    <a href="mailto:email@example.com" className="text-academic-accent dark:text-blue-400 hover:underline">email@example.com</a>
                </div>
            </div>
        </div>
        
        {/* 5. Meta */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2 font-sans">{t.sidebar.meta}</h4>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1 font-serif">
                    <li><a href="#" className="hover:underline">Log in</a></li>
                    <li><a href="#" className="hover:underline">Entries feed</a></li>
                    <li><a href="#" className="hover:underline">Comments feed</a></li>
                </ul>
        </div>
    </div>
  );
};