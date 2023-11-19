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
import LoginModal from "@/components/pages/auth/LoginModal";
import Cookies from "js-cookie";
import { createComment, getComments } from "@/controller/comment";
import toast, { Toaster } from "react-hot-toast";
import { getAllUser } from "@/controller/auth";

export default function About() {
  const data = Cookies.get("userData");
  const userData = data ? JSON.parse(data) : null;
  const [product, setproduct] = useState({});
  const [comments, setcomments] = useState([]);
  const [allUsers, setallUsers] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (router?.query.id) {
      getProductByID(router?.query.id).then((res) => {
        setproduct(res);
        if (res) {
          getComments(res?._id).then((data) => setcomments(data));
        }
      });
    }
    getAllUser().then((data) => {
      if (data) {
        setallUsers(data);
      }
    });
  }, [router?.query.id]);
  // console.log(allUsers, "Comments");
  const commentArray = ["Excellent", "Good", "Not bad", "Poor"];

  const [commentDatas, setcommentDatas] = useState({
    rating: 0,
    comment: "",
    userId: "",
    productId: "",
  });
  const [open, setopen] = useState(false);
  const handleOpenLoginModal = () => {
    setopen(true);
  };
  const handleonChange = (event) => {
    const { name, value } = event.target;
    setcommentDatas({ ...commentDatas, [name]: value });
  };
  const [disableRating, setdisableRating] = useState(true);
  const handleSubmit = () => {
    setcommentDatas({
      rating: commentDatas.rating,
      comment: commentDatas.comment,
      userId: userData?._id,
      productId: product?._id,
    });
    if (!userData) {
      handleOpenLoginModal();
    } else {
      if (
        commentDatas.rating &&
        commentDatas.comment &&
        commentDatas.userId &&
        commentDatas.productId
      ) {
        createComment(commentDatas);
        getComments();
      } else {
        toast.error("All fields are mandatory");
        console.log(commentDatas, "CommentDatas");
      }
    }
  };
  const userPicMap = new Map(allUsers.map((pic) => [pic._id, pic.image.url]));
  const userNameMap = new Map(allUsers.map((pic) => [pic._id, pic.uname]));
  const commentsWithPics = comments.map((comment) => ({
    ...comment,
    image: userPicMap.get(comment.userId),
    name: userNameMap.get(comment.userId),
  }));

  return (
    <Layout>
      <Toaster />
      <LoginModal open={open} close={setopen} />
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
                name="rating"
                value={parseInt(commentDatas.rating, 10)}
                onChange={handleonChange}
              />
            </Stack>
            {commentDatas.rating > 0 && (
              <Button onClick={handleSubmit} size="small" variant="outlined">
                Post
              </Button>
            )}
          </Box>
          {commentDatas.rating > 0 && (
            <TextField
              value={commentDatas.comment}
              size="small"
              placeholder="Describe your experience"
              onChange={handleonChange}
              name="comment"
            />
          )}
          <Box
            hidden={commentDatas.rating == 0}
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
                    setcommentDatas({ ...commentDatas, comment: item });
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
          {commentsWithPics?.map((data) => {
            return <CommentCart key={data._id} data={data} />;
          })}
        </Box>
      </Stack>
    </Layout>
  );
}
