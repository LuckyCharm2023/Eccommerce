import TopBar from "@/components/TopBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <TopBar />
      <Box
        sx={{
          width: "100%",
          padding: "10px",
          height: "91vh",
          overflowY: "scroll",
        }}
      >
        {children}
      </Box>
    </>
  );
}
