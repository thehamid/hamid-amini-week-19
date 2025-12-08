import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link,useNavigate  } from 'react-router-dom';
import { registerSchema } from '../schemas/authSchemas';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import logo from '@/assets/logo.png'
import { api } from "../api";
import toast from "react-hot-toast";

const RegisterPage = () => {

     const API_URL = `/auth/register`;
    let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
     try {
      const res = await api.post(API_URL, data);
      toast.success(`ثبت نام با موفقیت انجام شد.`);
      navigate("/login");
    } catch (err) {
      console.error("خطا در افزودن:", err);
      toast.error("خطا در ثبت نام.");
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <img src={logo} alt="botoshop" width={50} className='mx-auto block my-3' />
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800"> فرم  ثبت‌نام   </h2>
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
          <Input
            label="تکرار رمز عبور"
            name="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <Button type="submit" isLoading={isSubmitting}>
            ثبت‌نام
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          قبلاً ثبت‌نام کرده‌اید؟{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            وارد شوید
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;