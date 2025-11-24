import React from 'react';
import { AspectRatio, DesignConfig } from '../types';
import { RefreshCw, Zap } from 'lucide-react';

interface ControlPanelProps {
  config: DesignConfig;
  setConfig: React.Dispatch<React.SetStateAction<DesignConfig>>;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  config,
  setConfig,
  onGenerate,
  isGenerating,
}) => {
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConfig((prev) => ({ ...prev, prompt: e.target.value }));
  };

  const handleRatioChange = (ratio: AspectRatio) => {
    setConfig((prev) => ({ ...prev, aspectRatio: ratio }));
  };

  return (
    <div className="bg-kalqy-panel border border-white/10 rounded-xl p-6 flex flex-col gap-6 h-full shadow-xl">
      <div>
        <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
          <Zap size={18} className="text-kalqy-yellow" />
          Design Prompt
        </h2>
        <p className="text-sm text-gray-400 mb-3">Describe your streetwear concept in detail.</p>
        <textarea
          value={config.prompt}
          onChange={handlePromptChange}
          className="w-full h-40 bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-gray-200 focus:outline-none focus:border-kalqy-cyan focus:ring-1 focus:ring-kalqy-cyan transition-all resize-none font-mono leading-relaxed"
          placeholder="e.g. A white hoodie with neon cybernetic details..."
        />
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider text-xs">Aspect Ratio</h2>
        <div className="grid grid-cols-5 gap-2">
          {Object.values(AspectRatio).map((ratio) => (
            <button
              key={ratio}
              onClick={() => handleRatioChange(ratio)}
              className={`py-2 px-1 rounded-md text-xs font-medium transition-all border ${
                config.aspectRatio === ratio
                  ? 'bg-white/10 border-kalqy-pink text-kalqy-pink shadow-[0_0_10px_rgba(255,105,180,0.3)]'
                  : 'bg-black/20 border-white/5 text-gray-500 hover:bg-white/5 hover:text-gray-300'
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4">
        <button
          onClick={onGenerate}
          disabled={isGenerating || !config.prompt.trim()}
          className={`w-full py-4 rounded-lg font-bold text-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            isGenerating
              ? 'bg-gray-700 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-kalqy-cyan via-kalqy-lime to-kalqy-yellow hover:opacity-90 active:scale-[0.99] shadow-[0_0_20px_rgba(0,255,255,0.3)]'
          }`}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="animate-spin" size={20} />
              Generating...
            </>
          ) : (
            'Generate Mockup'
          )}
        </button>
      </div>
    </div>
  );
};