

export const Header = () => {
  const { user, toggleTheme, theme } = useContext(AppContext);
  return (
    <header>
      <h1>Welcome, {user.name} ({user.age} years old)</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </button>
    </header>
  );
}