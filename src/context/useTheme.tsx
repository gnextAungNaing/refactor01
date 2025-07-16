import { createContext, useContext, useState } from "react"

export const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
   const [theme, setTheme] = useState<'light' | 'dark'>('light');
   const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
   return (
      <ThemeContext value={{theme, toggleTheme}}>
         {children}
      </ThemeContext>
   );
}

export const useTheme = () => useContext(ThemeContext);