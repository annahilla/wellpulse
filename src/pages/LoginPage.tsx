import Button from "../components/ui/Button";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FormEvent, useEffect, useState } from "react";
import { loginUser, loginUserWithGoogle } from "../redux/authActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setError } from "../redux/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Error during sign up:", err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await dispatch(loginUserWithGoogle()).unwrap();
      navigate("/");
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
        className="flex flex-col bg-white py-10 px-14 rounded"
      >
        <img className="h-14 m-auto" src={logo} alt="WellPulse logo" />
        <h2 className="text-xl text-center py-4">Login to WellPulse</h2>
        <p className="m-auto text-dark-grey max-w-56">
          Login to your account to see your wellness habits routine.
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
        <Button type="primary" textSize="text-md" buttonSize="sm">
          Login
        </Button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex items-center justify-start gap-2 my-4 border border-light-grey px-3 py-2 shadow-sm rounded"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>
        <Link className="my-4 text-sky-600 underline" to="/signup">
          Don't have an account?
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
