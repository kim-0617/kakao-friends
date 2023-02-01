import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "src/stores/hooks";
import { selectUser } from "../stores/reducers";

declare global {
  interface Window {
    Kakao: any;
  }
}

window.Kakao = window.Kakao || {};

function Home() {
  const { token } = useAppSelector(selectUser);

  const getProfile = () => {
    if (!token) return;
    fetch(`https://kapi.kakao.com/v1/api/talk/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const getFriends = () => {
    if (!token) return;
    fetch(`https://kapi.kakao.com/v1/api/talk/friends?limit=3`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const getMe = () => {
    window.Kakao.API.request({
      url: "/v2/api/talk/memo/default/send",
      data: {
        template_object: {
          object_type: "feed",
          content: {
            title: "딸기 치즈 케익",
            description: "#케익 #딸기 #삼평동 #카페 #분위기 #소개팅",
            image_url:
              "https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
            link: {
              web_url: "https://developers.kakao.com",
              mobile_web_url: "https://developers.kakao.com",
            },
          },
          item_content: {
            profile_text: "Kakao",
            profile_image_url:
              "https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
            title_image_url:
              "https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
            title_image_text: "Cheese cake",
            title_image_category: "Cake",
            items: [
              {
                item: "Cake1",
                item_op: "1000원",
              },
              {
                item: "Cake2",
                item_op: "2000원",
              },
              {
                item: "Cake3",
                item_op: "3000원",
              },
              {
                item: "Cake4",
                item_op: "4000원",
              },
              {
                item: "Cake5",
                item_op: "5000원",
              },
            ],
            sum: "Total",
            sum_op: "15000원",
          },
          social: {
            like_count: 100,
            comment_count: 200,
          },
          buttons: [
            {
              title: "웹으로 보기",
              link: {
                mobile_web_url: "https://developers.kakao.com",
                web_url: "https://developers.kakao.com",
              },
            },
            {
              title: "앱으로 보기",
              link: {
                mobile_web_url: "https://developers.kakao.com",
                web_url: "https://developers.kakao.com",
              },
            },
          ],
        },
      },
    })
      .then(function (response: any) {
        console.log(response);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  return (
    <div>
      <Link to="/login">login</Link>
      <div>
        <button onClick={getProfile}>profile</button>
      </div>
      <div>
        <button onClick={getFriends}>friends</button>
      </div>
      <div>
        <button onClick={getMe}>me</button>
      </div>
    </div>
  );
}

export default Home;
