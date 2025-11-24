import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-kalqy-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-kalqy-cyan to-kalqy-magenta rounded-md flex items-center justify-center">
            <span className="font-display font-bold text-black text-lg">K</span>
          </div>
          <h1 className="font-display font-bold text-xl tracking-wider text-white">
            KALQY <span className="text-kalqy-lime text-sm font-sans font-normal opacity-75">STUDIO</span>
          </h1>
        </div>
        <div className="text-xs text-gray-400 border border-white/10 px-2 py-1 rounded bg-white/5">
          Gemini 2.5 Flash
        </div>
      </div>
    </header>
  );
};