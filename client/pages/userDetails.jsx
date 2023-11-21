import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddProducts from "./admin/addProducts";
import HomePage from "./products/homePage";
import { userDatas } from "@/controller/auth";
import Cookies from "js-cookie";
import { EncryptCookie } from "@/utils/encryptedCookies";

export default function UserDetails() {
  const router = useRouter();
  const [userData, setuserData] = useState("");
  const [admin, setadmin] = useState(false);

  useEffect(() => {
    userDatas().then((data) => {
      setuserData(data);
      if (data.userType == "admin") {
        setadmin(true);
      }
    });
  }, []);
  EncryptCookie("userData", JSON.stringify(userData));
  return admin ? <AddProducts /> : <HomePage userData={userData} />;
}
