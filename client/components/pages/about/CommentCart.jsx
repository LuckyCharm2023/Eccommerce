import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { MdDelete } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";

export default function CommentCart({
  data,
  userId,
  deleteHandler,
  updateHandler,
}) {
  // console.log(data.userId, "ERR1");
  // console.log(userId, "ERR2");

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "10px",
        backgroundColor: "#f3f4f7",
        padding: "8px 2px 8px 10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
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
              src={data?.image}
              alt="productImg"
            />
            <Typography>{data?.name}</Typography>
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
      {data.userId === userId && (
        <Stack
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <IconButton
            onClick={() => {
              deleteHandler(data?._id);
            }}
          >
            <MdDelete className="text-2xl text-zinc-400 cursor-pointer  text-xl" />
          </IconButton>

          <Button
            onClick={() => {
              updateHandler(data);
            }}
            sx={{
              textTransform: "capitalize",
              "&.MuiButtonBase-root": {
                color: "gray",
                padding: 0,
              },
            }}
          >
            Edit
          </Button>
        </Stack>
      )}
    </Box>
  );
}
