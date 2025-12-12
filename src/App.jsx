import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProductListPage from "./pages/ProductListPage";
import PrivateRoute from "./components/PrivateRoute";
import ProductDetailPage from "./pages/ProductDetailPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <ProductListPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
