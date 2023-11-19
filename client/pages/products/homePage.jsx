import CommentCart from "@/components/pages/about/CommentCart";
import ProductCard from "@/components/pages/about/productCard";
import { getAllProducts, getProductByID } from "@/controller/products";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();
  const [allProducts, setallProducts] = useState([]);
  useEffect(() => {
    getAllProducts().then((res) => {
      setallProducts(res);
    });
  }, []);

  return (
    <Layout>
      <Grid gap={6.3} container>
        {allProducts?.map((item) => {
          return (
            <Grid
              onClick={() => {
                router.push({
                  pathname: "/products/about",
                  query: {
                    id: item._id,
                  },
                });
              }}
              item
              key={item._id}
            >
              <ProductCard data={item} />
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
}
