import { User } from "@/types/User";

export const Header = ({ toggleTheme, theme, user }: { toggleTheme: () => void; theme: 'light' | 'dark'; user: User | null }) => {
  return (
    <header>
      <h1>Welcome, {user?.name} ({user?.age} years old)</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </button>
    </header>
  );
}