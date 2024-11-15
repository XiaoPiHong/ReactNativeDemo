import {default as http} from "@/utils/request";

export const postOauthToken = data => {
  return http.post({
    url: "/oauth/token",
    data,
  });
};
