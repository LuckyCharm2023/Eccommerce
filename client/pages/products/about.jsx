import CommentCart from "@/components/pages/about/CommentCart";
import ProductCard from "@/components/pages/about/productCard";
import { getproduct, getProductByID } from "@/controller/products";
import Layout from "@/layout/Layout";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

export default function About() {
  const [product, setproduct] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (router?.query.id) {
      getProductByID(router?.query.id).then((res) => {
        setproduct(res);
      });
    }
  }, [router?.query.id]);
  const commentArray = ["Excellent", "Good", "Not bad", "Poor"];
  const [commentField, setcommentField] = useState("");
  const [rating, setrating] = useState(0);
  return (
    <Layout>
      <Stack
        direction={"row"}
        sx={{ width: "100%", justifyContent: "space-between", padding: "10px" }}
      >
        <Stack sx={{ width: "200px" }}>
          <img src={product?.image?.url} alt="productImg" />
          <Typography>{product?.title}</Typography>
        </Stack>
        <Box
          sx={{
            backgroundColor: "lavender",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "50%",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack>
              <Typography fontSize="small">Rate this product</Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event) => {
                  setrating(event.target.value);
                }}
              />
            </Stack>
            <Button size="small" variant="outlined">
              Post
            </Button>
          </Box>
          <TextField
            value={commentField ? commentField : ""}
            size="small"
            placeholder="Describe your experience"
            onChange={(e) => {
              setcommentField(e.target.value);
            }}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "10px",
              alignItems: "center",
              padding: "10px",
            }}
          >
            {commentArray.map((item) => {
              return (
                <Button
                  onClick={() => {
                    setcommentField(item);
                  }}
                  key={item}
                  sx={{
                    color: "gray",
                    "&.MuiButtonBase-root": { border: "1px solid gray" },
                    textTransform: "capitalize",
                  }}
                  size="small"
                  variant="outlined"
                >
                  {item}
                </Button>
              );
            })}
          </Box>
          <CommentCart data={product} />;
        </Box>
      </Stack>
    </Layout>
  );
}
