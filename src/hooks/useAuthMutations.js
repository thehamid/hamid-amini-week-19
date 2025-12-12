import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import toast from 'react-hot-toast';

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (credentials) => api.post('/auth/login', credentials),
    onSuccess: (response) => {
      const { token, user } = response.data;
      login(token, user);
      toast.success('ورود با موفقیت انجام شد!');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'خطا در ورود');
    },
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userData) => api.post('/auth/register', userData),
    onSuccess: () => {
      toast.success('ثبت‌نام با موفقیت انجام شد!');
      navigate('/login');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'خطا در ثبت‌نام');
    },
  });
};