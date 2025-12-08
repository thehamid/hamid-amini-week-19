import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';


// 1. ایجاد Context
const AuthContext = createContext(null);

// 2. ایجاد Provider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get('token') || null);
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const savedToken = Cookies.get('token');
    if (savedToken) {
      setToken(savedToken);
      setUser({ name: 'میلاد عظمی',role:'مدیر', avatar: 'https://i.pravatar.cc/40' });
    }
    setIsLoading(false);
  }, []);



  // تابع ورود
  const login = (authToken) => {
    Cookies.set('token', authToken, { expires: 7 }); 
    setToken(authToken);
    setUser({ name: 'میلاد عظمی',role:'مدیر', avatar: 'https://i.pravatar.cc/40' });
  };

  // تابع خروج
  const logout = () => {
    Cookies.remove('token');
    setToken(null);
    setUser(null);
  };

  // مقدار isAuthenticated برای سادگی در استفاده
  const isAuthenticated = !!token;

  // 3. ارائه مقدار Context به کامپوننت‌های فرزند
  const value = {
    token,
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>;
};

// 4. یک هوک سفارشی برای دسترسی آسان به Context
export const useAuth = () => {
  return useContext(AuthContext);
};