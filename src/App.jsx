import {Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProductListPage from './pages/ProductListPage';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from "react-hot-toast";
import "./App.css";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
          <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductListPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster  position="top-center" />
    </>
  );
}

export default App;
