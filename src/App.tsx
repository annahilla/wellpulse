import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/Home";
import CalendarPage from "./pages/Calendar";
import MapPage from "./pages/Map";
import ProgressPage from "./pages/Progress";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import useAuthListener from "./hooks/useAuthListener";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  useAuthListener();
  const isLoggedIn = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route
            element={
              <ProtectedRoute canActivate={isLoggedIn} redirectPath="/login" />
            }
          >
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
