import React from 'react';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';

export const Sidebar: React.FC = () => {
  const { language } = useThemeLanguage();
  const vi = language === 'vi';
  return (
    <aside className="hidden lg:block space-y-8">
      <div className="border-t-2 border-gray-900 dark:border-gray-100 pt-4">
        <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">{vi?'Về tác giả':'About'}</p>
        <h3 className="font-semibold text-lg">Nguyễn Hữu Thắng</h3>
        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{vi?'Sinh viên Khoa học dữ liệu, quan tâm đến Machine Learning, Computer Vision và các hệ thống AI.':'Data Science student interested in Machine Learning, Computer Vision, and AI systems.'}</p>
        <a href="https://github.com/6jffc" target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm text-blue-700 dark:text-blue-400 hover:underline">GitHub ↗</a>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
        <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">{vi?'Chủ đề':'Topics'}</p>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {['Machine Learning','Computer Vision','Medical AI','LLMs & Agents','MLOps','Research Methods'].map(x=><li key={x}>{x}</li>)}
        </ul>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 pt-4 text-xs text-gray-500 leading-6">
        {vi?'Các bài viết phản ánh quá trình học tập và nghiên cứu cá nhân. Kết quả thực nghiệm sẽ được ghi rõ nguồn dữ liệu và điều kiện đánh giá.':'Posts document personal learning and research. Experimental results are reported with their data sources and evaluation conditions.'}
      </div>
    </aside>
  );
};
