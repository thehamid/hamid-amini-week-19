import React, { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductModal from '../components/ProductModal';
import DeleteModal from '../components/DeleteModal';
import Button from '../components/ui/Button';
import { LucideSearch  } from 'lucide-react';
import { LucideCombine } from 'lucide-react';
import { LucidePenBox } from 'lucide-react';
import { LucideTrash } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductListPage = () => {
  const { products, addProduct, updateProduct, deleteProduct,loading } = useProducts();




    const { user, logout } = useAuth();
  const navigate = useNavigate();

  // State برای مدیریت مودال‌ها و محصول در حال ویرایش/حذف
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // State برای جستجو و صفحه‌بندی
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleLogout = () => {
    logout();
    navigate('/login'); // هدایت به صفحه لاگین بعد از خروج
  };

  // فیلتر کردن محصولات بر اساس عبارت جستجو
const filteredProducts = useMemo(() => {
  // این بررسی را اضافه کنید
  if (!Array.isArray(products)) {
    return [];
  }

  return products.filter((product) => {
    // 1. ابتدا چک کن که product وجود داشته باشد (null یا undefined نباشد)
    // 2. سپس چک کن که خاصیت 'name' از نوع رشته باشد
    return product && typeof product.name === 'string' && product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
}, [products, searchTerm]);

  // منطق صفحه‌بندی
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleOpenDeleteModal = (product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleProductSubmit = (data) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
    } else {
      addProduct(data);
    }
    setIsProductModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    deleteProduct(deletingProduct.id);
    setIsDeleteModalOpen(false);
  };

  
  if (loading) {
  return <div>در حال بارگذاری محصولات...</div>;
}



  return (
    <div className="min-h-screen bg-gray-50">

    <header className="bg-white border rounded-2xl max-w-7xl mx-auto my-4">
    <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex gap-3 items-center">
            <LucideSearch />
            <input
                type="text"
                placeholder="جستجوی کالا..."
                className="w-full md:w-96 px-4 py-2 rounded-lg focus:outline-none"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
            />
        </div>

        <div className="relative group">

            <div className="flex items-center space-x-5 cursor-pointer">
                <img
                    className="h-12 w-12 rounded-full"
                    src={user.avatar}
                    alt="User Avatar"
                />
                <div className="flex flex-col justify-start items-start">
                    <span className="text-gray-700 text-lg">{user.name}</span>
                    <span className="text-gray-700 text-sm">{user.role}</span>
                </div>
            </div>

            <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg py-2 w-32 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                    onClick={handleLogout}
                    className="w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                    خروج
                </button>
            </div>
        </div>
    </div>
</header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 items-center flex-1">
            <LucideCombine />
          <h1 className="text-2xl font-light text-gray-900">مدیریت کالا</h1>
          </div>
        <div className='max-w-48'>
           <Button  onClick={handleOpenAddModal}>افزودن محصول</Button>
        </div>
         
        </div>

        {/* جدول محصولات */}
        <div className="bg-white overflow-hidden sm:rounded-2xl border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 sm:px-6 lg:px-8 py-5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام کالا</th>
                <th className="px-4 sm:px-6 lg:px-8 py-5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">قیمت</th>
                <th className="px-4 sm:px-6 lg:px-8py-5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">موجودی</th>
                <th className="px-4 sm:px-6 lg:px-8 py-5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 sm:px-6 lg:px-8 py-5 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-4 sm:px-6 lg:px-8 py-5 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                    <td className="px-4 sm:px-6 lg:px-8 py-5 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                    <td className="px-4 sm:px-6 lg:px-8 py-5 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleOpenEditModal(product)}
                        className="text-green-600 hover:text-green-900 ml-3 cursor-pointer"
                      >
                        <LucidePenBox/>
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(product)}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                      >
                       <LucideTrash/>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 sm:px-6 lg:px-8 py-5 text-center text-gray-500">
                    محصولی یافت نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* صفحه‌بندی */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-6">
         
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3.5 py-1.5 rounded-full cursor-pointer ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
         
          </div>
        )}
      </main>

      {/* مودال‌ها */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSubmit={handleProductSubmit}
        initialData={editingProduct}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        productName={deletingProduct?.name}
      />
    </div>
  );
};

export default ProductListPage;