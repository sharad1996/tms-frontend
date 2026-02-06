import { useEffect, useState } from 'react';
import { gqlRequest } from '../lib/graphql.js';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => window.localStorage.getItem('tms_token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    gqlRequest(
      `query Me {
        me { 
          id 
          username 
          role 
          permissions {
            addShipment
            updateShipment
            deleteShipment
            viewAllShipments
            viewDetailedReports
            manageUsers
            flagShipment
          }
        }
      }`,
      {},
      token
    )
      .then((data) => {
        setUser(data.me);
        setLoading(false);
      })
      .catch(() => {
        setToken('');
        setUser(null);
        window.localStorage.removeItem('tms_token');
        setLoading(false);
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
          permissions {
            addShipment
            updateShipment
            deleteShipment
            viewAllShipments
            viewDetailedReports
            manageUsers
            flagShipment
          }
        }
      }`,
      { username, password }
    );

    setUser({
      id: data.login.id,
      username: data.login.username,
      role: data.login.role,
      permissions: data.login.permissions,
    });
    setToken(data.login.token);
    window.localStorage.setItem('tms_token', data.login.token);
  };

  const logout = () => {
    setUser(null);
    setToken('');
    window.localStorage.removeItem('tms_token');
  };

  return { user, token, loginAs, logout, loading };
}

