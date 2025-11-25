import React, { useState } from 'react';
import { searchGroundedQuery } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ResearchHub: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: query,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    try {
      const result = await searchGroundedQuery(userMsg.text);
      const text = result.text || "No response generated.";
      
      // @ts-ignore
      const chunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = chunks
        .filter((c: any) => c.web?.uri)
        .map((c: any) => ({ uri: c.web.uri, title: c.web.title || new URL(c.web.uri).hostname }));

      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: text,
        sources: sources,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Error retrieving information. Please try again.",
        timestamp: Date.now()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-white border-x border-gray-100 min-h-screen">
       <div className="p-6 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900 font-sans">Research Search</h2>
          <p className="text-gray-500 text-xs font-serif">Grounded by Google Search & Gemini 2.5 Flash</p>
       </div>

       <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          {messages.length === 0 && (
             <div className="flex flex-col items-center justify-center h-full text-gray-400 mt-20">
                <i className="fas fa-search text-3xl mb-3 opacity-20"></i>
                <p className="font-serif italic text-sm">Query the latest academic papers or tech news.</p>
             </div>
          )}
          {messages.map((msg) => (
             <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg p-5 ${
                  msg.role === 'user' 
                  ? 'bg-blue-50 text-gray-800 border border-blue-100' 
                  : 'bg-white text-gray-900 border border-gray-200'
                }`}>
                   <p className="whitespace-pre-wrap leading-relaxed font-serif text-sm">{msg.text}</p>
                   {msg.sources && msg.sources.length > 0 && (
                     <div className="mt-4 pt-3 border-t border-gray-100">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Citations</p>
                        <ul className="list-disc pl-4 space-y-1">
                           {msg.sources.map((src, idx) => (
                              <li key={idx} className="text-xs">
                                <a 
                                  href={src.uri} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="text-academic-accent hover:underline truncate block"
                                >
                                  {src.title}
                                </a>
                              </li>
                           ))}
                        </ul>
                     </div>
                   )}
                </div>
             </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-white rounded-lg p-4 border border-gray-200">
                 <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                 </div>
               </div>
             </div>
          )}
       </div>

       <div className="p-6 border-t border-gray-200 bg-white sticky bottom-0">
         <form onSubmit={handleSearch} className="relative">
           <input
             type="text"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder="Search query..."
             className="w-full bg-gray-50 text-gray-900 pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:border-academic-accent focus:ring-1 focus:ring-academic-accent outline-none transition-all font-serif text-sm"
           />
           <button 
             type="submit" 
             className="absolute right-2 top-2 p-1.5 text-gray-400 hover:text-academic-accent transition-colors"
             disabled={loading}
           >
             <i className="fas fa-arrow-right"></i>
           </button>
         </form>
       </div>
    </div>
  );
};