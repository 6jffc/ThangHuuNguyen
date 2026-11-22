import React, { useEffect, useMemo, useState } from 'react';
import { BLOG_POSTS } from '../constants';
import { Sidebar } from './Sidebar';
import { BlogPost } from '../types';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';
import { supabase } from '../src/lib/supabase';
import { renderMarkdown } from '../src/lib/markdown';

type PublishedPost = { id: string; title: string; slug: string; excerpt: string; content_md: string; published_at: string; reading_time_minutes: number; };
export const Blog: React.FC = () => {
  const { language } = useThemeLanguage();
  const vi = language === 'vi';
  const [publishedPosts, setPublishedPosts] = useState<PublishedPost[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PublishedPost | BlogPost | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    let active = true;
    supabase.from('posts').select('id,title,slug,excerpt,content_md,published_at,reading_time_minutes').eq('status', 'published').not('published_at', 'is', null).lte('published_at', new Date().toISOString()).order('published_at', { ascending: false })
      .then(({ data, error }) => { if (!active) return; if (!error && data) setPublishedPosts(data as PublishedPost[]); setLoaded(true); });
    return () => { active = false; };
  }, []);

  const useCms = publishedPosts.length > 0;
  const legacy = BLOG_POSTS;
  const categories = useMemo(() => ['All', ...Array.from(new Set(legacy.map(p => p.category)))], []);
  const filteredCms = useMemo(() => publishedPosts.filter(post => (post.title + ' ' + post.excerpt + ' ' + post.content_md).toLowerCase().includes(query.toLowerCase())), [publishedPosts, query]);
  const filteredLegacy = useMemo(() => legacy.filter(post => (category === 'All' || post.category === category) && (post.title + ' ' + post.excerpt + ' ' + post.category).toLowerCase().includes(query.toLowerCase())), [legacy, category, query]);
  const dateLabel = (date: string) => new Date(date).toLocaleDateString(vi ? 'vi-VN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const shareUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';

  return <div id="blog" className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-16"><div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
      <main>
        <header className="border-b border-gray-200 pb-8 dark:border-gray-800"><p className="mb-3 font-mono text-xs uppercase tracking-[.18em] text-blue-600 dark:text-blue-400">WRITING / NOTEBOOK</p><h1 className="text-4xl font-semibold tracking-tight">{selectedPost ? selectedPost.title : (vi ? 'Bài viết & Ghi chú nghiên cứu' : 'Writing & Research Notes')}</h1><p className="mt-3 max-w-2xl leading-7 text-gray-600 dark:text-gray-400">{selectedPost ? selectedPost.excerpt : (vi ? 'Ghi chép về AI, Machine Learning, toán học, nghiên cứu và những suy tư trong hành trình học tập.' : 'Notes on AI, machine learning, mathematics, research, and reflections from an ongoing learning journey.')}</p>{selectedPost && <button onClick={() => setSelectedPost(null)} className="mt-5 text-sm text-blue-700 hover:underline dark:text-blue-400">← {vi ? 'Tất cả bài viết' : 'All posts'}</button>}</header>

        {selectedPost ? <article className="pt-8">
          <div className="mb-7 flex flex-wrap items-center gap-3 font-mono text-xs text-gray-500"><span>{'published_at' in selectedPost && selectedPost.published_at ? dateLabel(selectedPost.published_at) : ('date' in selectedPost ? selectedPost.date : '')}</span><span>·</span><span>{'reading_time_minutes' in selectedPost ? `${selectedPost.reading_time_minutes} min read` : ('category' in selectedPost ? selectedPost.category : 'Article')}</span></div>
          <h2 className="mb-8 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{selectedPost.title}</h2>
          {'content_md' in selectedPost ? <div className="research-prose pt-1" dangerouslySetInnerHTML={{ __html: renderMarkdown(selectedPost.content_md || '') }} /> : <div className="research-prose pt-1">{selectedPost.content}</div>}
          <div className="mt-12 flex items-center justify-between gap-4 border-t border-gray-200 pt-6 dark:border-gray-800"><p className="text-xs text-gray-500">{vi ? 'Nội dung phản ánh hiểu biết tại thời điểm viết và sẽ được cập nhật khi có thêm bằng chứng.' : 'This article reflects the understanding at the time of writing and may be revised as evidence evolves.'}</p><div className="flex shrink-0 gap-3"><a className="text-sm text-blue-700 hover:underline dark:text-blue-400" href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer">Share ↗</a><button onClick={() => setSelectedPost(null)} className="text-sm hover:underline">{vi ? 'Quay lại' : 'Back'}</button></div></div>
        </article> : <><div className="flex flex-col justify-between gap-3 py-6 sm:flex-row sm:items-center"><input value={query} onChange={e => setQuery(e.target.value)} placeholder={vi ? 'Tìm bài viết, chủ đề...' : 'Search articles and topics...'} aria-label="Search articles" className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 sm:max-w-xs"/><span className="font-mono text-xs text-gray-500">{useCms ? filteredCms.length : filteredLegacy.length} {vi ? 'bài viết' : 'articles'}</span></div>
          {!useCms && <div className="mb-7 flex flex-wrap gap-2">{categories.map(c => <button key={c} onClick={() => setCategory(c)} className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${category === c ? 'border-gray-950 bg-gray-950 text-white dark:border-white dark:bg-white dark:text-gray-950' : 'border-gray-300 text-gray-600 hover:border-blue-500 dark:border-gray-700 dark:text-gray-400'}`}>{c === 'All' ? (vi ? 'Tất cả' : 'All') : c}</button>)}</div>}
          <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
            {useCms ? filteredCms.map(post => <article key={post.id} className="grid gap-4 py-7 sm:grid-cols-[120px_1fr] sm:gap-7"><div className="pt-1 font-mono text-xs text-gray-500">{dateLabel(post.published_at)}</div><div><p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-blue-600 dark:text-blue-400">ARTICLE · {post.reading_time_minutes} MIN READ</p><button onClick={() => setSelectedPost(post)} className="text-left text-xl font-semibold tracking-tight transition-colors hover:text-blue-700 dark:hover:text-blue-400 md:text-2xl">{post.title}</button><p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">{post.excerpt}</p><button onClick={() => setSelectedPost(post)} className="mt-3 text-sm text-blue-700 hover:underline dark:text-blue-400">{vi ? 'Đọc bài viết' : 'Read article'} →</button></div></article>) : filteredLegacy.map(post => <article key={post.id} className="grid gap-4 py-7 sm:grid-cols-[120px_1fr] sm:gap-7"><div className="pt-1 font-mono text-xs text-gray-500">{post.date}</div><div><p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-blue-600 dark:text-blue-400">{post.category}</p><button onClick={() => setSelectedPost(post)} className="text-left text-xl font-semibold tracking-tight transition-colors hover:text-blue-700 dark:hover:text-blue-400 md:text-2xl">{post.title}</button><p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">{post.excerpt}</p><button onClick={() => setSelectedPost(post)} className="mt-3 text-sm text-blue-700 hover:underline dark:text-blue-400">{vi ? 'Đọc ghi chú' : 'Read note'} →</button></div></article>)}
            {useCms && filteredCms.length === 0 && <p className="py-12 text-sm text-gray-500">{vi ? 'Chưa có bài viết công khai phù hợp.' : 'No published articles match your search.'}</p>}
            {!useCms && filteredLegacy.length === 0 && <p className="py-12 text-sm text-gray-500">{vi ? 'Không tìm thấy bài viết phù hợp.' : 'No matching articles found.'}</p>}
            {!loaded && <p className="py-3 text-xs text-gray-400">{vi ? 'Đang đồng bộ bài viết mới…' : 'Syncing latest articles…'}</p>}
          </div></>}
      </main><Sidebar/>
    </div></div>
  </div>;
};
