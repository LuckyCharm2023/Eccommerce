import Image from "next/image";
import React from "react";
import { IoIosCart } from "react-icons/io";
import { Anton } from "next/font/google";
import { IoIosLogOut } from "react-icons/io";
const inter = Anton({ subsets: ["latin"], weight: ["400"] });

function Navbar() {
  return (
    <>
      <div className="flex flex-row w-full items-center  border-b-2 border-[#BBBFBF]">
        <div className="flex flex-row w-[80%] items-center font-medium text-xl text-gray-500 top-2 ">
          <Image
            src={require("../../src/assests/logo.png")}
            className="w-20 px-2 py-1"
          />
          <span className={inter.className}>Shopify</span>
        </div>
        <div className="flex flex-row w-[20%] justify-around gap-3">
          <div className="flex flex-row  items-center gap-1">
            <IoIosCart className="text-xl text-orange-500" />
            <span className="text-xl">Cart</span>
          </div>
          <div className="flex flex-row  items-center gap-1 bg-red-400 px-2 py-1 rounded-lg text-white font-medium">
            <IoIosLogOut className="text-xl " />
            <span className="text-xl">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
