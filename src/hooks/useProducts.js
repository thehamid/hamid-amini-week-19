import { useState, useEffect } from 'react';
import { api } from "../api";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // در ابتدا لودینگ فعال است


 const fetchData = async () => {
      try {
        setLoading(true); // شروع لودینگ
        const res = await api.get("/products");
        setProducts(res.data.data);
        toast.success("داده‌ها با موفقیت دریافت شدند");
      } catch (err) {
        console.error(err);
        toast.error("خطا در دریافت داده‌ها");
      } finally {
        setLoading(false); // پایان لودینگ (چه در موفقیت و چه در خطا)
      }
    };


  const addProduct = async (newProduct) => {
    try {
      setLoading(true);
      // ارسال درخواست POST به سرور برای افزودن محصول
      const res = await api.post("/products", newProduct);
      // افزودن محصول جدید به state برای نمایش فوری در UI
      setProducts((prevProducts) => [res.data.data, ...prevProducts]);
      toast.success("محصول با موفقیت اضافه شد");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("خطا در افزودن محصول");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      setLoading(true);
      // ارسال درخواست PUT به سرور برای ویرایش محصول
      const res = await api.put(`/products/${id}`, updatedProduct);
      // به‌روزرسانی محصول در state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? res.data.data : product
        )
      );
      toast.success("محصول با موفقیت ویرایش شد");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("خطا در ویرایش محصول");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      // ارسال درخواست DELETE به سرور برای حذف محصول
      await api.delete(`/products/${id}`);
      // حذف محصول از state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      toast.success("محصول با موفقیت حذف شد");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("خطا در حذف محصول");
    } finally {
      setLoading(false);
    }
  };

  // این افکت فقط یک بار در اولین رندر اجرا می‌شود
  useEffect(() => {
       fetchData();
  }, []); // آرایه وابستگی خالی یعنی فقط یک بار اجرا شود


  // state لودینگ را هم return کن تا در کامپوننت قابل استفاده باشد
  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};