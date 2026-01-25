import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, Auth, User } from "firebase/auth";

export const authenticateWithEmail = async (
  auth: Auth,
  email: string,
  password: string,
  isSignUp: boolean,
  confirmPassword?: string
) => {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  // Validation
  if (!trimmedEmail || !trimmedPassword) {
    throw new Error("Please fill email and password");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    throw new Error("Please enter a valid email address");
  }

  if (isSignUp && trimmedPassword !== (confirmPassword?.trim() || "")) {
    throw new Error("Passwords do not match");
  }

  if (trimmedPassword.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  try {
    if (isSignUp) {
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      return userCredential.user;
    } else {
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      return userCredential.user;
    }
  } catch (error: unknown) {
    const err = error as { code?: string; message: string };
    throw err;
  }
};

export const authenticateWithGoogle = async (auth: Auth): Promise<User> => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'consent'
    });
    const { user } = await signInWithPopup(auth, provider);
    return user;
  } catch (error) {
    const err = error as { code?: string; message: string };
    console.error("Google Auth Error:", {
      code: err.code,
      message: err.message,
    });
    throw err;
  }
};


export const handleFirebaseError = (errorCode?: string, errorMessage?: string): string => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Email already in use. Please try signing in or use a different email.";
    case "auth/user-not-found":
      return "User not found. Please create an account first.";
    case "auth/wrong-password":
      return "Incorrect password. Please check and try again.";
    case "auth/invalid-credential":
      return "Invalid email or password. Please verify both and try again.";
    case "auth/invalid-email":
      return "Invalid email address format. Please use a valid email.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 6 characters.";
    case "auth/operation-not-allowed":
      return "Email/Password sign-in is not enabled in Firebase Console.";
    case "auth/too-many-requests":
      return "Too many login attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    default:
      return errorMessage || "Authentication failed. Please try again.";
  }
};

/**
 * Validate email/password form fields
 */
export const validateAuthForm = (
  email: string,
  password: string,
  confirmPassword: string,
  isSignUp: boolean,
  gender: string,
  dob: string
): { valid: boolean; error?: string } => {
  if (!email || !password) {
    return { valid: false, error: "Please fill email and password" };
  }

  if (isSignUp && (!gender || !dob)) {
    return { valid: false, error: "Please fill all fields" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  if (isSignUp && password !== confirmPassword) {
    return { valid: false, error: "Passwords do not match" };
  }

  if (password.length < 6) {
    return { valid: false, error: "Password must be at least 6 characters" };
  }

  return { valid: true };
};
