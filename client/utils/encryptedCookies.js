import Cookies from "js-cookie";

export const EncryptCookie = (name, value) => {
  if (name && value) {
    Cookies.set(name, value);
  }
};
export const DecryptCookie = (name) => {
  if (name) {
    Cookies.get(name);
  }
};
