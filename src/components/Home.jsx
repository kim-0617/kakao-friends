import React, { useEffect } from "react";
import queryString from "query-string";

function Home() {
  const parsed = queryString.parse(window.location.search);
  useEffect(() => {
    if (!parsed.code) return;

    window.Kakao.Auth.setAccessToken(parsed.code);

    window.Kakao.API.request({
      url: "/v1/api/talk/profile",
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [parsed.code]);

  function loginWithKakao() {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000",
    });
  }

  return (
    <div>
      <div onClick={loginWithKakao}>
        <img
          src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
          width="222"
          alt="카카오 로그인 버튼"
        />
      </div>
      <p id="token-result">123</p>
    </div>
  );
}

export default Home;
