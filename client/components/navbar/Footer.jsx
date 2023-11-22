import React from "react";
import { Anton } from "next/font/google";
import Image from "next/image";
const inter = Anton({ subsets: ["latin"], weight: ["400"] });

function Footer() {
  return (
    <>
      <div className="bg-[#232F3E] w-[100%] p-3">
        <div className="text-white tracking-wider">
          <span className={inter.className}>SHOPIFY WEBSITE</span>
        </div>
        <div>
          <div className="text-slate-300 text-sm w-full justify-center flex flex-row tracking-wider p-3 ">
            <span>shopifyinfo@gmail.com</span>
          </div>
          <div className="flex flex-row justify-center items-center font-medium text-md md:text-xl text-white gap-2  ">
            <Image
              alt="loading..."
              src={require("../../src/assests/logo.png")}
              className="w-10 md:w-11 bg-white rounded-full p-2 "
            />
            <div className={inter.className}>Shopify</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
