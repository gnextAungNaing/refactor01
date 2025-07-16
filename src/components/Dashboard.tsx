import { useContext, useEffect, useState } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { fetchUserData } from '@/api/fakeApi';
import { User } from '@/types/User';
import { useTheme } from '@/context/useTheme';

export const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUserData()
      .then((data: User) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setError('Failed to load user'));
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
      }}
    >
      <Header toggleTheme={toggleTheme} theme={theme} user={user} />
      <Main />
      <Footer user={user} />
    </div>
  );
};