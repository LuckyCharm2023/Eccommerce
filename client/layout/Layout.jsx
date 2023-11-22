import TopBar from "@/components/TopBar";
import Footer from "@/components/navbar/Footer";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <TopBar />
      {children}
      <Footer />
    </>
  );
}
