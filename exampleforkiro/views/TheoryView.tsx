
import React from 'react';

export const TheoryView: React.FC = () => {
  return (
    <div className="relative h-screen bg-background-dark overflow-hidden flex flex-col font-display">
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-icons-round text-white">translate</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">LinguaFlow</h1>
            <p className="text-xs text-white/50 uppercase tracking-widest">Theory Module</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors text-white">
            <span className="material-icons-round text-sm">settings</span>
          </button>
          <button 
            onClick={() => window.location.hash = '#dashboard'}
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors text-red-400"
          >
            <span className="material-icons-round text-sm">close</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-y-auto pt-24 pb-32">
        <div className="glass-dark w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10">
          <div className="w-full md:w-1/2 p-1 relative min-h-[300px] md:min-h-full">
            <div className="relative h-full w-full rounded-2xl overflow-hidden">
              <img 
                alt="Cafe" 
                className="absolute inset-0 w-full h-full object-cover" 
                src="https://picsum.photos/seed/german-cafe/800/800"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass p-4 rounded-xl border border-white/10">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest">Vocabulary Tip</span>
                  <p className="text-sm mt-1 text-white/90 italic">"Das Café" is a neuter noun in German. Note the accent on the 'é'!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter mb-4 inline-block">Unit 1: Greetings & Basics</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Basics of German</h2>
              <div className="h-1 w-12 bg-primary rounded-full shadow-[0_0_10px_rgba(19,127,236,0.5)]"></div>
            </div>
            
            <div className="space-y-6 text-white/80 leading-relaxed">
              <p className="text-lg">
                Welcome to your first lesson! In German, all nouns are capitalized, and they each have a gender: 
                <span className="text-white font-medium underline decoration-primary decoration-2 underline-offset-4 ml-1">Masculine</span>, 
                <span className="text-white font-medium underline decoration-pink-500/50 decoration-2 underline-offset-4 ml-1">Feminine</span>, or 
                <span className="text-white font-medium underline decoration-green-500/50 decoration-2 underline-offset-4 ml-1">Neuter</span>.
              </p>
              
              <div className="grid grid-cols-1 gap-4 mt-8">
                <div className="glass p-4 rounded-xl border-l-4 border-primary">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-primary">KEY PHRASE</span>
                    <span className="material-icons-round text-primary text-sm cursor-pointer hover:scale-110 transition-transform">volume_up</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Guten Tag</h3>
                  <p className="text-sm text-white/60">Good day / Hello</p>
                </div>
                <div className="glass p-4 rounded-xl border-l-4 border-white/20">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white/40">EXAMPLE</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Ein Kaffee, bitte.</h3>
                  <p className="text-sm text-white/60">A coffee, please.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50">
        <div className="glass p-4 md:px-8 md:py-5 rounded-2xl flex items-center justify-between gap-6 shadow-2xl border border-white/10">
          <button onClick={() => window.location.hash = '#dashboard'} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all">
            <span className="material-icons-round text-sm">arrow_back</span>
            <span className="hidden md:inline font-medium text-sm">Back</span>
          </button>
          
          <div className="flex-grow flex flex-col gap-2 max-w-md">
            <div className="flex gap-1.5 px-1">
              <div className="h-1 flex-grow rounded-full bg-primary shadow-[0_0_8px_rgba(19,127,236,0.6)]"></div>
              <div className="h-1 flex-grow rounded-full bg-primary shadow-[0_0_8px_rgba(19,127,236,0.6)]"></div>
              <div className="h-1 flex-grow rounded-full bg-white/10"></div>
              <div className="h-1 flex-grow rounded-full bg-white/10"></div>
              <div className="h-1 flex-grow rounded-full bg-white/10"></div>
              <div className="h-1 flex-grow rounded-full bg-white/10"></div>
            </div>
            <div className="flex justify-center">
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Step 2 of 6: Theory</span>
            </div>
          </div>

          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-3 transition-all shadow-[0_0_20px_rgba(19,127,236,0.4)] transform active:scale-95 group">
            <span className="text-sm">Continue</span>
            <span className="material-icons-round text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </nav>

      <div className="fixed top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="fixed -bottom-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse delay-1000"></div>
    </div>
  );
};
