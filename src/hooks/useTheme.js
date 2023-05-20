import { useState, useCallback } from 'react';

export default function useTheme(defaultTheme = 'light') {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = useCallback(() => {
    setTheme(theme => theme === 'light' ? 'dark' : 'light');
  }, []);

  return [ theme, toggleTheme ];
}