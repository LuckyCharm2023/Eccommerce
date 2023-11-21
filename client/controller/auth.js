import { DecryptCookie, EncryptCookie } from "@/utils/encryptedCookies";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const registerUser = async (data) => {
  try {
    const response = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    console.log(response, "User Registered");
    if (response.status === "ok") {
      toast.success("User Registered Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};
export const loginUser = async (data) => {
  try {
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (response.status == "ok") {
      toast.success("Login successful");
      EncryptCookie("token", response.data);
    }
    if (response.error == "User not Exists") {
      toast.error("User not Exists");
    }
    if (response.status == "error") {
      toast.error("Invalid Password");
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const userDatas = async () => {
  try {
    const response = await fetch("http://localhost:4000/auth/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: Cookies.get("token"),
      }),
    }).then((res) => res.json());

    if (response.data == "token expired") {
      toast.error("Token expired login again");
      // Cookies.remove("token");
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllUser = async (data) => {
  try {
    const response = await fetch("http://localhost:4000/auth/getUsers", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => res.json());
    console.log(response.data, "ALLUsers");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("userData");
  window.location.href = "/";
};
