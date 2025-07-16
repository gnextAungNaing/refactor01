import { User } from "@/types/User";

export const Footer = ({ user }: { user: User | null }) => {
  return <footer>User is {user?.loggedIn ? 'logged in' : 'logged out'}</footer>;
}
