import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from '../schemas/productSchemas';
import Input from './ui/Input';
import Button from './ui/Button';

const ProductModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: initialData || { name: '', price: '', quantity: '' },
  });

  // وقتی initialData تغییر می‌کند (برای ویرایش)، فرم را ریست می‌کنیم
  useEffect(() => {
    reset(initialData || { name: '', price: '', quantity: '' });
  }, [initialData, reset]);

  if (!isOpen) return null;

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 text-center">
            {initialData ? 'ویرایش محصول' : 'افزودن محصول جدید'}
          </h3>
          <form onSubmit={handleSubmit(onFormSubmit)} className="mt-4">
            <Input
              label="نام کالا"
              name="name"
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              label="قیمت"
              name="price"
              type="number"
              {...register('price')}
              error={errors.price?.message}
            />
            <Input
              label="موجودی"
              name="quantity"
              type="number"
              {...register('quantity')}
              error={errors.quantity?.message}
            />
            <div className="flex justify-between gap-4 mt-6">
              <Button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                انصراف
              </Button>
              <Button type="submit" isLoading={isLoading}>
                {initialData ? 'ثبت تغییرات' : 'افزودن'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;