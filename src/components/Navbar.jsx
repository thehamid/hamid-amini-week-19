import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="w-full bg-gray-200">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="logo not-last-of-type:">
          <img src={logo} alt="botoshop" width={50} />
        </div>
        {isAuthenticated ? (
          <div className="flex gap-4">
            <Link
              to={`/`}
              className="text-gray-600 hover:text-primary color-transition"
            >
              خانه
            </Link>
            <Link
              to={`/dashboard`}
              className="text-gray-600 hover:text-primary color-transition"
            >
              داشبورد
            </Link>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-primary color-transition"
            >
              خروج
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to={`/login`}
              className="text-gray-600 hover:text-primary color-transition"
            >
              ورود
            </Link>
            <Link
              to={`/register`}
              className="text-gray-600 hover:text-primary color-transition"
            >
              ثبت نام
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
