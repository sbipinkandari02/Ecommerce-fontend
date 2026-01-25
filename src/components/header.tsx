import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { resetCart } from "../redux/reducer/cartReducer";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("/");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const cartItemsCount = useSelector(
    (state: RootState) => state.cartReducer.cartItems.length
  );

  // Update active link based on current location
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");

      // Clear cart on logout
      dispatch(resetCart());

      setIsOpen(false);
      navigate("/login");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "HOME", path: "/" },
    { label: "SEARCH", path: "/search" },
  ];

  return (
    <nav className={`header ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Navigation Links with Active Indicator */}
      <div className="nav-links-wrapper">
        {navItems.map((item) => (
          <div key={item.path} className="nav-link-container">
            <Link
              onClick={() => setIsOpen(false)}
              to={item.path}
              className={`nav-link ${activeLink === item.path ? "active" : ""}`}
            >
              {item.label}
            </Link>
            {activeLink === item.path && (
              <motion.div
                className="active-indicator"
                layoutId="active-indicator"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 40 }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="header-actions">
        {/* Search Icon */}
        <Link
          onClick={() => setIsOpen(false)}
          to="/search"
          className="header-icon"
        >
          <FaSearch />
        </Link>

        {/* Cart Icon with Badge */}
        <Link
          onClick={() => setIsOpen(false)}
          to="/cart"
          className="cart-icon-wrapper header-icon"
        >
          <FaShoppingBag />
          {cartItemsCount > 0 && (
            <span className="cart-badge">{cartItemsCount}</span>
          )}
        </Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          title={isDarkMode ? "Light Mode" : "Dark Mode"}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* User Dropdown */}
        {user?._id ? (
          <div className="user-dropdown-wrapper" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="user-button header-icon"
              style={{ marginTop: 3 }}
            >
              <FaUser />
            </button>

            {isOpen && (
              <motion.div
                className="user-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {user.role === "admin" && (
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/admin/dashboard"
                    className="dropdown-item"
                  >
                    <FaUser /> Admin
                  </Link>
                )}

                <Link
                  onClick={() => setIsOpen(false)}
                  to="/orders"
                  className="dropdown-item"
                >
                  <FaShoppingBag /> Orders
                </Link>

                <button
                  onClick={logoutHandler}
                  className="dropdown-item logout-button"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <Link to="/login" className="header-icon">
            <FaSignInAlt />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
