import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
   headers: {
    'Content-Type': 'application/json',
  },
});


// 2. افزودن یک request interceptor
api.interceptors.request.use(
  (config) => {
    // این تابع قبل از ارسال هر درخواست اجرا می‌شود
    const token = Cookies.get('token'); // توکن را از کوکی می‌خوانیم

    if (token) {
      // اگر توکن وجود داشت، آن را به هدر درخواست اضافه می‌کنیم
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // حتماً باید config را برگردانید
  },
  (error) => {
    // اگر در تنظیمات درخواست خطایی رخ داد، آن را برگردانید
    return Promise.reject(error);
  }
);

// 3. افزودن یک response interceptor (اختیاری اما بسیار مفید)
api.interceptors.response.use(
  (response) => {
    // این تابع بعد از دریافت هر پاسخ موفق اجرا می‌شود
    return response;
  },
  (error) => {
    // این تابع بعد از دریافت هر پاسخ خطا (مثلاً 401 Unauthorized) اجرا می‌شود
    if (error.response?.status === 401) {
      // اگر توکن منقضی شده یا نامعتبر بود، کاربر را به صفحه لاگین هدایت کن
      Cookies.remove('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

