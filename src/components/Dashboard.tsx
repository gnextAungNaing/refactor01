import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { useTheme } from '@/context/useTheme';
import { useUser } from '@/context/useUser';

export const Dashboard = () => {
  const { theme } = useTheme();
  const { loading, error } = useUser();

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
      <Header/>
      <Main />
      <Footer />
    </div>
  );
};