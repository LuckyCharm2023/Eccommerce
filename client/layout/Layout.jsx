import Navbar from "@/components/navbar/Navbar";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ position: "relative", top: 80 }}>{children}</div>
    </>
  );
}
