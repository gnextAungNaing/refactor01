import { fetchUserData } from "@/api/fakeApi";
import { User } from "@/types/User";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext<{
  user: User | null;
  loading: boolean;
  error: string | null;
}>({
  user: null,
  loading: true,
  error: null,
});

export const UserProvider = ({ children }: { children: React.ReactNode; }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUserData()
      .then((data: User) => {
        setUser(data);
      })
      .catch(() => setError('Failed to load user'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);