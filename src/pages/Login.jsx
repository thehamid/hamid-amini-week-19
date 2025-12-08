import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link,useNavigate } from 'react-router-dom';
import { loginSchema } from '../schemas/authSchemas';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import logo from '@/assets/logo.png'
import { api } from "../api";
import toast from "react-hot-toast";
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {

    const API_URL = `/auth/login`;
    let navigate = useNavigate();
const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
      try {
       const res = await api.post(API_URL, data);
       login(res.data.token);
       toast.success(`خوش آمدید`);
       navigate("/products");
     } catch (err) {
       console.error("خطا در ورود:", err);
       toast.error("مشکلی در هنگام ورود وجود دارد.");
     }
 
   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
         <img src={logo} alt="botoshop" width={50} className='mx-auto block my-3' />
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800"> فرم ورود </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="نام کاربری"
            name="username"
            {...register('username')}
            error={errors.username?.message}
          />
          <Input
            label="رمز عبور"
            name="password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <Button type="submit" isLoading={isSubmitting}>
            ورود
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          حساب کاربری ندارید؟{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;