import React, { ErrorInfo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "src/stores/hooks";
import userSlice from "src/stores/reducers/user";
import { selectUser } from "../stores/reducers";

declare global {
  interface Window {
    Kakao: any;
  }
}
window.Kakao = window.Kakao || {};

interface Friend {
  allowed_msg?: boolean;
  favorite: boolean;
  id: number;
  profile_nickname: string;
  profile_thumbnail_image: string;
  uuid: string;
}

function Home() {
  const dispatch = useAppDispatch();
  const { token, uuid } = useAppSelector(selectUser);
  const router = useNavigate();

  useEffect(() => {
    console.log("(UE)token : ", token);
    console.log("(UE)uuid : ", uuid);
  }, [token, uuid]);

  const login = () => {
    router("/login");
  };

  const logout = () => {
    if (!token) {
      alert("login plz..");
      return;
    }
    fetch(`https://kapi.kakao.com/v1/user/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("로그아웃 성공" + JSON.stringify(data));
        dispatch(userSlice.actions.resetInfo({}));
      });
  };

  const getProfile = () => {
    if (!token) {
      alert("no token");
      return;
    }
    fetch(`https://kapi.kakao.com/v1/api/talk/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const getFriends = () => {
    if (!token) {
      alert("no token");
      return;
    }
    fetch(`https://kapi.kakao.com/v1/api/talk/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(
          "my all friends uuid : ",
          data.elements.map((friend: Friend) => friend.uuid)
        );
        // dispatch(
        //   userSlice.actions.getFriends({
        //     uuid: data.elements.map((friend: Friend) => friend.uuid),
        //   })
        // );
      });
  };

  const sendMessageToMe = () => {
    if (!token) {
      alert("no token");
      return;
    }

    window.Kakao.API.request({
      url: "/v2/api/talk/memo/default/send",
      data: {
        template_object: {
          object_type: "feed",
          content: {
            title: "딸기 치즈 케익123123123123123123123",
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
              title: "웹으로 보기123",
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
      .catch(function (error: Error) {
        console.log(error);
      });
  };

  const sendMessageToYou = () => {
    window.Kakao.API.request({
      url: "/v1/api/talk/friends/message/default/send",
      data: {
        receiver_uuids: [...uuid],
        template_object: {
          object_type: "feed",
          content: {
            title: "파인랩 알림톡",
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
      .catch(function (error: Error) {
        console.log(error);
      });
  };

  const useMessageTemplate = () => {
    window.Kakao.API.request({
      url: "/v2/api/talk/memo/send",
      data: {
        template_id: 17396,
        template_args: {
          titie: "김성현의 메세지",
          tfaName: "김성현",
          description: "17396 메세지 템플릿을 사용한 메시지 발송",
        },
      },
    })
      .then(function (response: any) {
        console.log(response);
      })
      .catch(function (error: Error) {
        console.log(error);
      });
  };

  const selectFriends = () => {
    window.Kakao.Picker.selectFriends({
      title: "친구 선택",
      maxPickableCount: 10,
      minPickableCount: 1,
    })
      .then(function (response: any) {
        console.log(response);
        dispatch(
          userSlice.actions.getFriends({
            uuid: response.users.map((friend: Friend) => friend.uuid),
          })
        );
      })
      .catch(function (error: Error) {
        console.log(error);
      });
  };

  return (
    <div className="wrap">
      <div>
        <button onClick={login}>Go login</button>
      </div>
      <div>
        <button onClick={getProfile}>profile</button>
      </div>
      <div>
        <button onClick={getFriends}>friends</button>
      </div>
      <div>
        <button onClick={sendMessageToMe}>me</button>
      </div>
      <div>
        <button onClick={sendMessageToYou}>you</button>
      </div>
      <div>
        <button onClick={useMessageTemplate}>template (me)</button>
      </div>
      <div>
        <button onClick={selectFriends}>select</button>
      </div>
      <div>
        <button onClick={logout}>Go logout</button>
      </div>
    </div>
  );
}

export default Home;
