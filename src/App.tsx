import React, { useEffect } from 'react';
import { AppRouter } from './router';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { useUIStore } from '@/stores/useUIStore';

function App() {
  const { theme } = useUIStore();

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Set CSS variables for theming
    document.documentElement.style.setProperty('--toast-bg', theme === 'dark' ? '#1f2937' : '#ffffff');
    document.documentElement.style.setProperty('--toast-color', theme === 'dark' ? '#f9fafb' : '#111827');
    document.documentElement.style.setProperty('--toast-border', theme === 'dark' ? '#374151' : '#e5e7eb');
  }, [theme]);

  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;