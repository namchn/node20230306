const axios = require("axios");

const logout = async (access_token, next) => {
  try {
    const response = await axios.get(`https://kapi.kakao.com/v1/user/unlink`, {
      //const response = await axios.get(`https://kapi.kakao.com/v1/user/logout`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = response.data;
    //return res.send(tokenData.access_token);
    //console.log(data.results);
    console.log("data  token");
    console.log(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  logout,
};

// 카카오 토큰 형태
/* 
const tokens = {
  id: ,
  connected_at: "2022-04-13T07:18:15Z",
  properties: {
    nickname: "나",
    profile_image:
      "http://k.kakaocdn.net/dn/cpO44m/btrUfPYmFka/1GkFkWnJ9M6lkWtjCksuH1/img_640x640.jpg",
    thumbnail_image:
      "http://k.kakaocdn.net/dn/cpO44m/btrUfPYmFka/1GkFkWnJ9M6lkWtjCksuH1/img_110x110.jpg",
  },
  kakao_account: {
    profile_nickname_needs_agreement: false,
    profile_image_needs_agreement: false,
    profile: {
      nickname: "나",
      thumbnail_image_url:
        "http://k.kakaocdn.net/dn/cpO44m/btrUfPYmFka/1GkFkWnJ9M6lkWtjCksuH1/img_110x110.jpg",
      profile_image_url:
        "http://k.kakaocdn.net/dn/cpO44m/btrUfPYmFka/1GkFkWnJ9M6lkWtjCksuH1/img_640x640.jpg",
      is_default_image: false,
    },
    has_email: true,
    email_needs_agreement: false,
    is_email_valid: true,
    is_email_verified: true,
    email: ",
    has_gender: true,
    gender_needs_agreement: false,
    gender: "male",
  },
};
 */
