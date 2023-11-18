import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function CommentCart({ data }) {
  return (
    <Stack
      sx={{
        width: "100%",
        borderRadius: "10px",
        backgroundColor: "#f3f4f7",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          style={{ height: "30px", width: "30px", borderRadius: "50%" }}
          src={data.image.url}
          alt="productImg"
        />
        <Typography>{data.title}</Typography>
      </Box>
      <Rating name="read-only" value={3} size="small" readOnly />
      <Typography fontSize="small">{data.title}</Typography>
    </Stack>
  );
}
