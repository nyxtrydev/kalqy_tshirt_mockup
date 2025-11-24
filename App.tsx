import React, { useState } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { PreviewArea } from './components/PreviewArea';
import { DesignConfig, AspectRatio, GeneratedImage } from './types';
import { generateDesignImage } from './services/geminiService';
import { AlertCircle } from 'lucide-react';

// Default prompt from user request
const DEFAULT_PROMPT = "A flat-lay mockup of a premium white t-shirt featuring the 'KALQY' brand design in a sketchy streetwear style. The text 'KALQY' is across the chest in a bold, hand-drawn font with thick vibrant outlines in Cyan and Hot Pink. Below the text is a dynamic illustration of a pony horse; the pony is white, but its form is revealed through energetic scribbled lines in Lime Green, Yellow, and Magenta. Abstract geometric confetti shapes (triangles and squiggles) in brand colors are scattered around the design. Clean white background, studio lighting.";

const App: React.FC = () => {
  const [config, setConfig] = useState<DesignConfig>({
    prompt: DEFAULT_PROMPT,
    aspectRatio: AspectRatio.Square,
  });

  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const imageUrl = await generateDesignImage(config.prompt, config.aspectRatio);
      setGeneratedImage({
        url: imageUrl,
        prompt: config.prompt,
        timestamp: Date.now(),
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate design. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-kalqy-cyan selection:text-black">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3 text-red-200">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
          {/* Controls - 4 columns on large screens */}
          <div className="lg:col-span-4 h-full">
            <ControlPanel
              config={config}
              setConfig={setConfig}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>

          {/* Preview - 8 columns on large screens */}
          <div className="lg:col-span-8 h-full">
            <PreviewArea
              image={generatedImage}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </main>

      {/* Background Ambience */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>
    </div>
  );
};

export default App;