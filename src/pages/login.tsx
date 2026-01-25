import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaMoon, FaSun } from "react-icons/fa6";
import { auth } from "../firebase";
import { getUser, useLoginMutation } from "../redux/api/userAPI";
import toast from "react-hot-toast";
import { MessageResponse } from "../types/api-types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { 
  authenticateWithEmail, 
  authenticateWithGoogle, 
  handleFirebaseError,
  validateAuthForm 
} from "../utils/authHelpers";

const Login = () => {
  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useTheme();
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [login] = useLoginMutation();
  
  // Email/Password state
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginHandler = async () => {
    try {
      const user = await authenticateWithGoogle(auth);
      
      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender: "",
        role: "user",
        dob: "",
        _id: user.uid,
      });

      if ("data" in res) {
        const message = res.data?.message;
        toast.success(message || "Login successful");
        const data = await getUser(user.uid);
        dispatch(userExist(data.user!));
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        dispatch(userNotExist());
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Sign In Fail");
    }
  };

  const handleEmailAuth = async () => {
    // Validate form
    const validation = validateAuthForm(email, password, confirmPassword, isSignUp, gender, date);
    if (!validation.valid) {
      toast.error(validation.error!);
      return;
    }

    setLoading(true);
    try {
      const user = await authenticateWithEmail(auth, email, password, isSignUp, confirmPassword);

      const res = await login({
        name: user.email!.split("@")[0],
        email: user.email!,
        photo: "https://via.placeholder.com/150",
        gender: isSignUp ? gender : "",
        role: "user",
        dob: isSignUp ? date : "",
        _id: user.uid,
      });

      if ("data" in res) {
        const message = res.data?.message;
        toast.success(message || `${isSignUp ? "Sign up" : "Login"} successful`);
        const data = await getUser(user.uid);
        dispatch(userExist(data.user!));
        // Reset form
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setGender("");
        setDate("");
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        dispatch(userNotExist());
      }
    } catch (error: unknown) {
      const err = error as { code?: string; message: string };
      
      if (err.message && !err.code) {
        // Validation error
        toast.error(err.message);
      } else {
        // Firebase error
        const errorMessage = handleFirebaseError(err.code, err.message);
        toast.error(errorMessage);
        console.error("Firebase Auth Error:", {
          code: err.code,
          message: err.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <button 
        className="login-theme-toggle"
        onClick={toggleTheme}
        title={isDarkMode ? "Light Mode" : "Dark Mode"}
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>
      <main>
        {!isSignUp ? (
          // Sign In View
          <div className="login-container signin-view">
            <h1 className="heading">Welcome Back</h1>
            <p className="subheading">Sign in to your account</p>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button 
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button 
              className="auth-btn email-btn" 
              onClick={handleEmailAuth}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In with Email"}
            </button>

            <div className="divider">
              <span>Or</span>
            </div>

            <button className="auth-btn google-btn" onClick={loginHandler} disabled={loading}>
              <FcGoogle /> <span>Continue with Google</span>
            </button>

            <p className="toggle-auth">
              Don't have an account? 
              <button 
                className="toggle-link"
                onClick={() => {
                  setIsSignUp(true);
                  setPassword("");
                  setConfirmPassword("");
                }}
              >
                Sign Up
              </button>
            </p>
          </div>
        ) : (
          // Sign Up View - 2 Part Layout
          <div className="login-container signup-view">
            <h1 className="heading">Create Account</h1>
            <p className="subheading">Join us in a few simple steps</p>

            <div className="signup-form-wrapper">
              <div className="signup-part part-1">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <div className="password-field">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                    <button 
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <div className="password-field">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                    />
                    <button 
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="signup-part part-2">             
                <div className="form-group">
                  <label>Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} disabled={loading}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <button 
              className="auth-btn email-btn" 
              onClick={handleEmailAuth}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            <div className="divider">
              <span>Or</span>
            </div>

            <button className="auth-btn google-btn" onClick={loginHandler} disabled={loading}>
              <FcGoogle /> <span>Sign Up with Google</span>
            </button>

            <p className="toggle-auth">
              Already have an account? 
              <button 
                className="toggle-link"
                onClick={() => {
                  setIsSignUp(false);
                  setPassword("");
                  setConfirmPassword("");
                }}
              >
                Sign In
              </button>
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Login;
