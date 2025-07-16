import { Dashboard } from './components/Dashboard';
import { ThemeProvider } from './context/useTheme';
import { UserProvider } from './context/useUser';

export const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <Dashboard />
      </UserProvider>
    </ThemeProvider>
  );
};
