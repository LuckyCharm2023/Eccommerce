import TopBar from "@/components/TopBar";
import Footer from "@/components/navbar/Footer";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [userData, setuserData] = useState({});
  const data = Cookies.get("userData");
  useEffect(() => {
    const DATA = data ? JSON.parse(data) : null;
    if (DATA) {
      setuserData(DATA);
    }
  }, [data]);

  return (
    <div>
      <TopBar
        auth={userData && Object.keys(userData).length !== 0 ? true : false}
        userData={userData}
      />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
