import axios from 'axios';

// ─── Storage helpers ───────────────────────────────────────────────
export const saveAuth = (data) => {
  // data = { accessToken, id, username, roles: ["ADMIN"] }
  sessionStorage.setItem('token', data.accessToken);
  sessionStorage.setItem('user', JSON.stringify({
    id: data.id,
    username: data.username,
    roles: data.roles   // array of strings e.g. ["ADMIN"]
  }));
};

export const getToken = () => sessionStorage.getItem('token');

export const getUser = () => {
  const u = sessionStorage.getItem('user');
  return u ? JSON.parse(u) : null;
};

export const isLoggedIn = () => !!getToken();

export const hasRole = (role) => {
  const user = getUser();
  return user?.roles?.includes(role) ?? false;
};

export const logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
};

// ─── Axios interceptor: attach Bearer token to every request ───────
axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redirect to login on 401
axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
