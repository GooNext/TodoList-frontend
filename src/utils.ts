import jwt from 'jsonwebtoken';
/* eslint-disable no-restricted-syntax */
export const logout = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  // eslint-disable-next-line no-restricted-globals
  location.reload();
};

export const getAccessToken = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    const decoded = jwt.decode(token);
    const currentTime = Date.now() / 1000;
    if (+decoded.exp < currentTime) {
      logout();
      return null;
    }
    return token;
  }
  return null;
};
