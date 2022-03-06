import type { NextPage } from 'next';
import firebase from '../../firebase/clientApp';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import s from './style.module.scss';
import { useState } from 'react';

const auth = getAuth(firebase);

const login = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password);
};
const logout = () => {
  signOut(auth);
};

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }
  return (
    <div className={s.loginForm}>
      <input
        className={s.loginFormElement}
        placeholder='email'
        type='email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={s.loginFormElement}
        placeholder='password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className={s.loginFormElement}
        disabled={!!(!email && !password)}
        onClick={() => login(email, password)}>
        Log in
      </button>
    </div>
  );
};

export default Login;
