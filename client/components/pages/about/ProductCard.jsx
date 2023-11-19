import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import React from "react";

export default function ProductCard({ data }) {
  return (
    <Stack sx={{ width: "200px" }}>
      <img src={data?.image.url} alt="productImg" />
      <Typography>{data?.title}</Typography>
    </Stack>
  );
}
