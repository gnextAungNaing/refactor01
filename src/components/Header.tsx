import { useTheme } from "@/context/useTheme";
import { useUser } from "@/context/useUser";

export const Header = () => {
  const { toggleTheme, theme } = useTheme();
  const { user } = useUser();
  return (
    <header>
      <h1>Welcome, {user?.name} ({user?.age} years old)</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </button>
    </header>
  );
}