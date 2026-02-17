
import React, { useState, useEffect } from 'react';
import { DashboardView } from './views/DashboardView';
import { TheoryView } from './views/TheoryView';
import { FlashcardsView } from './views/FlashcardsView';
import { AdminView } from './views/AdminView';
import { Sidebar } from './components/Sidebar';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('dashboard');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'dashboard';
      setCurrentView(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'theory':
        return <TheoryView />;
      case 'flashcards':
        return <FlashcardsView />;
      case 'admin':
        return <AdminView />;
      default:
        return <DashboardView />;
    }
  };

  // Some views might be full-screen (theory, flashcards)
  const isFullScreen = ['theory', 'flashcards'].includes(currentView);

  return (
    <div className="flex min-h-screen">
      <div className="gradient-bg" />
      
      {!isFullScreen && <Sidebar activeView={currentView} />}
      
      <main className={`flex-1 transition-all ${isFullScreen ? 'w-full' : 'lg:ml-0'}`}>
        {renderView()}
      </main>
    </div>
  );
};

export default App;
