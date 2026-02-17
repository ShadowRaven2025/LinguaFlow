
import React from 'react';

export const DashboardView: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, Alex!</h1>
          <p className="text-slate-400 mt-1">You're on fire! Keep up the great work.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 glass rounded-full text-slate-300 hover:text-white transition-colors">
            <span className="material-icons-round">notifications</span>
          </button>
          <div className="flex items-center gap-3 p-1.5 glass rounded-full border border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
            <img 
              alt="User Avatar" 
              className="w-10 h-10 rounded-full border border-white/20" 
              src="https://picsum.photos/seed/profile/100/100"
            />
            <span className="material-icons-round text-slate-400 pr-2">expand_more</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Stats Hero Card */}
          <div className="glass-dark p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
            <div className="relative z-10 flex flex-wrap justify-between items-center gap-8">
              <div className="space-y-1">
                <p className="text-slate-400 font-medium">Daily Streak</p>
                <div className="flex items-center gap-2">
                  <span className="material-icons-round text-orange-500 text-3xl">local_fire_department</span>
                  <span className="text-5xl font-bold text-white tracking-tight">12 <span className="text-lg font-normal text-slate-400">days</span></span>
                </div>
              </div>
              <div className="h-16 w-px bg-white/10 hidden md:block"></div>
              <div className="space-y-1">
                <p className="text-slate-400 font-medium">Total XP</p>
                <div className="flex items-center gap-2">
                  <span className="material-icons-round text-yellow-400 text-3xl">stars</span>
                  <span className="text-5xl font-bold text-white tracking-tight">2,450</span>
                </div>
              </div>
              <div className="h-16 w-px bg-white/10 hidden md:block"></div>
              <div className="space-y-1">
                <p className="text-slate-400 font-medium">Level</p>
                <div className="flex items-center gap-2">
                  <span className="text-5xl font-bold text-primary tracking-tight">49</span>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-semibold uppercase">Exp: √XP</span>
                    <span className="text-sm text-slate-300">Advanced Learner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Learning */}
          <section>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="material-icons-round text-primary">play_circle_filled</span>
              Continue Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-2xl hover:bg-white/[0.08] transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 glass flex items-center justify-center rounded-xl text-2xl">🇬🇧</div>
                    <div>
                      <h3 className="font-bold text-white text-lg">English A1</h3>
                      <p className="text-slate-400 text-sm">Unit 4: Socializing</p>
                    </div>
                  </div>
                  <div className="relative w-14 h-14">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-white/10" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" strokeWidth="4"></circle>
                      <circle className="text-primary" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" strokeDasharray="150" strokeDashoffset="45" strokeWidth="4"></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">70%</div>
                  </div>
                </div>
                <button onClick={() => window.location.hash = '#theory'} className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20">
                  Resume Lesson
                </button>
              </div>

              <div className="glass p-6 rounded-2xl hover:bg-white/[0.08] transition-all cursor-pointer opacity-70 hover:opacity-100">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 glass flex items-center justify-center rounded-xl text-2xl">🇫🇷</div>
                    <div>
                      <h3 className="font-bold text-white text-lg">French A2</h3>
                      <p className="text-slate-400 text-sm">Unit 1: Travel Tips</p>
                    </div>
                  </div>
                  <div className="relative w-14 h-14">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-white/10" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" strokeWidth="4"></circle>
                      <circle className="text-primary/50" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" strokeDasharray="150" strokeDashoffset="120" strokeWidth="4"></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">20%</div>
                  </div>
                </div>
                <button className="w-full py-3 glass hover:bg-white/10 text-white font-bold rounded-xl transition-all">
                  Start Lesson
                </button>
              </div>
            </div>
          </section>

          {/* Daily Missions */}
          <section className="glass p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">Daily Missions</h2>
              <span className="text-sm text-primary font-medium">2/3 Completed</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 glass-dark rounded-xl">
                <div className="w-10 h-10 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                  <span className="material-icons-round">check</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">Learn 10 new words</p>
                  <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-green-500 h-full w-full rounded-full"></div>
                  </div>
                </div>
                <span className="text-slate-400 text-xs">+50 XP</span>
              </div>
              <div className="flex items-center gap-4 p-4 glass-dark rounded-xl">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                  <span className="material-icons-round">trending_up</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">Complete a perfect lesson</p>
                  <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-primary h-full w-1/2 rounded-full shadow-[0_0_10px_rgba(19,127,236,0.3)]"></div>
                  </div>
                </div>
                <span className="text-slate-400 text-xs">+100 XP</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <section className="glass-dark rounded-3xl p-8 flex flex-col h-full border border-white/5">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white">Achievements</h2>
              <button className="text-sm text-primary font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-8 flex-1">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="relative">
                  <div className="w-20 h-20 hexagon bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-all">
                    <span className="material-icons-round text-primary text-4xl">local_fire_department</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-background-dark shadow-lg shadow-green-500/30">
                    <span className="material-icons-round text-[12px] text-white">check</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-white">Streaker</h4>
                  <p className="text-sm text-slate-400 leading-tight">Maintain a 7-day learning streak</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="relative">
                  <div className="w-20 h-20 hexagon bg-purple-500/20 flex items-center justify-center border border-purple-500/30 group-hover:bg-purple-500/30 transition-all">
                    <span className="material-icons-round text-purple-500 text-4xl">explore</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-background-dark">
                    <span className="material-icons-round text-[12px] text-white">check</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-white">Explorer</h4>
                  <p className="text-sm text-slate-400 leading-tight">Start courses in 3 different languages</p>
                </div>
              </div>

              <div className="flex items-center gap-6 opacity-40 grayscale group cursor-not-allowed">
                <div className="relative">
                  <div className="w-20 h-20 hexagon bg-slate-500/20 flex items-center justify-center border border-slate-500/30">
                    <span className="material-icons-round text-slate-400 text-4xl">military_tech</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center border-2 border-background-dark">
                    <span className="material-icons-round text-[12px] text-white">lock</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-white">Polyglot</h4>
                  <p className="text-sm text-slate-400 leading-tight">Reach level B2 in any course</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Friends Online</h3>
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <img 
                    key={i}
                    alt={`Friend ${i}`} 
                    className="w-10 h-10 rounded-full border-2 border-background-dark ring-2 ring-primary/20" 
                    src={`https://picsum.photos/seed/friend${i}/100/100`}
                  />
                ))}
                <div className="w-10 h-10 rounded-full glass border-2 border-background-dark flex items-center justify-center text-xs font-bold text-white">
                  +12
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
