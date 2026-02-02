import { useEffect, useState } from 'react';
import { gqlRequest } from '../lib/graphql.js';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => window.localStorage.getItem('tms_token') || '');

  useEffect(() => {
    if (!token) return;
    gqlRequest(
      `query Me {
        me { id username role }
      }`,
      {},
      token
    )
      .then((data) => {
        setUser(data.me);
      })
      .catch(() => {
        setToken('');
        setUser(null);
        window.localStorage.removeItem('tms_token');
      });
  }, [token]);

  const loginAs = async (username) => {
    const password = username === 'admin' ? 'admin123' : 'employee123';
    const data = await gqlRequest(
      `mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          id
          username
          role
          token
        }
      }`,
      { username, password }
    );

    setUser({
      id: data.login.id,
      username: data.login.username,
      role: data.login.role,
    });
    setToken(data.login.token);
    window.localStorage.setItem('tms_token', data.login.token);
  };

  const logout = () => {
    setUser(null);
    setToken('');
    window.localStorage.removeItem('tms_token');
  };

  return { user, token, loginAs, logout };
}

