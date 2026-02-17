
import React from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, LineChart, Line, YAxis, Tooltip } from 'recharts';

const lessonData = [
  { id: 1, title: 'Introduction to Past Tense', course: 'Spanish Level A2', status: 'Published', date: '2 hours ago', icon: 'book', color: 'bg-blue-500' },
  { id: 2, title: 'Common French Slang', course: 'French Mastery B1', status: 'Draft', date: 'Yesterday', icon: 'groups', color: 'bg-purple-500' },
  { id: 3, title: 'Listening: Grocery Shopping', course: 'German Essentials', status: 'Published', date: '3 days ago', icon: 'hearing', color: 'bg-yellow-500' },
  { id: 4, title: 'Kanji Fundamentals II', course: 'Japanese JLPT N5', status: 'Published', date: '1 week ago', icon: 'format_list_bulleted', color: 'bg-pink-500' },
  { id: 5, title: 'Business Negotiation Skills', course: 'Advanced English', status: 'Archived', date: '2 weeks ago', icon: 'chat', color: 'bg-slate-500' },
];

const studentGrowthData = [
  { name: 'Mon', students: 12000 },
  { name: 'Tue', students: 14500 },
  { name: 'Wed', students: 13200 },
  { name: 'Thu', students: 18000 },
  { name: 'Fri', students: 21000 },
  { name: 'Sat', students: 19000 },
  { name: 'Sun', students: 24892 },
];

const activeCoursesLine = [
  { val: 100 }, { val: 120 }, { val: 110 }, { val: 130 }, { val: 125 }, { val: 142 },
];

export const AdminView: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 flex flex-col xl:flex-row gap-8 min-h-screen">
      <div className="flex-1 space-y-8">
        <header className="flex flex-wrap gap-4 items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Content Management</h1>
            <p className="text-slate-400 mt-1">Manage and organize your educational curriculum.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary">search</span>
              <input 
                type="text" 
                placeholder="Search lessons..."
                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/10 text-white transition-all"
              />
            </div>
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/30 active:scale-95 transition-all">
              <span className="material-icons-round">add</span>
              Create New Lesson
            </button>
          </div>
        </header>

        <div className="glass-dark rounded-3xl overflow-hidden border border-white/5">
          <div className="grid grid-cols-12 px-8 py-4 border-b border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            <div className="col-span-5">Lesson Title</div>
            <div className="col-span-3">Course Name</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          <div className="divide-y divide-white/5">
            {lessonData.map((lesson) => (
              <div key={lesson.id} className="grid grid-cols-12 px-8 py-5 items-center hover:bg-white/[0.02] transition-colors group">
                <div className="col-span-5 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${lesson.color} bg-opacity-20 text-white`}>
                    <span className="material-icons-round">{lesson.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-primary transition-colors">{lesson.title}</h4>
                    <p className="text-xs text-slate-500">Last edited: {lesson.date}</p>
                  </div>
                </div>
                <div className="col-span-3">
                  <span className="px-3 py-1 rounded-full glass border border-white/10 text-xs text-slate-300">
                    {lesson.course}
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    lesson.status === 'Published' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 
                    lesson.status === 'Draft' ? 'bg-slate-500' : 'bg-orange-500'
                  }`}></div>
                  <span className="text-sm font-medium text-slate-300">{lesson.status}</span>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all"><span className="material-icons-round text-lg">edit</span></button>
                  <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-red-400 transition-all"><span className="material-icons-round text-lg">delete</span></button>
                  <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all"><span className="material-icons-round text-lg">more_vert</span></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="w-full xl:w-80 space-y-6">
        <div className="glass-dark p-6 rounded-3xl border border-white/5 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Students</p>
              <h3 className="text-4xl font-bold text-white">24,892</h3>
              <p className="text-sm text-green-500 flex items-center gap-1 mt-1">
                <span className="material-icons-round text-xs">trending_up</span>
                +12.4%
              </p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
              <span className="material-icons-round">insights</span>
            </div>
          </div>
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentGrowthData}>
                <Bar dataKey="students" radius={[4, 4, 0, 0]}>
                  {studentGrowthData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === studentGrowthData.length - 1 ? '#137fec' : '#1e293b'} 
                      className={index === studentGrowthData.length - 1 ? 'shadow-[0_0_10px_rgba(19,127,236,0.5)]' : ''}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-dark p-6 rounded-3xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Active Courses</p>
              <h3 className="text-3xl font-bold text-white">142 <span className="text-sm font-normal text-slate-400 ml-1">Global</span></h3>
            </div>
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 border border-purple-500/20">
              <span className="material-icons-round">star</span>
            </div>
          </div>
          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeCoursesLine}>
                <Line type="monotone" dataKey="val" stroke="#137fec" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-dark p-6 rounded-3xl border border-white/5">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-3">
            <QuickActionButton icon="assessment" label="Reports" color="bg-blue-500" />
            <QuickActionButton icon="campaign" label="Announce" color="bg-orange-500" />
            <QuickActionButton icon="cloud_upload" label="Bulk Import" color="bg-green-500" />
            <QuickActionButton icon="help" label="Support" color="bg-purple-500" />
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5">
             <div className="flex justify-between items-center mb-2">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Storage Status</span>
               <span className="text-[10px] font-bold text-white">650GB / 1TB</span>
             </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-primary w-[65%] shadow-[0_0_8px_rgba(19,127,236,0.5)]"></div>
             </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

const QuickActionButton: React.FC<{ icon: string, label: string, color: string }> = ({ icon, label, color }) => (
  <button className="flex flex-col items-center justify-center p-4 glass rounded-2xl hover:bg-white/10 transition-all border border-white/10 group">
    <span className={`material-icons-round ${color} bg-opacity-20 p-2 rounded-lg text-white group-hover:scale-110 transition-transform mb-2`}>{icon}</span>
    <span className="text-[10px] font-bold text-slate-400 group-hover:text-white">{label}</span>
  </button>
);
