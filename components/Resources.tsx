import React from 'react';
import { RESEARCHERS } from '../constants';

const CategorySection: React.FC<{ title: string, items: typeof RESEARCHERS }> = ({ title, items }) => {
  if (items.length === 0) return null;
  return (
    <div className="mb-12">
      <h3 className="text-lg font-bold text-gray-900 mb-6 font-sans">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <a 
            key={idx} 
            href={item.url} 
            target="_blank" 
            rel="noreferrer"
            className="group block bg-white border border-gray-200 rounded-lg p-5 hover:border-academic-accent transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
               <h4 className="font-bold text-base text-gray-800 group-hover:text-academic-accent transition-colors font-serif">{item.name}</h4>
               <i className="fas fa-external-link-alt text-gray-300 group-hover:text-academic-accent text-xs"></i>
            </div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 font-sans">{item.role}</p>
            <p className="text-sm text-gray-600 leading-relaxed font-serif">{item.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export const Resources: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 pt-10">
      <header className="mb-12 border-b border-gray-200 pb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 font-sans">Knowledge Base</h2>
        <p className="text-gray-500 font-serif italic">A curated collection of the minds shaping the future of Artificial General Intelligence.</p>
      </header>

      <CategorySection title='The "Godfathers" of AI' items={RESEARCHERS.filter(r => r.category === 'Godfather')} />
      <CategorySection title='Technical Blogs' items={RESEARCHERS.filter(r => r.category === 'Blogger')} />
      <CategorySection title='Education & Thought Leaders' items={RESEARCHERS.filter(r => r.category === 'Educator')} />
      <CategorySection title='Deep Research & Labs' items={RESEARCHERS.filter(r => r.category === 'Researcher' || r.category === 'Lab')} />
    </div>
  );
};