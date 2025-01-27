import Button from "../components/ui/Button";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router";
import { FormEvent, useEffect, useState } from "react";
import { loginUser, loginUserWithGoogle } from "../redux/authActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setError } from "../redux/authSlice";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useTypedSelector } from "./Calendar";
import InputField from "../components/ui/InputField";
import GoogleButton from "../components/ui/GoogleButton";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const isLoggedIn = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const { error } = useTypedSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      const redirectTo = location.state?.from?.pathname || "/calendar";
      navigate(redirectTo, { replace: true });
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
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
        onSubmit={handleLogin}
        className="flex flex-col bg-white py-10 px-14 rounded w-80"
        noValidate
      >
        <img className="h-14 m-auto" src={logo} alt="WellPulse logo" />
        <h2 className="text-xl text-center py-4">Login to WellPulse</h2>
        <p className="m-auto text-dark-grey max-w-56">
          Login to your account to see your wellness habits routine.
        </p>
        <div className="flex flex-col gap-5 py-10">
        <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          isDisabled={error ? true : false}
          type="primary"
          textSize="text-md"
          size="sm"
        >
          Login
        </Button>
        <GoogleButton onClick={handleGoogleSignIn} />
        {error && <ErrorMessage text={error} />}
        <Link className="my-4 text-sky-600 underline" to="/signup">
          Don't have an account?
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
