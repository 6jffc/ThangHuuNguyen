import React, { useState, useRef, useEffect } from 'react';
import { generateVideo } from '../services/geminiService';

export const MotionLab: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [apiKeySelected, setApiKeySelected] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkKeyStatus();
  }, []);

  const checkKeyStatus = async () => {
    if ((window as any).aistudio) {
        try {
            const hasKey = await (window as any).aistudio.hasSelectedApiKey();
            setApiKeySelected(hasKey);
        } catch (e) {
            console.error(e);
        }
    }
  };

  const handleSelectKey = async () => {
    if ((window as any).aistudio) {
        await (window as any).aistudio.openSelectKey();
        setApiKeySelected(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64Data = result.split(',')[1];
        setImage(base64Data);
        setMimeType(file.type);
        setVideoUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const url = await generateVideo(prompt, image, mimeType, aspectRatio);
      setVideoUrl(url);
    } catch (error: any) {
      console.error(error);
      if (error.message?.includes("Requested entity was not found")) {
          setApiKeySelected(false);
          alert("API Key session expired. Please re-select key.");
      } else {
          alert("Generation failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-10">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 font-sans">Motion Lab</h2>
        <p className="text-gray-500 font-serif">Video synthesis via <span className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">veo-3.1-fast-generate-preview</span>.</p>
        {!apiKeySelected && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 p-4 rounded-md flex items-center justify-between">
                <div>
                    <p className="text-yellow-800 text-sm font-medium">Veo requires a paid API key.</p>
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-xs text-yellow-600 hover:underline">Billing Info</a>
                </div>
                <button 
                    onClick={handleSelectKey}
                    className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-sm font-bold rounded border border-yellow-300 transition-colors"
                >
                    Select Key
                </button>
            </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
             <div 
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer border-2 border-dashed rounded-lg h-48 flex flex-col items-center justify-center transition-colors relative overflow-hidden ${image ? 'border-academic-accent bg-gray-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}`}
              >
                {image ? (
                  <img src={`data:${mimeType};base64,${image}`} className="h-full w-full object-cover opacity-80" alt="Source" />
                ) : (
                    <div className="text-center">
                        <i className="fas fa-video text-2xl text-gray-300 mb-2"></i>
                        <span className="block text-sm text-gray-500 font-sans">Upload Image</span>
                    </div>
                )}
                 {image && <div className="absolute inset-0 flex items-center justify-center"><span className="bg-white/90 px-3 py-1 rounded text-gray-800 text-xs shadow-sm font-sans">Change Image</span></div>}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setAspectRatio('16:9')}
                    className={`p-2 rounded border text-sm font-medium transition-all ${aspectRatio === '16:9' ? 'bg-blue-50 border-academic-accent text-academic-accent' : 'bg-white border-gray-200 text-gray-500'}`}
                  >
                      Landscape (16:9)
                  </button>
                  <button 
                    onClick={() => setAspectRatio('9:16')}
                    className={`p-2 rounded border text-sm font-medium transition-all ${aspectRatio === '9:16' ? 'bg-blue-50 border-academic-accent text-academic-accent' : 'bg-white border-gray-200 text-gray-500'}`}
                  >
                      Portrait (9:16)
                  </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Prompt (Optional)</label>
                <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the motion..."
                    className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-400 focus:border-academic-accent outline-none font-serif text-sm"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !image || !apiKeySelected}
                className={`w-full py-3 rounded-md font-bold text-sm shadow-sm transition-all ${
                    loading || !image || !apiKeySelected 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-academic-accent text-white hover:bg-blue-700'
                }`}
              >
                  {loading ? 'Synthesizing...' : 'Generate Video'}
              </button>
        </div>

        <div className="bg-black rounded-lg overflow-hidden border border-gray-300 shadow-md flex items-center justify-center relative min-h-[300px]">
            {videoUrl ? (
                <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain" />
            ) : (
                <div className="text-center p-8">
                    <p className="text-gray-500 font-medium text-sm font-sans">Output preview</p>
                </div>
            )}
            {loading && (
                <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-10">
                     <div className="w-8 h-8 border-2 border-academic-accent border-t-transparent rounded-full animate-spin mb-4"></div>
                     <p className="text-gray-600 font-sans text-xs">Generating video frames...</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};