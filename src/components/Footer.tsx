import { useContext } from "react";

export const Footer = () => {
  const { user } = useContext(AppContext);
  return <footer>User is {user.loggedIn ? 'logged in' : 'logged out'}</footer>;
}
