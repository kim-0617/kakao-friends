import React, { useEffect } from "react";
import { REST_API_KEY, REDIRECT_URI } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/stores/hooks";
import userSlice from "src/stores/reducers/user";
import queryString from "query-string";

function KakaoLogin() {
  const params = queryString.parse(window.location.search);
  const kakao_code = params?.code;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getKakaoToken = () => {
    fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${kakao_code}`,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          dispatch(userSlice.actions.login({ token: data.access_token }));
          window.Kakao.Auth.setAccessToken(data.access_token);
          navigate("/");
        } else {
          navigate("/");
        }
      });
  };

  useEffect(() => {
    if (!window.location.search) return;
    getKakaoToken();
  }, []);

  return <div>KakaoLogin</div>;
}

export default KakaoLogin;
