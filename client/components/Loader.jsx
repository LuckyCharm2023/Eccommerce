import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

export default function Loader() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="inherit" />
    </div>
  );
}
