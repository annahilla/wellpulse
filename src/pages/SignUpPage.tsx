import Button from "../components/ui/Button";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router";
import { FormEvent, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../redux/authSlice.ts";
import { loginUserWithGoogle, signUpUser } from "../redux/authActions.ts";
import { AppDispatch, RootState } from "../redux/store.ts";
import { IoIosAlert } from "react-icons/io";

const SignUpPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.user.error);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const isLoggedIn = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  useEffect(() => {
    if (isLoggedIn) {
      const redirectTo = location.state?.from?.pathname || "/calendar";
      navigate(redirectTo, { replace: true });
    }
  }, [isLoggedIn]);

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(signUpUser({ email, password })).unwrap();
      navigate("/calendar");
    } catch (err) {
      console.error("Error during sign up:", err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await dispatch(loginUserWithGoogle()).unwrap();
    } catch (err) {
      console.error("Error during Google sign-in:", err);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setError(""));
    };
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center bg-neutral-100 h-screen text-center">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col bg-white py-10 px-14 rounded"
      >
        <img className="h-14 m-auto" src={logo} alt="WellPulse logo" />
        <h2 className="text-xl text-center py-4">Sign Up to WellPulse</h2>
        <p className="m-auto text-dark-grey max-w-56">
          Sign Up to start your wellness habits routine.
        </p>
        <div className="flex flex-col gap-5 py-10">
          <input
            className="border p-3 rounded focus:outline-none focus:border-2 focus:border-sky-500"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="border p-3 rounded focus:outline-none focus:border-2 focus:border-sky-500"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <Button type="primary" textSize="text-md" size="sm">
          Sign Up
        </Button>
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="flex items-center justify-start gap-2 my-4 border border-light-grey px-3 py-2 shadow-sm rounded"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>
        <Link className="my-4 text-sky-600 underline" to="/login">
          Already have an account?
        </Link>

        {error && (
          <p
            role="alert"
            className="flex items-center justify-center gap-2 text-sm text-red-500 p-3 pb-8"
          >
            <IoIosAlert />
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default SignUpPage;
