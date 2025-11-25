import React, { useState, useRef } from 'react';
import { editImage } from '../services/geminiService';

export const VisionStudio: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64Data = result.split(',')[1];
        setImage(base64Data);
        setMimeType(file.type);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image || !prompt) return;
    setLoading(true);
    try {
      const generatedImage = await editImage(image, mimeType, prompt);
      setResultImage(generatedImage);
    } catch (error) {
      console.error(error);
      alert("Failed to edit image. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-10">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 font-sans">Vision Studio</h2>
        <p className="text-gray-500 font-serif">Experimenting with generative image editing using <span className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">gemini-2.5-flash-image</span>.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Input</h3>
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer border-2 border-dashed rounded-lg h-64 flex flex-col items-center justify-center transition-colors ${image ? 'border-academic-accent bg-gray-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}`}
          >
            {image ? (
              <img src={`data:${mimeType};base64,${image}`} className="h-full w-full object-contain p-2" alt="Source" />
            ) : (
              <div className="text-center p-4">
                <i className="fas fa-cloud-upload-alt text-3xl text-gray-300 mb-3"></i>
                <p className="text-sm text-gray-500 font-sans">Upload reference image</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Instructions</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Add a retro filter', 'Remove the background'"
                className="w-full bg-white border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-academic-accent focus:border-academic-accent outline-none resize-none h-24 font-serif text-sm"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading || !image || !prompt}
              className={`w-full py-2.5 rounded-md font-sans text-sm font-medium transition-all ${
                loading || !image || !prompt
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-academic-accent text-white hover:bg-blue-700 shadow-sm'
              }`}
            >
              {loading ? 'Processing...' : 'Execute Edit'}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Output</h3>
          <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden relative min-h-[300px]">
             {resultImage ? (
                <img src={resultImage} alt="Generated" className="w-full h-full object-contain p-2" />
             ) : (
               <div className="text-gray-400 flex flex-col items-center">
                 <i className="fas fa-image text-3xl mb-2 opacity-20"></i>
                 <span className="text-sm font-sans">Generated result</span>
               </div>
             )}
          </div>
          {resultImage && (
            <div className="mt-4 flex justify-end">
              <a href={resultImage} download="gemini_edit.png" className="text-xs font-bold text-academic-accent hover:underline flex items-center gap-1">
                <i className="fas fa-download"></i> Download
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};