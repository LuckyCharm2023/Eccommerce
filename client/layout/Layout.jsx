import Container from "@mui/material/Container";
import React from "react";

export default function Layout({ children }) {
  return (
    <Container sx={{ height: "100vh", width: "100%" }}>{children}</Container>
  );
}
