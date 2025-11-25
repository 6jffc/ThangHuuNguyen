import React, { useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { base64ToUint8Array, float32ToPCM16, arrayBufferToBase64 } from '../services/geminiService';

export const LiveSession: React.FC = () => {
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [volume, setVolume] = useState(0);
  
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const startSession = async () => {
    try {
      setStatus('connecting');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      inputContextRef.current = new AudioContextClass({ sampleRate: 16000 });
      outputContextRef.current = new AudioContextClass({ sampleRate: 24000 });
      nextStartTimeRef.current = 0;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: "You are a helpful academic research assistant.",
        },
        callbacks: {
          onopen: () => {
            setStatus('connected');
            setActive(true);
            
            if (!inputContextRef.current) return;
            const source = inputContextRef.current.createMediaStreamSource(stream);
            const scriptProcessor = inputContextRef.current.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              if (!active) return;
              const inputData = e.inputBuffer.getChannelData(0);
              
              let sum = 0;
              for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
              setVolume(Math.sqrt(sum / inputData.length));

              const pcmData = float32ToPCM16(inputData);
              const base64Data = arrayBufferToBase64(pcmData.buffer);

              sessionPromise.then(session => {
                  session.sendRealtimeInput({
                      media: {
                          mimeType: 'audio/pcm;rate=16000',
                          data: base64Data
                      }
                  });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputContextRef.current.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
             const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (audioData && outputContextRef.current) {
                 const ctx = outputContextRef.current;
                 const audioBytes = base64ToUint8Array(audioData);
                 const dataInt16 = new Int16Array(audioBytes.buffer);
                 const float32 = new Float32Array(dataInt16.length);
                 for (let i = 0; i < dataInt16.length; i++) {
                     float32[i] = dataInt16[i] / 32768.0;
                 }
                 
                 const audioBuffer = ctx.createBuffer(1, float32.length, 24000);
                 audioBuffer.copyToChannel(float32, 0);

                 nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                 const source = ctx.createBufferSource();
                 source.buffer = audioBuffer;
                 source.connect(ctx.destination);
                 source.start(nextStartTimeRef.current);
                 nextStartTimeRef.current += audioBuffer.duration;
                 
                 sourcesRef.current.add(source);
                 source.onended = () => sourcesRef.current.delete(source);
             }

             if (msg.serverContent?.interrupted) {
                 sourcesRef.current.forEach(s => s.stop());
                 sourcesRef.current.clear();
                 nextStartTimeRef.current = 0;
             }
          },
          onclose: () => {
             setStatus('idle');
             setActive(false);
          },
          onerror: (err) => {
              console.error(err);
              setStatus('error');
              setActive(false);
          }
        }
      });
      sessionPromiseRef.current = sessionPromise;

    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  const stopSession = () => {
      setActive(false);
      setStatus('idle');
      streamRef.current?.getTracks().forEach(t => t.stop());
      inputContextRef.current?.close();
      outputContextRef.current?.close();
      sessionPromiseRef.current?.then(session => {
          // @ts-ignore
          if(session.close) session.close(); 
      });
  };

  return (
    <div className="h-full flex items-center justify-center p-6 bg-white dark:bg-gray-800 transition-colors duration-300">
       <div className="max-w-lg w-full text-center">
          
          <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-sans">Live Nexus</h2>
              <p className="text-gray-500 dark:text-gray-400 font-serif italic">Real-time conversational audio interface.</p>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[200px] border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 p-8 shadow-sm">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-300 border-2 ${
                  active ? 'border-academic-accent bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
              }`}>
                  {status === 'connecting' ? (
                      <div className="w-6 h-6 border-2 border-academic-accent border-t-transparent rounded-full animate-spin"></div>
                  ) : active ? (
                       <div className="flex items-center gap-1 h-8">
                           {[...Array(5)].map((_, i) => (
                               <div key={i} className="w-1.5 bg-academic-accent rounded-full transition-all duration-75" 
                                    style={{ height: `${Math.max(8, Math.min(32, volume * 100 * (i + 1)))}px` }}></div>
                           ))}
                       </div>
                  ) : (
                      <i className="fas fa-microphone text-2xl text-gray-400 dark:text-gray-500"></i>
                  )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 font-sans font-medium mb-6">
                  {status === 'connecting' ? 'Establishing connection...' : 
                   active ? 'Listening...' : 'Ready to start'}
              </p>

              <button
                onClick={active ? stopSession : startSession}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${
                    active 
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30' 
                    : 'bg-academic-accent text-white hover:bg-blue-700'
                }`}
              >
                  {active ? "End Session" : "Start Conversation"}
              </button>
          </div>
       </div>
    </div>
  );
};