import { logout } from "@/controller/auth";
import { Modal } from "@mui/material";
import Cookies from "js-cookie";
import React from "react";
import { IoMdClose } from "react-icons/io";
import "animate.css";

function Profile({ open, setOpen }) {
  const data = Cookies.get("userData");
  const userdata = data ? JSON.parse(data) : null;
  return (
    <>
      <Modal
        open={open}
        className="flex flex-row justify-end backdrop-blur-sm w-full"
      >
        <div className="animate__animated animate__fadeInRight  bg-neutral-100  p-5 items-center  pt-10 gap-3 flex flex-col">
          <div className="flex flex-row justify-between w-full">
            <IoMdClose
              className="text-zinc-500 text-xl cursor-pointer scale-105 transition-all"
              onClick={() => {
                setOpen(false);
              }}
            />
            <IoMdClose className="text-white" />
          </div>
          <div>
            <img
              src={userdata?.image?.url}
              alt="profile"
              className="w-16 px-3 flex p-2 bg-blue-300 rounded-full"
            />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="text-zinc-500 text-sm md:text-lg font-medium">
              User Name:
            </div>
            <div className="text-zinc-500 text-sm md:text-lg font-medium">
              {userdata?.uname}
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="text-zinc-500 text-sm md:text-lg font-medium">
              User Email:
            </div>
            <div className="text-zinc-500 text-sm md:text-lg font-medium">
              {userdata?.email}
            </div>
          </div>{" "}
          <div className="flex flex-row gap-2 items-center">
            <div className="text-zinc-500 text-sm md:text-lg font-medium">
              User Type:
            </div>
            <div className="text-zinc-500 text-sm md:text-lg font-medium">
              {userdata?.userType}
            </div>
          </div>
          <div>
            <button
              className="bg-blue-300 text-white px-3 font-semibold py-1 rounded-md"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Profile;
