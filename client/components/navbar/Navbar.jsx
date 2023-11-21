import Image from "next/image";
import React from "react";
import { IoIosCart } from "react-icons/io";
import { Anton } from "next/font/google";
import { IoIosLogOut } from "react-icons/io";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { logout } from "@/controller/auth";
import { Avatar } from "@mui/material";
const inter = Anton({ subsets: ["latin"], weight: ["400"] });

function Navbar() {
  const router = useRouter();
  const data = Cookies.get("userData");
  const userData = data ? JSON.parse(data) : null;
  return (
    <>
      <div
        style={{ position: "fixed", zIndex: 1, background: "white" }}
        className="flex flex-row w-[100%]  items-center  border-b-2 border-[#BBBFBF]"
      >
        <div className="flex flex-row w-[70%] md:w-[80%] items-center font-medium text-md md:text-xl text-gray-500 top-2 ">
          <Image
            src={require("../../src/assests/logo.png")}
            className="w-12 md:w-20 px-2 py-1"
          />
          <span className={inter.className}>Shopify</span>
        </div>
        <div className="flex flex-row w-[20%] justify-around gap-3">
          {!userData && (
            <div
              onClick={() => {
                router.push("/auth/login");
              }}
              className="cursor-pointer flex flex-row  items-center gap-1 mr-2 bg-red-400 px-2 py-1 rounded-md text-white font-medium"
            >
              {/* <IoIosLogOut className="text-sm md:text-xl " /> */}
              <span className="text-sm md:text-xl">Login</span>
            </div>
          )}
          {userData && (
            <>
              <div
                style={{ border: "3px solid lightgreen" }}
                className="cursor-pointer flex flex-row  items-center gap-1 mr-2 bg-transparent  px-2 py-1 rounded-md text-white font-medium"
              >
                <Avatar
                  sx={{ width: 35, height: 35, border: "2px solid green" }}
                  src={userData?.image?.url}
                />
                <span className="text-sm md:text-xl text-[lightgreen]">
                  {userData?.uname}
                </span>
              </div>
              <div
                onClick={() => {
                  logout();
                }}
                className="cursor-pointer flex flex-row  items-center gap-1 mr-2 bg-red-400 px-2 py-1 rounded-md text-white font-medium"
              >
                <IoIosLogOut className="text-sm md:text-xl " />
                <span className="text-sm md:text-xl">Logout</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
