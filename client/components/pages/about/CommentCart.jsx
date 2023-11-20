import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { MdDelete } from "react-icons/md";

export default function CommentCart({ data }) {
  // console.log(data);
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
        <Box sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
        <img
          style={{ height: "30px", width: "30px", borderRadius: "50%" }}
          src={data?.image}
          alt="productImg"
        />
        <Typography>{data?.name}</Typography>
        </Box>
        <Box>
          < MdDelete className="text-2xl text-zinc-400 cursor-pointer"/>

        </Box>
      </Box>
      <Rating
        name="read-only"
        value={parseInt(data?.rating, 10)}
        size="small"
        readOnly
      />
      <Typography fontSize="small">{data?.comment}</Typography>
    </Stack>
  );
}
