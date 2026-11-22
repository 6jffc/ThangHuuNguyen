import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Blog } from './components/Blog';
import { Projects } from './components/Projects';
import { Roadmap } from './components/Roadmap';
import { PrivateBlogStudio } from './src/components/PrivateBlogStudio';
import { AppRoute } from './types';
import { ThemeLanguageProvider } from './contexts/ThemeLanguageContext';

const AppContent: React.FC = () => {
  const queryRoute = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('p') : null;
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(queryRoute === '/blog' ? AppRoute.BLOG : AppRoute.PROFILE);
  const isStudioRoute = queryRoute === '/studio';
  if (isStudioRoute) return <PrivateBlogStudio />;
  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.BLOG: return <Blog />;
      case AppRoute.PROJECTS: return <Projects />;
      case AppRoute.ROADMAP: return <Roadmap />;
      case AppRoute.PROFILE:
      default: return <Home />;
    }
  };
  return <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 dark:selection:bg-blue-900 dark:selection:text-blue-100"><Navigation currentRoute={currentRoute} onNavigate={setCurrentRoute} /><main className="w-full">{renderContent()}</main></div>;
};
const App: React.FC = () => <ThemeLanguageProvider><AppContent /></ThemeLanguageProvider>;
export default App;
