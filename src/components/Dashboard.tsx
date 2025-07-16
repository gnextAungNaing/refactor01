import React, { useState, useEffect, createContext, useContext } from 'react';

// Fake API
const fetchUserData = () =>
  new Promise(res =>
    setTimeout(() => res({ name: 'Alice', age: 28, loggedIn: true }), 800)
  );

const fetchNotifications = () =>
  new Promise(res =>
    setTimeout(() => res(['Welcome!', 'Update your profile.']), 1000)
  );

// Context (badly implemented)
const AppContext = createContext();

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userAge, setUserAge] = useState(null); // duplicate state
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0); // derived state
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');

  // Context is used in a weird way
  const contextValue = {
    user,
    notifications,
    theme,
    toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light'),
    addNotification: n => {
      setNotifications([...notifications, n]);
      setNotificationCount(notificationCount + 1);
    },
  };

  useEffect(() => {
    fetchUserData()
      .then(data => {
        setUser(data);
        setUserAge(data.age); // redundant
        setLoading(false);
      })
      .catch(err => setError('Failed to load user'));
  }, []);

  useEffect(() => {
    fetchNotifications()
      .then(notes => {
        setNotifications(notes);
        setNotificationCount(notes.length);
      })
      .catch(() => setNotifications([]));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <AppContext.Provider value={contextValue}>
      <div
        style={{
          padding: 20,
          backgroundColor: theme === 'light' ? '#fff' : '#333',
          color: theme === 'light' ? '#000' : '#fff',
        }}
      >
        <Header />
        <Main />
        <Footer />
      </div>
    </AppContext.Provider>
  );
};

function Header() {
  const { user, toggleTheme, theme } = useContext(AppContext);
  return (
    <header>
      <h1>Welcome, {user.name}</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </button>
    </header>
  );
}

function Main() {
  const { notifications, addNotification } = useContext(AppContext);
  const [input, setInput] = useState('');

  return (
    <main>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder='New notification'
      />
      <button
        onClick={() => {
          if (input.trim()) {
            addNotification(input.trim());
            setInput('');
          }
        }}
      >
        Add
      </button>
    </main>
  );
}

function Footer() {
  const { user } = useContext(AppContext);
  return <footer>User is {user.loggedIn ? 'logged in' : 'logged out'}</footer>;
}
