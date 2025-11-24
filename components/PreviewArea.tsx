import React, { useState } from 'react';
import { Download, Maximize2, X } from 'lucide-react';
import { GeneratedImage } from '../types';

interface PreviewAreaProps {
  image: GeneratedImage | null;
  isGenerating: boolean;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({ image, isGenerating }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `kalqy-design-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  if (isFullscreen && image) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
        <button 
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 text-white hover:text-kalqy-pink transition-colors"
        >
          <X size={32} />
        </button>
        <img 
          src={image.url} 
          alt="Full screen design" 
          className="max-w-full max-h-full object-contain rounded-md shadow-2xl shadow-kalqy-cyan/20"
        />
      </div>
    );
  }

  return (
    <div className="bg-kalqy-panel border border-white/10 rounded-xl p-6 h-full min-h-[500px] flex flex-col shadow-xl relative overflow-hidden group">
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-kalqy-pink/10 blur-[50px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-kalqy-cyan/10 blur-[60px] pointer-events-none rounded-full" />

      <div className="flex-1 flex items-center justify-center relative z-10 w-full h-full">
        {isGenerating ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-kalqy-cyan/30 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 border-t-4 border-kalqy-magenta rounded-full animate-spin"></div>
            </div>
            <p className="text-kalqy-cyan font-mono text-sm animate-pulse">RENDERING ASSETS...</p>
          </div>
        ) : image ? (
          <div className="relative w-full h-full flex items-center justify-center group/image">
            <img
              src={image.url}
              alt="Generated Design"
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
              <button
                onClick={toggleFullscreen}
                className="p-3 bg-black/80 backdrop-blur text-white rounded-full hover:bg-kalqy-cyan hover:text-black transition-colors"
                title="Fullscreen"
              >
                <Maximize2 size={20} />
              </button>
              <button
                onClick={handleDownload}
                className="p-3 bg-black/80 backdrop-blur text-white rounded-full hover:bg-kalqy-lime hover:text-black transition-colors"
                title="Download"
              >
                <Download size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 border-2 border-dashed border-white/10 rounded-xl">
            <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
            <h3 className="text-gray-300 font-medium mb-1">No Design Generated</h3>
            <p className="text-gray-500 text-sm">Enter a prompt and hit generate to create your masterpiece.</p>
          </div>
        )}
      </div>

      {image && !isGenerating && (
        <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-gray-500 font-mono truncate">
                PROMPT: {image.prompt}
            </p>
        </div>
      )}
    </div>
  );
};