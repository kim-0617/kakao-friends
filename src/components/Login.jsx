import React, { useEffect } from "react";
const REST_API_KEY = "55776acba1e11f533bb29c5caa440f49";
const REDIRECT_URI = "http://localhost:3000";

function Login() {
  const KAKAO_CODE = window.location.search.split("=")[1];

  const getKakaoToken = () => {
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "aplication/w-www-form-urlencoded" },
      body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          window.localStorage.setItem("token", data.access_token);
        } else {
          console.log("error ?");
        }
      });
  };

  useEffect(() => {
    if (!window.location.search) return;
    getKakaoToken();
  }, []);
  return <div>login</div>;
}

export default Login;
