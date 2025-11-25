
import React, { useState } from 'react';
import { BLOG_POSTS } from '../constants';
import { Sidebar } from './Sidebar';
import { BlogPost } from '../types';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';

// Interface
interface Comment {
    id: number;
    user: string;
    avatarSeed: string;
    text: string;
    date: string;
    isEdited?: boolean;
}

const CommentsSection: React.FC<{ postTitle: string }> = ({ postTitle }) => {
    const { t } = useThemeLanguage();
    
    // --- State Management ---
    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            user: "Alice Researcher",
            avatarSeed: "alice123",
            text: "Great insights! I particularly agreed with the part about Flink's event-time processing.",
            date: "2 hours ago"
        }
    ]);
    const [newCommentText, setNewCommentText] = useState("");
    
    // User Identity State
    const [currentUser, setCurrentUser] = useState({ name: "Guest User", avatarSeed: "guest-seed-99" });
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [tempProfile, setTempProfile] = useState({ ...currentUser });

    // Editing State
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editBuffer, setEditBuffer] = useState("");

    // --- Helpers ---
    const getAvatarUrl = (seed: string) => `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${seed}`;
    const generateRandomSeed = () => Math.random().toString(36).substring(7);

    // --- Handlers ---

    // 1. Post New Comment
    const handlePostComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;
        
        const comment: Comment = {
            id: Date.now(),
            user: currentUser.name,
            avatarSeed: currentUser.avatarSeed,
            text: newCommentText,
            date: "Just now"
        };
        
        setComments([...comments, comment]);
        setNewCommentText("");
    };

    // 2. Delete Comment
    const handleDelete = (id: number) => {
        if (window.confirm(t.blog.comments.actions.confirmDelete)) {
            setComments(comments.filter(c => c.id !== id));
        }
    };

    // 3. Start Editing
    const handleStartEdit = (comment: Comment) => {
        setEditingCommentId(comment.id);
        setEditBuffer(comment.text);
    };

    // 4. Save Edit
    const handleSaveEdit = (id: number) => {
        if (!editBuffer.trim()) return;
        setComments(comments.map(c => 
            c.id === id ? { ...c, text: editBuffer, isEdited: true } : c
        ));
        setEditingCommentId(null);
        setEditBuffer("");
    };

    // 5. Profile Management
    const toggleProfileEdit = () => {
        if (isEditingProfile) {
            // Save mode
            setCurrentUser(tempProfile);
            setIsEditingProfile(false);
        } else {
            // Edit mode
            setTempProfile({ ...currentUser });
            setIsEditingProfile(true);
        }
    };

    const handleRandomizeAvatar = () => {
        setTempProfile(prev => ({ ...prev, avatarSeed: generateRandomSeed() }));
    };

    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(`Check out this article: ${postTitle}`);

    return (
        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-700">
            {/* Social Sharing */}
            <div className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 font-sans">
                    {t.blog.comments.discussOn}
                </h4>
                <div className="flex gap-3">
                    <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-all">
                        <i className="fab fa-x-twitter"></i>
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:bg-blue-700 transition-all">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0A66C2] text-white hover:bg-blue-800 transition-all">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>

            {/* Header */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 font-sans flex items-center gap-3">
                {t.blog.comments.header} 
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm py-0.5 px-2.5 rounded-full font-medium">
                    {comments.length}
                </span>
            </h3>

            {/* Comment List */}
            <div className="space-y-6 mb-12">
                {comments.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                        <i className="far fa-comments text-4xl text-gray-300 mb-3 block"></i>
                        <p className="text-gray-500 dark:text-gray-400 italic">{t.blog.comments.noComments}</p>
                    </div>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="flex gap-4 group animate-fade-in">
                            <div className="flex-shrink-0">
                                <img 
                                    src={getAvatarUrl(comment.avatarSeed)} 
                                    alt={comment.user} 
                                    className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600" 
                                />
                            </div>
                            <div className="flex-1">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none border border-gray-200 dark:border-gray-700 shadow-sm relative hover:shadow-md transition-shadow">
                                    
                                    {/* Comment Header */}
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className="font-bold text-gray-900 dark:text-white font-sans mr-2">{comment.user}</span>
                                            <span className="text-xs text-gray-400 font-mono">{comment.date}</span>
                                            {comment.isEdited && <span className="text-xs text-gray-400 ml-2 italic">(edited)</span>}
                                        </div>
                                        
                                        {/* Actions (Only visible on hover or if menu open - kept simple here) */}
                                        {editingCommentId !== comment.id && (
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleStartEdit(comment)} className="text-xs text-gray-400 hover:text-academic-accent dark:hover:text-blue-400" title={t.blog.comments.actions.edit}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button onClick={() => handleDelete(comment.id)} className="text-xs text-gray-400 hover:text-red-500" title={t.blog.comments.actions.delete}>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Comment Body */}
                                    {editingCommentId === comment.id ? (
                                        <div className="mt-2">
                                            <textarea 
                                                value={editBuffer}
                                                onChange={(e) => setEditBuffer(e.target.value)}
                                                className="w-full p-2 border border-academic-accent rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm font-serif focus:outline-none"
                                                rows={3}
                                            />
                                            <div className="flex justify-end gap-2 mt-2">
                                                <button onClick={() => setEditingCommentId(null)} className="text-xs font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                                    {t.blog.comments.actions.cancel}
                                                </button>
                                                <button onClick={() => handleSaveEdit(comment.id)} className="text-xs font-bold px-3 py-1 bg-academic-accent text-white rounded hover:bg-blue-700">
                                                    {t.blog.comments.actions.save}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-700 dark:text-gray-300 text-sm font-serif leading-relaxed whitespace-pre-wrap">
                                            {comment.text}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* New Comment Form & Identity Section */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                
                {/* Identity Control */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative group">
                         <img 
                            src={getAvatarUrl(isEditingProfile ? tempProfile.avatarSeed : currentUser.avatarSeed)} 
                            alt="Current User" 
                            className="w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm"
                        />
                         {isEditingProfile && (
                             <button onClick={handleRandomizeAvatar} className="absolute -bottom-1 -right-1 bg-academic-accent text-white w-5 h-5 rounded-full flex items-center justify-center text-xs hover:scale-110 transition-transform" title="Randomize Avatar">
                                 <i className="fas fa-dice"></i>
                             </button>
                         )}
                    </div>

                    <div className="flex-1">
                        {isEditingProfile ? (
                            <input 
                                type="text" 
                                value={tempProfile.name}
                                onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                                placeholder={t.blog.comments.enterName}
                                className="text-sm font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 focus:border-academic-accent outline-none w-full max-w-xs"
                            />
                        ) : (
                            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                <span className="text-xs font-normal text-gray-500 dark:text-gray-400 mr-2 uppercase tracking-wide">{t.blog.comments.postingAs}</span>
                                {currentUser.name}
                            </p>
                        )}
                    </div>

                    <button 
                        onClick={toggleProfileEdit}
                        className="text-xs font-medium text-academic-accent dark:text-blue-400 hover:underline"
                    >
                        {isEditingProfile ? t.blog.comments.saveProfile : t.blog.comments.editProfile}
                    </button>
                </div>

                {/* Text Area */}
                <form onSubmit={handlePostComment} className="relative">
                    <textarea
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        placeholder={t.blog.comments.placeholder}
                        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl p-4 h-28 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-academic-accent/20 focus:border-academic-accent outline-none font-serif text-sm resize-none transition-all shadow-inner"
                    />
                    <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-gray-400 italic">{t.blog.comments.simulatedNote}</span>
                        <button 
                            type="submit"
                            disabled={!newCommentText.trim()}
                            className={`px-6 py-2.5 rounded-lg font-bold text-sm font-sans transition-all flex items-center gap-2 ${
                                newCommentText.trim() 
                                ? 'bg-academic-accent text-white hover:bg-blue-700 shadow-md hover:shadow-lg translate-y-0' 
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <i className="fas fa-paper-plane"></i> {t.blog.comments.submit}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { t } = useThemeLanguage();

  return (
    <div className="w-full bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                
                {/* --- LEFT COLUMN (MAIN CONTENT) --- */}
                <div className="lg:col-span-3">
                    
                    {/* BREADCRUMB / HEADER */}
                    <header className="mb-10 pb-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-sans">
                                {selectedPost ? t.blog.articleView : t.blog.header}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 font-serif italic">
                                {selectedPost ? selectedPost.category : t.blog.subHeader}
                            </p>
                        </div>
                        {selectedPost && (
                            <button 
                                onClick={() => setSelectedPost(null)}
                                className="text-sm font-bold text-academic-accent dark:text-blue-400 hover:underline flex items-center gap-2 mb-2"
                            >
                                <i className="fas fa-arrow-left"></i> {t.blog.back}
                            </button>
                        )}
                    </header>

                    {/* CONTENT AREA */}
                    {selectedPost ? (
                        // --- DETAILED POST VIEW ---
                        <article className="animate-fade-in">
                            <div className="h-64 w-full rounded-lg overflow-hidden mb-8 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <img 
                                    src={selectedPost.image} 
                                    alt={selectedPost.title} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            <div className="mb-8">
                                <span className="text-academic-accent dark:text-blue-400 font-bold text-sm uppercase tracking-wide mb-2 block">{selectedPost.date}</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-sans leading-tight mb-4">{selectedPost.title}</h2>
                            </div>

                            <div className="prose prose-lg dark:prose-invert text-gray-800 dark:text-gray-300 font-serif max-w-none">
                                {selectedPost.content}
                            </div>

                            {/* --- COMMENTS SECTION --- */}
                            <CommentsSection postTitle={selectedPost.title} />
                        </article>
                    ) : (
                        // --- GRID VIEW ---
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {BLOG_POSTS.map((post) => (
                                <div key={post.id} className="group flex flex-col bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-academic-accent dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg overflow-hidden h-full">
                                    {/* Image */}
                                    <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
                                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 text-xs font-bold text-gray-900 dark:text-white rounded shadow-sm z-10">
                                            {post.category}
                                        </div>
                                        <img 
                                            src={post.image} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="mb-4">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-sans leading-snug mb-2 group-hover:text-academic-accent dark:group-hover:text-blue-400 transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 font-serif line-clamp-3 leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                        
                                        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                                            <span className="text-xs text-gray-400 font-mono">{post.date}</span>
                                            <button 
                                                onClick={() => setSelectedPost(post)}
                                                className="text-sm font-bold text-academic-accent dark:text-blue-400 hover:translate-x-1 transition-transform flex items-center gap-1"
                                            >
                                                {t.blog.readMore} <i className="fas fa-arrow-right text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                {/* --- RIGHT COLUMN (SIDEBAR) --- */}
                <Sidebar />
            </div>
        </div>
    </div>
  );
};
