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
import { IoMdArrowBack } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { HiMiniTrophy } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";

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
      <div className="flex flex-row justify-between w-full p-5  ">
        <div className=" w-[50%] flex flex-col items-center gap-10 bg-white rounded-3xl p-5 sticky top-5">
          <div
            className="flex flex-row w-full justify-start"
            onClick={() => {
              router.push("/products/homePage");
            }}
          >
            <IoMdArrowBack className="text-2xl font-medium cursor-pointer" />
          </div>
          <div className="flex flex-col items-center w-64 gap-3 ">
            <img
              src={product?.image?.url}
              alt="productImg"
              className="w-full flex "
            />
            <div className="text-2xl font-medium ">{product?.title}</div>
          </div>
          <div className="flex flex-row w-full justify-around items-center ">
            <button className="bg-orange-400 text-white  w-40 h-14 text-xl font-semibold rounded-3xl">
              Add to Cart
            </button>
            <button className="bg-orange-400 text-white  w-40 h-14 text-xl font-semibold rounded-3xl">
              Buy now
            </button>
          </div>
        </div>
        <div className="flex flex-col w-[50%] p-5 ">
          <div>
            <div className="text-3xl font-medium">{product.title}</div>
            <div className="text-md text-blue-500">Visit the Store</div>
            <div className="text-md gap-1 flex flex-row">
              <span className="font-semibold">Shopify</span>Choice
            </div>
            <div className="flex flex-row items-center gap-2 mb-2">
              <div className="flex flex-row gap-1 items-center">
                <span className="text-xl">{product.rating}</span>
                <IoStar className="text-md text-orange-500 " />
              </div>
              <span className="text-md">Ratings & Reviews</span>
            </div>
            <div className="flex flex-col border-y-2 border-[#BBBFBF] mb-3 gap-1">
              <div className="flex flex-row gap-1 items-center">
                <div><MdCurrencyRupee className="text-md" /></div>
                <span className="text-2xl font-semibold mt-3">
                  {product.price}
                </span>
              </div>
              <span className="text-md font-semibold ">
                Inclusive of all taxes
              </span>
              <div className="flex flex-row gap-2 mb-2">
                <div className="text-md  "> No Cost EMI available</div>
                <div className="text-md font-semibold text-blue-500">
                  {" "}
                  EMI Options
                </div>
              </div>
            </div>
            <div className=" w-full gap-2 flex flex-col">
              <div className="text-xl font-semibold">Specfications:-</div>
              <div className="flex flex-row pl-5 w-full">
                <div className="flex flex-col gap-1 text-md font-semibold w-[20%] ">
                  <div>Brand </div>
                  <div>Model </div>
                  <div>Display </div>
                  <div>RAM </div>
                  <div>Storage </div>
                  <div>Processer </div>
                  <div>Front-Camera </div>
                  <div>Rear-Camera </div>
                  <div>Battery </div>
                  <div>Description </div>
                </div>
                <div className="flex flex-col gap-1 text-md font-medium  w-[80%]">
                  <div>{product?.title}</div>
                  <div>{product?.spec?.model}</div>
                  <div className="flex flex-row gap-1 items-center">
                    <span>{product?.spec?.display}</span>
                    <div>display</div>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <span>{product?.spec?.ram}</span>
                    <div>GB RAM</div>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <span>{product?.spec?.storage}</span>
                    <div>GB ROM</div>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <span>{product?.spec?.processer}</span>
                    <div>Processor</div>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <span>{product?.spec?.frontCam}</span>
                    <div>MP | 4k 60fps</div>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <span>{product?.spec?.rearCam}</span>
                    <div>MP | 4k 60fps</div>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <span>{product?.spec?.battery}</span>
                    <div>mAH</div>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <span>{product?.description}</span>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full justify-around gap-2 mt-3 border-y-2 border-[#BBBFBF] mb-3 py-5">
              <div className="flex flex-col items-center gap-1">
                <div>
                  <FaBoxOpen className="flex text-orange-300 text-2xl " />
                </div>
                <div className="text-sm font-medium">7 days Replacement</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div>
                  <FaTruck className="flex text-orange-300 text-2xl" />{" "}
                </div>
                <div className="text-sm font-medium">Free Delivery</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div>
                  <IoShieldCheckmarkSharp className="flex text-orange-300 text-2xl" />
                </div>
                <div className="text-sm font-medium">Warranty Policy</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div>
                  <HiMiniTrophy className="flex text-orange-300 text-2xl" />
                </div>
                <div className="text-sm font-medium">Top Brans</div>
              </div>
            </div>
          </div>
          <Box
            sx={{
              backgroundColor: "lavender",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              padding: "10px",
            }}
          >
            <div className="flex flex-row justify-between items-center">
              <div>
                <div className="text-md font-medium">Rate this product</div>
                <Rating
                  name="rating"
                  value={parseInt(commentDatas.rating, 10)}
                  onChange={handleonChange}
                />
              </div>
              {commentDatas.rating > 0 && (
                <Button onClick={handleSubmit} size="small" variant="outlined">
                  Post
                </Button>
              )}
            </div>
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
        </div>
      </div>
    </Layout>
  );
}
