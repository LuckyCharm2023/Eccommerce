import TopBar from "@/components/TopBar";
import Footer from "@/components/navbar/Footer";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Layout({ children }) {
  return (
    <div>
      <TopBar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
