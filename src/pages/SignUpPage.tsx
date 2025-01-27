import Button from "../components/ui/Button";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../redux/authSlice.ts";
import {
  loginUser,
  loginUserWithGoogle,
  signUpUser,
} from "../redux/authActions.ts";
import { AppDispatch, RootState } from "../redux/store.ts";
import ErrorMessage from "../components/ui/ErrorMessage.tsx";
import InputField from "../components/ui/InputField";
import GoogleButton from "../components/ui/GoogleButton";

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
      await dispatch(loginUser({ email, password })).unwrap();
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
        className="flex flex-col bg-white py-10 px-14 rounded w-80"
        noValidate
      >
        <img className="h-14 m-auto" src={logo} alt="WellPulse logo" />
        <h2 className="text-xl text-center py-4">Sign Up to WellPulse</h2>
        <p className="m-auto text-dark-grey max-w-56">
          Sign Up to start your wellness habits routine.
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
          Sign Up
        </Button>
        <GoogleButton onClick={handleGoogleSignIn} />
        <Link className="my-4 text-sky-600 underline" to="/login">
          Already have an account?
        </Link>

        {error && <ErrorMessage text={error} />}
      </form>
    </div>
  );
};

export default SignUpPage;
