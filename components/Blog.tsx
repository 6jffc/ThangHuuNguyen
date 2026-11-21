import React, { useMemo, useState } from 'react';
import { BLOG_POSTS } from '../constants';
import { Sidebar } from './Sidebar';
import { BlogPost } from '../types';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';

export const Blog: React.FC = () => {
  const { language } = useThemeLanguage();
  const vi = language === 'vi';
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = useMemo(()=>['All',...Array.from(new Set(BLOG_POSTS.map(p=>p.category)))],[]);
  const filtered = useMemo(()=>BLOG_POSTS.filter(post=>{
    const matchesCategory=category==='All'||post.category===category;
    const haystack=(post.title+' '+post.excerpt+' '+post.category).toLowerCase();
    return matchesCategory&&haystack.includes(query.toLowerCase());
  }),[category,query]);
  const shareUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_220px] gap-12">
          <main>
            <header className="pb-8 border-b border-gray-200 dark:border-gray-800">
              <p className="text-xs font-mono uppercase tracking-[.18em] text-blue-600 dark:text-blue-400 mb-3">WRITING / NOTEBOOK</p>
              <h1 className="text-4xl font-semibold tracking-tight">{selectedPost ? selectedPost.title : (vi?'Bài viết & Ghi chú nghiên cứu':'Writing & Research Notes')}</h1>
              <p className="mt-3 text-gray-600 dark:text-gray-400 leading-7 max-w-2xl">{selectedPost ? selectedPost.excerpt : (vi?'Ghi chép về AI, Machine Learning, toán học, paper và những thử nghiệm trong quá trình học tập.':'Notes on AI, machine learning, mathematics, papers, and experiments from an ongoing learning journey.')}</p>
              {selectedPost && <button onClick={()=>setSelectedPost(null)} className="mt-5 text-sm text-blue-700 dark:text-blue-400 hover:underline">← {vi?'Tất cả bài viết':'All posts'}</button>}
            </header>
            {selectedPost ? (
              <article className="max-w-none pt-8">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-500 mb-7"><span>{selectedPost.date}</span><span>·</span><span>{selectedPost.category}</span><span>·</span><span>{vi?'Ghi chú cá nhân':'Personal note'}</span></div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-8">{selectedPost.title}</h2>
                <div className="research-prose pt-1">{selectedPost.content}</div>
                <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
                  <p className="text-xs text-gray-500">{vi?'Bài viết phản ánh hiểu biết tại thời điểm viết; nội dung sẽ được cập nhật khi có thêm bằng chứng.':'This note reflects the understanding at the time of writing and may be revised as evidence evolves.'}</p>
                  <div className="flex gap-3 shrink-0"><a className="text-sm text-blue-700 dark:text-blue-400 hover:underline" href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer">Share ↗</a><button onClick={()=>setSelectedPost(null)} className="text-sm hover:underline">{vi?'Quay lại':'Back'}</button></div>
                </div>
              </article>
            ) : (
              <>
                <div className="py-6 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
                  <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={vi?'Tìm bài viết, chủ đề...':'Search articles and topics...'} aria-label="Search articles" className="w-full sm:max-w-xs px-3 py-2 text-sm bg-transparent border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:border-blue-500"/>
                  <span className="text-xs text-gray-500 font-mono">{filtered.length} {vi?'bài viết':'articles'}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-7">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${category===c?'bg-gray-950 text-white border-gray-950 dark:bg-white dark:text-gray-950 dark:border-white':'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-500'}`}>{c==='All'?(vi?'Tất cả':'All'):c}</button>)}</div>
                <div className="divide-y divide-gray-200 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-800">
                  {filtered.map(post=><article key={post.id} className="py-7 grid sm:grid-cols-[120px_1fr] gap-4 sm:gap-7">
                    <div className="text-xs font-mono text-gray-500 pt-1">{post.date}</div>
                    <div><p className="text-[11px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">{post.category}</p><button onClick={()=>setSelectedPost(post)} className="text-left text-xl md:text-2xl font-semibold tracking-tight hover:text-blue-700 dark:hover:text-blue-400 transition-colors">{post.title}</button><p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">{post.excerpt}</p><button onClick={()=>setSelectedPost(post)} className="mt-3 text-sm text-blue-700 dark:text-blue-400 hover:underline">{vi?'Đọc ghi chú':'Read note'} →</button></div>
                  </article>)}
                  {filtered.length===0&&<p className="py-12 text-sm text-gray-500">{vi?'Không tìm thấy bài viết phù hợp.':'No matching articles found.'}</p>}
                </div>
              </>
            )}
          </main>
          <Sidebar/>
        </div>
      </div>
    </div>
  );
};
