import { User, getAuth } from 'firebase/auth';
import nookies from 'nookies';
import { createContext, useEffect, useState } from 'react';
import firebase from '../firebase/clientApp';

export const AuthContext = createContext<{
  user: User | null;
  editPage: boolean;
  toggleEditPage: () => void;
}>({
  user: null,
  editPage: false,
  toggleEditPage: () => {},
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [editPage, setEditPage] = useState<boolean>(false);
  const auth = getAuth(firebase);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });
  }, [auth]);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, [auth]);

  const toggleEditPage = (): void => {
    setEditPage(!editPage);
  };

  return (
    <AuthContext.Provider value={{ user, editPage, toggleEditPage }}>
      {children}
    </AuthContext.Provider>
  );
}
