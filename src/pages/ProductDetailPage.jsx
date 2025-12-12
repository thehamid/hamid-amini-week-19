import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import Button from '../components/ui/Button';

const ProductDetailPage = () => {
  const { id } = useParams(); // گرفتن id از URL
  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) return <div className="text-center mt-10">در حال بارگذاری محصول...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">محصولی یافت نشد.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/">
                <Button className=" text-gray-500 hover:text-primary cursor-pointer p-4">بازگشت</Button>
          </Link>
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img src={`https://picsum.photos/seed/${product.id}/500/500.jpg`} alt={product.name} className="w-full rounded-lg object-cover" />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">توضیحات کامل و جذاب در مورد این محصول. اینجا می‌توانید ویژگی‌ها، مشخصات فنی و جزئیات دیگر را بنویسید.</p>
            <div className="mb-6">
              <span className="text-xl font-semibold text-gray-800">موجودی: </span>
              <span className="text-xl text-green-600">{product.quantity} عدد</span>
            </div>
            <div className="mb-6">
              <span className="text-2xl font-semibold text-gray-800">قیمت: </span>
              <span className="text-2xl font-extrabold text-purple-600">{product.price} تومان</span>
            </div>
            <div className="flex gap-4">
              <Button >افزودن به سبد خرید</Button>
            
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;