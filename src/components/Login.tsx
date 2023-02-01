import React from "react";
import { REDIRECT_URI, REST_API_KEY } from "../utils/auth";

const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=friends,talk_message`;
function Login() {
  const handleLogin = () => {
    window.location.href = KAKAO_URL;
  };

  return (
    <div>
      <button onClick={handleLogin}>카카오톡 로그인</button>
    </div>
  );
}

export default Login;
