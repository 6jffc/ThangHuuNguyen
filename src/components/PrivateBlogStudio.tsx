import React, { useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type MemberRole = 'owner' | 'editor' | 'author';
type PostStatus = 'draft' | 'scheduled' | 'published' | 'archived';
type StudioPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content_md: string;
  status: PostStatus;
  updated_at: string;
};

const shell = 'min-h-screen bg-[#f5f7fb] text-slate-900';
const field = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';
const button = 'inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50';

export const PrivateBlogStudio: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [role, setRole] = useState<MemberRole | null>(null);
  const [denied, setDenied] = useState(false);
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState<StudioPost[]>([]);
  const [selected, setSelected] = useState<StudioPost | null>(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('id,title,slug,excerpt,content_md,status,updated_at')
      .order('updated_at', { ascending: false });
    if (error) {
      setMessage(error.message);
      return;
    }
    setPosts((data || []) as StudioPost[]);
  }, []);

  const verifyMembership = useCallback(async (activeSession: Session | null) => {
    setChecking(true);
    setRole(null);
    setDenied(false);
    if (!activeSession?.user) {
      setChecking(false);
      return;
    }
    const { data, error } = await supabase
      .from('team_members')
      .select('role,is_active')
      .eq('user_id', activeSession.user.id)
      .maybeSingle();

    if (error || !data || !data.is_active) {
      setDenied(true);
      setChecking(false);
      return;
    }
    setRole(data.role as MemberRole);
    setChecking(false);
    await loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setSession(data.session);
      void verifyMembership(data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!alive) return;
      setSession(nextSession);
      void verifyMembership(nextSession);
    });
    return () => {
      alive = false;
      listener.subscription.unsubscribe();
    };
  }, [verifyMembership]);

  const signIn = async () => {
    setMessage('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.href },
    });
    if (error) setMessage(error.message);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setRole(null);
    setPosts([]);
    setSelected(null);
  };

  const startNewPost = () => {
    setSelected(null);
    setTitle('');
    setExcerpt('');
    setContent('');
    setMessage('');
  };

  const editPost = (post: StudioPost) => {
    setSelected(post);
    setTitle(post.title);
    setExcerpt(post.excerpt || '');
    setContent(post.content_md || '');
    setMessage('');
  };

  const saveDraft = async () => {
    if (!session?.user || !title.trim()) {
      setMessage('Please enter a title before saving.');
      return;
    }
    setSaving(true);
    setMessage('');
    const slugBase = title.trim().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'untitled';
    const payload = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content_md: content,
      slug: selected?.slug || `${slugBase}-${Date.now().toString(36)}`,
      status: 'draft' as const,
      author_id: session.user.id,
      updated_at: new Date().toISOString(),
    };
    const result = selected
      ? await supabase.from('posts').update(payload).eq('id', selected.id).select('id').single()
      : await supabase.from('posts').insert(payload).select('id').single();
    setSaving(false);
    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    setMessage('Draft saved successfully.');
    await loadPosts();
  };

  const uploadImage = async (file?: File) => {
    if (!file || !session?.user) return;
    if (!file.type.startsWith('image/')) {
      setMessage('Please choose an image file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setMessage('Image must be 10 MB or smaller.');
      return;
    }
    setUploading(true);
    setMessage('');
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const path = `${session.user.id}/${Date.now()}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from('blog-media').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });
    if (uploadError) {
      setMessage(uploadError.message);
      setUploading(false);
      return;
    }
    const { error: recordError } = await supabase.from('media').insert({
      uploaded_by: session.user.id,
      storage_path: path,
      file_name: file.name,
      mime_type: file.type,
      size_bytes: file.size,
    });
    setUploading(false);
    setMessage(recordError ? recordError.message : 'Image uploaded to the private media library.');
  };

  if (checking) {
    return <div className={shell + ' grid place-items-center p-6'}><p className="text-sm text-slate-500">Checking secure access…</p></div>;
  }

  if (!session) {
    return (
      <div className={shell + ' grid min-h-screen place-items-center p-6'}>
        <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white"><span className="text-lg font-bold">TH</span></div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-blue-600">Private workspace</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Blog Studio</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">A private editorial workspace for writing, organizing and preparing research articles for publication.</p>
          <button onClick={signIn} className={button + ' mt-8 w-full bg-slate-950 text-white hover:bg-blue-700'}>
            <span className="mr-3 text-base">G</span> Continue with Google
          </button>
          <p className="mt-5 text-center text-xs leading-5 text-slate-400">Access is restricted to invited team members. Signing in alone does not grant access.</p>
          {message && <p role="alert" className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{message}</p>}
        </section>
      </div>
    );
  }

  if (denied || !role) {
    return (
      <div className={shell + ' grid min-h-screen place-items-center p-6'}>
        <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">!</div>
          <h1 className="mt-5 text-2xl font-semibold">Access not granted</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">This Google account is not on the Blog Studio allowlist. Ask the owner to invite your account.</p>
          <p className="mt-3 break-all text-xs text-slate-400">{session.user.email}</p>
          <button onClick={signOut} className={button + ' mt-7 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}>Sign out</button>
        </section>
      </div>
    );
  }

  return (
    <div className={shell}>
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-xs font-bold text-white">TH</div><div><p className="text-sm font-semibold">Private Blog Studio</p><p className="text-[11px] text-slate-400">Editorial workspace</p></div></div>
          <div className="flex items-center gap-3"><span className="hidden text-xs text-slate-500 sm:inline">{session.user.email} · {role}</span><button onClick={signOut} className="text-xs font-semibold text-slate-600 hover:text-rose-600">Sign out</button></div>
        </div>
      </header>
      <main className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Your articles</h2><span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">{posts.length}</span></div>
          <button onClick={startNewPost} className={button + ' mt-4 w-full bg-blue-600 text-white hover:bg-blue-700'}>＋ New article</button>
          <div className="mt-5 space-y-2">
            {posts.map(post => <button key={post.id} onClick={() => editPost(post)} className={'w-full rounded-xl border p-3 text-left transition ' + (selected?.id === post.id ? 'border-blue-300 bg-blue-50' : 'border-transparent hover:bg-slate-50')}>
              <span className="block truncate text-sm font-medium">{post.title || 'Untitled draft'}</span><span className="mt-1 block text-[11px] capitalize text-slate-400">{post.status} · {new Date(post.updated_at).toLocaleDateString()}</span>
            </button>)}
            {posts.length === 0 && <p className="py-8 text-center text-xs leading-5 text-slate-400">No articles yet. Start with your first draft.</p>}
          </div>
        </aside>
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-600">Editor</p><h1 className="mt-1 text-2xl font-semibold tracking-tight">{selected ? 'Edit article' : 'Create article'}</h1></div><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Draft mode</span></div>
          <div className="mt-6 space-y-5">
            <label className="block"><span className="mb-2 block text-xs font-semibold text-slate-600">Title</span><input className={field} value={title} onChange={e => setTitle(e.target.value)} placeholder="A clear, research-led headline" /></label>
            <label className="block"><span className="mb-2 block text-xs font-semibold text-slate-600">Excerpt</span><textarea className={field + ' min-h-20 resize-y'} value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="A short summary for the blog index…" /></label>
            <label className="block"><span className="mb-2 block text-xs font-semibold text-slate-600">Article content (Markdown)</span><textarea className={field + ' min-h-[360px] resize-y font-mono leading-6'} value={content} onChange={e => setContent(e.target.value)} placeholder={'# Introduction\n\nWrite your research note here…'} /></label>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4"><div><p className="text-sm font-semibold">Private media library</p><p className="mt-1 text-xs text-slate-500">JPG, PNG, WebP, GIF or AVIF · up to 10 MB</p></div><label className={button + ' cursor-pointer border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'}>{uploading ? 'Uploading…' : 'Upload image'}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" className="hidden" disabled={uploading} onChange={e => void uploadImage(e.target.files?.[0])} /></label></div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5"><p className="text-xs text-slate-400">Changes are stored as private drafts in Supabase.</p><button onClick={() => void saveDraft()} disabled={saving || !title.trim()} className={button + ' bg-slate-950 text-white hover:bg-blue-700'}>{saving ? 'Saving…' : 'Save draft'}</button></div>
          </div>
          {message && <p role="status" className="mt-5 rounded-xl bg-blue-50 p-3 text-sm text-blue-800">{message}</p>}
        </section>
      </main>
    </div>
  );
};
