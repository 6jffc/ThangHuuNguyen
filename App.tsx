import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Blog } from './components/Blog';
import { Projects } from './components/Projects';
import { Roadmap } from './components/Roadmap';
import { AppRoute } from './types';
import { ThemeLanguageProvider } from './contexts/ThemeLanguageContext';

const AppContent: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.PROFILE);

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.BLOG:
        return <Blog />;
      case AppRoute.PROJECTS:
        return <Projects />;
      case AppRoute.ROADMAP:
        return <Roadmap />;
      case AppRoute.PROFILE:
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 transition-colors duration-300">
      <Navigation currentRoute={currentRoute} onNavigate={setCurrentRoute} />
      
      <main className="w-full">
        {renderContent()}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeLanguageProvider>
      <AppContent />
    </ThemeLanguageProvider>
  );
};

export default App;