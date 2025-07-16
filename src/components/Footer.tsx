import { useUser } from "@/context/useUser";

export const Footer = () => {
  const { user } = useUser();
  return <footer>User is {user?.loggedIn ? 'logged in' : 'logged out'}</footer>;
}
