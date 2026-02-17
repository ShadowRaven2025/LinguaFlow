
import React from 'react';

interface SidebarProps {
  activeView: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '#dashboard' },
    { id: 'courses', label: 'Courses', icon: 'school', path: '#theory' },
    { id: 'flashcards', label: 'Flashcards', icon: 'style', path: '#flashcards' },
    { id: 'admin', label: 'Management', icon: 'settings', path: '#admin' },
  ];

  return (
    <aside className="w-64 glass-dark border-r border-white/10 hidden lg:flex flex-col sticky top-0 h-screen shrink-0">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="material-icons-round text-white">translate</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-white">LinguaFlow</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              activeView === item.id 
                ? 'bg-primary text-white' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-icons-round">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="p-6">
        <div className="glass p-4 rounded-xl border border-white/5">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Current Goal</p>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-white">45<span className="text-sm font-normal text-slate-400 ml-1">min/day</span></span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary h-full w-2/3 shadow-[0_0_10px_rgba(19,127,236,0.5)]"></div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center gap-3 pt-6 border-t border-white/5">
          <img 
            src="https://picsum.photos/seed/alex/100/100" 
            alt="User" 
            className="w-10 h-10 rounded-full border border-white/20"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Alex Rivera</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
