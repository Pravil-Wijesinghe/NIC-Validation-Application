export const isAuthenticated = () => {
    const token = localStorage.getItem('authToken'); // or sessionStorage.getItem('authToken');
    return token !== null;
  };
  