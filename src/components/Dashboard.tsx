import { useState, useEffect, createContext, useContext } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { fetchNotifications, fetchUserData } from '@/api/fakeApi';
import { User } from '@/types/User';

const AppContext = createContext();

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userAge, setUserAge] = useState<number | null>(null); // duplicate state
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0); // derived state
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const contextValue = {
    user,
    notifications,
    theme,
    toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light'),
    addNotification: (n: Notification) => {
      setNotifications([...notifications, n]);
      setNotificationCount(notificationCount + 1);
    },
  };

  useEffect(() => {
    fetchUserData()
      .then((data: User) => {
        setUser(data);
        setUserAge(data.age); // redundant
        setLoading(false);
      })
      .catch(() => setError('Failed to load user'));
  }, []);

  useEffect(() => {
    fetchNotifications()
      .then((notes: Notification[]) => {
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