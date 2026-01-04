import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { resetCart } from "../redux/reducer/cartReducer";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = useSelector(
    (state: RootState) => state.cartReducer.cartItems.length
  );

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

  return (
    <nav className="header">
      <Link onClick={() => setIsOpen(false)} to="/">
        HOME
      </Link>

      <Link onClick={() => setIsOpen(false)} to="/search">
        <FaSearch />
      </Link>

      {/* 🛒 Cart Icon with Badge */}
      <Link
        onClick={() => setIsOpen(false)}
        to="/cart"
        className="cart-icon-wrapper"
      >
        <FaShoppingBag />
        {cartItemsCount > 0 && (
          <span className="cart-badge">{cartItemsCount}</span>
        )}
      </Link>

      {user?._id ? (
        <div className="user-dropdown-wrapper" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="user-button"
            style={{marginTop: 3}}
          >
            <FaUser />
          </button>

          {isOpen && (
            <div className="user-dropdown">
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
            </div>
          )}
        </div>
      ) : (
        <Link to="/login">
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
