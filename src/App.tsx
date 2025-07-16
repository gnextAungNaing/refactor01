import { Dashboard } from './components/Dashboard';
import { ThemeProvider } from './context/useTheme';

export const App = () => {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
};
