import { useDispatch } from "react-redux";
import { useJwt } from "react-jwt";
import { useEffect } from "react";
import { signOut } from "../feature/user/userSlice";
import { useNavigate } from "react-router-dom";

const useTokenValidation = (accessToken) => {
  const navigate = useNavigate();
  let timerId = null;
  const dispatch = useDispatch();
  const { decodedToken, isExpired } = useJwt(accessToken);

  useEffect(() => {
    if (!accessToken || !decodedToken) {
      return;
    }

    const onExpire = () => {
      dispatch(signOut());
      localStorage.removeItem("user");
      navigate("/session-expired");
    };

    // if (isExpired) {
    //   onExpire();
    // }


    if (decodedToken?.exp && decodedToken?.iat && !isExpired) {
      const timeOut = decodedToken.exp - decodedToken.iat;

   

      const timerId = setTimeout(() => {
        onExpire();
      }, timeOut * 1000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [accessToken, decodedToken, isExpired]);
};

export default useTokenValidation;
