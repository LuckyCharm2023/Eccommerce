import CommentCart from "@/components/pages/about/CommentCart";
import ProductCard from "@/components/pages/about/productCard";
import { getAllProducts } from "@/controller/products";
import Layout from "@/layout/Layout";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { Typography } from "@mui/material";

export default function About() {
  const [allProducts, setallProducts] = useState([]);
  useEffect(() => {
    getAllProducts().then((res) => {
      setallProducts(res);
    });
  }, []);
  const commentArray = ["Excellent", "Good", "Not bad", "Poor"];
  const [commentField, setcommentField] = useState("");
  const [rating, setrating] = useState(0);
  return (
    <Layout>
      <Stack
        direction={"row"}
        sx={{ width: "100%", justifyContent: "space-between", padding: "10px" }}
      >
        {allProducts?.map((item) => {
          return <ProductCard key={item._id} data={item} />;
        })}
        <Box
          sx={{
            backgroundColor: "lavender",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",

            width: "50%",
            padding: "10px",
          }}
        >
          <Typography fontSize="small">Rate this product</Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event) => {
              setrating(event.target.value);
            }}
          />
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
          {allProducts.map((item) => {
            return <CommentCart data={item} />;
          })}
        </Box>
      </Stack>
    </Layout>
  );
}
