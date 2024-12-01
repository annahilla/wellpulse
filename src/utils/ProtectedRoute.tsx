import { Navigate, Outlet, useLocation } from "react-router";

interface ProtectedRouteProps {
  canActivate: boolean;
  redirectPath: string;
}

const ProtectedRoute = ({ canActivate, redirectPath }: ProtectedRouteProps) => {
  const location = useLocation();

  if (!canActivate) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
