import { useEffect } from "react";
import {
  Navigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../../container/AuthProvider";

export const LoginRedirect = (props) => {
  const { login } = useAuth();
  let [searchParams,] = useSearchParams();
  
  useEffect(() => {
    let newAccessToken = searchParams.get("accessToken");
    login(newAccessToken);
  }, [login, searchParams]);
  
  return <Navigate to="/" replace/>
};

export const LogoutRedirect = (props) => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);
  
  return <Navigate to="/login" replace/>
};