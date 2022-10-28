import {
  redirect,
  useSearchParams,
} from "react-router-dom";

export const LoginRedirect = (props) => {
  let [searchParams,] = useSearchParams();
  let accessToken = searchParams.get("accessToken");
  props.setAccessToken(accessToken);
  redirect("/");
};