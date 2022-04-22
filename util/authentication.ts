import axios from "axios";

const getAuthCode = () => {
  if (typeof window !== "undefined")
    return sessionStorage.getItem("__AUTHENTICATION_CODE__") || "";
};
const getUsername = () => {
  if (typeof window !== "undefined")
    return sessionStorage.getItem("__AUTHENTICATION_USERNAME__") || "";
};

export function UpdateAuthCode(code: any) {
  sessionStorage.setItem("__AUTHENTICATION_CODE__", code);
  console.log(getAuthCode());
}
export function UpdateUsername(username: string) {
  sessionStorage.setItem("__AUTHENTICATION_USERNAME__", username);
  console.log(getUsername());
}

export function CheckLoggedIn(): boolean {
  if (getAuthCode() === "") return false;
  axios
    .get(
      `/api/login?authcode=${getAuthCode()?.replace(
        /\"/g,
        ""
      )}&type=1&username=${getUsername()?.replace(/\"/g, "")}`
    )
    .then(({ data }) => {
      console.log(data);
      return true;
    })
    .catch(() => false);
  return true;
}
