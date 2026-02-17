
import React, { useState } from 'react';

export const FlashcardsView: React.FC = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="h-screen bg-background-dark font-display text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[15%] right-[15%] w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[100px] -z-10 animate-pulse delay-700"></div>

      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex items-center justify-between">
        <div 
          onClick={() => window.location.hash = '#dashboard'}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <span className="material-icons-round text-white text-xl">translate</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">LinguaFlow</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">Session Progress</div>
            <div className="flex items-center gap-3">
              <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[30%] shadow-[0_0_8px_rgba(19,127,236,0.6)]"></div>
              </div>
              <span className="text-sm font-medium">15/50</span>
            </div>
          </div>
          <button className="p-2 glass rounded-lg hover:bg-white/10 transition-colors">
            <span className="material-icons-round">settings</span>
          </button>
        </div>
      </nav>

      <main className="w-full max-w-2xl flex flex-col items-center">
        <div 
          onClick={() => setFlipped(!flipped)}
          className={`group perspective-1000 w-full aspect-[1.6/1] cursor-pointer relative transition-all duration-500 ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div className="absolute inset-0 glass-dark rounded-3xl p-12 flex flex-col items-center justify-center text-center border-white/10 shadow-2xl [backface-visibility:hidden]">
            <div className="mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">Noun</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 text-white tracking-tight">Serendipity</h1>
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-full transition-all group/btn">
              <span className="material-icons-round text-primary group-hover/btn:scale-110 transition-transform">volume_up</span>
              <span className="text-sm font-medium">Listen</span>
            </button>
            <div className="absolute bottom-8 text-slate-400 text-sm flex items-center gap-2">
              <span className="material-icons-round text-xs">visibility</span>
              Click card to reveal definition
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 glass-dark rounded-3xl p-12 flex flex-col items-center justify-center text-center border-white/10 shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <h2 className="text-2xl font-bold text-primary mb-4">Definition</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              The occurrence and development of events by chance in a happy or beneficial way.
            </p>
            <div className="mt-8 text-slate-400 text-sm italic">
              "a fortunate stroke of serendipity"
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4 animate-in slide-in-from-bottom duration-700">
          <SRSButton color="red" label="Again" time="Under 1m" shortcut="1" />
          <SRSButton color="orange" label="Hard" time="2 Days" shortcut="2" />
          <SRSButton color="green" label="Good" time="4 Days" shortcut="3" />
          <SRSButton color="blue" label="Easy" time="7 Days" shortcut="4" />
        </div>
      </main>

      <div className="fixed bottom-8 left-8 flex items-center gap-4">
        <div className="glass p-3 rounded-xl flex items-center gap-4 border border-white/10">
          <div className="flex items-center gap-2">
            <kbd className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold border border-white/20 text-white">SPACE</kbd>
            <span className="text-xs text-slate-400">Reveal</span>
          </div>
          <div className="w-px h-4 bg-white/10"></div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {['1', '2', '3', '4'].map(k => (
                <kbd key={k} className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold border border-white/20 text-white">{k}</kbd>
              ))}
            </div>
            <span className="text-xs text-slate-400">Answer</span>
          </div>
        </div>
      </div>

      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        <SideActionIcon icon="insights" title="Stats" />
        <SideActionIcon icon="edit_note" title="Notes" />
        <SideActionIcon icon="menu_book" title="Dictionary" />
        <div className="h-px w-8 mx-auto bg-white/10 my-2"></div>
        <SideActionIcon icon="help_outline" title="Help" isSmall />
      </div>
    </div>
  );
};

const SRSButton: React.FC<{ color: string, label: string, time: string, shortcut: string }> = ({ color, label, time, shortcut }) => {
  const colorMap: Record<string, string> = {
    red: 'border-red-500/20 hover:border-red-500/50 hover:bg-red-500/10 text-red-500',
    orange: 'border-orange-500/20 hover:border-orange-500/50 hover:bg-orange-500/10 text-orange-500',
    green: 'border-green-500/20 hover:border-green-500/50 hover:bg-green-500/10 text-green-500',
    blue: 'border-primary/20 hover:border-primary/50 hover:bg-primary/10 text-primary'
  };
  
  const dotColor: Record<string, string> = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500',
    blue: 'bg-primary'
  };

  return (
    <button className="group flex flex-col items-center gap-1">
      <div className={`glass px-8 py-4 rounded-2xl flex items-center gap-3 transition-all ${colorMap[color]}`}>
        <div className={`w-2 h-2 rounded-full ${dotColor[color]}`}></div>
        <span className="font-medium text-white">{label}</span>
        <span className="text-xs text-slate-500 bg-black/40 px-1.5 py-0.5 rounded ml-2 font-bold">{shortcut}</span>
      </div>
      <span className="text-[10px] text-slate-500 uppercase tracking-tighter font-bold">{time}</span>
    </button>
  );
};

const SideActionIcon: React.FC<{ icon: string, title: string, isSmall?: boolean }> = ({ icon, title, isSmall }) => (
  <button className="glass w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all border border-white/10 group" title={title}>
    <span className={`material-icons-round text-slate-300 group-hover:text-white transition-colors ${isSmall ? 'text-sm' : ''}`}>{icon}</span>
  </button>
);
