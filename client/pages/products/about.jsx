import CommentCart from "@/components/pages/about/CommentCart";

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
import {
  createComment,
  deleteComments,
  getComments,
  updateComments,
} from "@/controller/comment";
import toast, { Toaster } from "react-hot-toast";
import { getAllUser } from "@/controller/auth";
import { IoMdArrowBack } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { HiMiniTrophy } from "react-icons/hi2";
import { Chip, Skeleton } from "@mui/material";

export default function About() {
  const [isLoading, setisLoading] = useState(false);
  const data = Cookies.get("authUserData");
  const userData = data && data !== undefined ? JSON.parse(data) : false;
  const [product, setproduct] = useState({});
  const [comments, setcomments] = useState([]);
  const [allUsers, setallUsers] = useState([]);
  const router = useRouter();
  const [productID, setproductID] = useState("");

  const [reviewStatus, setreviewStatus] = useState({
    lable: "GOOD",
    color: "warning",
  });
  const totalRating = comments.reduce(
    (acc, obj) => acc + Number(obj.rating),
    0
  );
  useEffect(() => {
    if (totalRating < 10) {
      setreviewStatus({
        lable: "POOR",
        color: "error",
      });
    } else if (totalRating > 10 || totalRating < 15) {
      setreviewStatus({
        lable: "NOT BAD",
        color: "warning",
      });
    } else if (totalRating > 15 || totalRating < 20) {
      setreviewStatus({
        lable: "GOOD",
        color: "secondary",
      });
    } else if (totalRating > 20 || totalRating < 25) {
      setreviewStatus({
        lable: "EXCELLENT",
        color: "success",
      });
    }
  }, []);
  useEffect(() => {
    if (totalRating < 10) {
      setreviewStatus({
        lable: "POOR",
        color: "error",
      });
    }
    if (totalRating > 10 && totalRating < 15) {
      setreviewStatus({
        lable: "NOT BAD",
        color: "warning",
      });
    }
    if (totalRating > 15 && totalRating < 20) {
      setreviewStatus({
        lable: "GOOD",
        color: "secondary",
      });
    }
    if (totalRating > 20 && totalRating < 25) {
      setreviewStatus({
        lable: "EXCELLENT",
        color: "success",
      });
    }
  }, [totalRating]);

  const getAllDatas = () => {
    setisLoading(true);
    if (router?.query.id) {
      getProductByID(router?.query.id).then((res) => {
        setproduct(res);
        if (res) {
          setisLoading(false);
          setproductID(res._id);
          getComments(res?._id).then((data) => setcomments(data));
        }
      });
    }
    getAllUser().then((data) => {
      if (data) {
        setallUsers(data);
      }
    });
  };
  useEffect(() => {
    getAllDatas();
  }, [router?.query.id, router.pathname, comments.length]);
  // console.log(allUsers, "Comments");

  const [open, setopen] = useState(false);
  const handleOpenLoginModal = () => {
    setopen(true);
  };
  const [disableRating, setdisableRating] = useState(true);

  const specifications = [
    "Brand",
    "Model",
    "Display",
    "RAM",
    "Storage",
    "Processer",
    "Front-Camera",
    "Rear-Camera",
    "Battery",
    "Description",
  ];

  const specsValArray = [
    {
      title: "display",
      value: product?.spec?.display,
    },
    {
      title: "GB RAM",
      value: product?.spec?.ram,
    },
    {
      title: "GB ROM",
      value: product?.spec?.storage,
    },
    {
      title: "Processor",
      value: product?.spec?.processer,
    },
    {
      title: "MP | 4k 60fps",
      value: product?.spec?.frontCam,
    },
    {
      title: "MP | 4k 60fps",
      value: product?.spec?.rearCam,
    },
    {
      title: "mAH",
      value: product?.spec?.battery,
    },
    {
      title: "",
      value: product?.description,
    },
  ];

  //*Comment section Functions
  const [openCommentField, setopenCommentField] = useState(false);
  const [commentID, setcommentID] = useState("");
  const [isAddMode, setisAddMode] = useState(true);

  const [commentDatas, setcommentDatas] = useState({
    rating: 0,
    comment: "",
  });

  const commentArray = ["Excellent", "Good", "Not bad", "Poor"];

  const userPicMap = new Map(allUsers.map((pic) => [pic._id, pic.image.url]));
  const userNameMap = new Map(allUsers.map((pic) => [pic._id, pic.uname]));

  const commentsWithPics = () =>
    comments.map((comment) => ({
      ...comment,
      image: userPicMap.get(comment.userId),
      name: userNameMap.get(comment.userId),
    }));

  const handleonChange = (event) => {
    const { name, value } = event.target;
    setcommentDatas({ ...commentDatas, [name]: value });
    if (!userData || userData == undefined) {
      handleOpenLoginModal();
    } else if (isAddMode) {
      handleAddComment();
    }
  };
  const handleAddComment = () => {
    setopenCommentField(true);
    setisAddMode(true);
  };
  const handleDeleteComment = async (id) => {
    try {
      await deleteComments(id);
      getAllDatas();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    const formData = {
      rating: commentDatas.rating,
      comment: commentDatas.comment,
      userId: userData?._id,
      productId: product?._id,
    };
    setopenCommentField(false);
    if (commentDatas.rating && commentDatas.comment) {
      if (!isAddMode) {
        updateComments(commentID, commentDatas).then((res) => {
          if (res && res.status == "ok") {
            setopenCommentField(false);
            setcommentDatas({
              rating: 0,
              comment: "",
            });
            setisAddMode(true);
          }
        });
      } else {
        createComment(formData);
      }
      getAllDatas();
    } else {
      toast.error("All fields are mandatory");
      // console.log(commentDatas, "CommentDatas");
    }
  };
  const handleOpenUpdation = (data) => {
    setopenCommentField(true);
    setisAddMode(false);
    setcommentID(data?._id);
    setcommentDatas({
      rating: data?.rating,
      comment: data?.comment,
      userId: data?.userId,
      productId: data?.productId,
      id: data?._id,
    });
  };
  return (
    <Layout>
      <Toaster />
      <LoginModal open={open} close={setopen} />
      <div className="flex flex-col md:flex-row justify-between w-full md:p-5  ">
        <div className=" w-full md:w-[50%] flex flex-col items-center gap-10 bg-white rounded-3xl p-5 md:sticky md:top-5">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "sticky",
              top: "80px",
              width: {
                xl: "100%",
                lg: "100%",
                md: "100%",
                sm: "100%",
                xs: "100%",
              },
              alignItems: "center",
              justifyContent: "space-between",
              // bgcolor: "red",
            }}
          >
            <div
              className="flex flex-row w-full justify-start"
              onClick={() => {
                router.push("/products/homePage");
              }}
            >
              <IoMdArrowBack className="text-2xl font-medium cursor-pointer" />
            </div>
            <div className="flex flex-col items-center w-36 md:w-64 gap-3 ">
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  className="w-[100%]"
                  sx={{
                    borderRadius: "10px",
                    height: { md: "400px", sm: "300px", xs: "300px" },
                  }}
                />
              ) : (
                <img
                  src={product?.image?.url}
                  alt="productImg"
                  className="w-full flex "
                />
              )}
              <div className="text-xl md:text-2xl font-medium ">
                {product?.title}
              </div>
            </div>
            <div className="flex flex-row w-full justify-around items-center ">
              <button
                onClick={() => {
                  toast.error("COMMING SOON...");
                }}
                className="bg-orange-400 text-white w-32 h-10 md:w-40 md:h-14 text-md md:text-xl font-semibold rounded-3xl"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  toast.error("COMMING SOON...");
                }}
                className="bg-orange-400 text-white  w-32 h-10 md:w-40 md:h-14 text-md md:text-xl font-semibold rounded-3xl"
              >
                Buy now
              </button>
            </div>
          </Box>
        </div>
        <div className="flex flex-col w-full md:w-[50%] p-5 ">
          <div>
            <div className="text-3xl font-medium">{product.title}</div>
            <div className="text-xl font-medium">{product?.spec?.model}</div>
            <div className="text-sm md:text-md text-blue-500">
              Visit the Store
            </div>
            <div className="text-sm md:text-md gap-1 flex flex-row">
              <span className="font-semibold">Shopify</span>Choice
            </div>
            <div className="flex flex-row items-center gap-2 mb-2">
              <div className="flex flex-row gap-1 items-center">
                <span className="text-md md:text-xl">{totalRating}</span>
                <IoStar className="text-sm md:text-md text-orange-500 " />
              </div>
              <span className="text-sm md:text-md">Ratings & Reviews</span>
              <Chip
                label={reviewStatus.lable ? reviewStatus.lable : "Status"}
                variant="filled"
                color={reviewStatus.color ? reviewStatus.color : "default"}
              />
            </div>
            <div className="flex flex-col border-y-2 border-[#BBBFBF] mb-3 gap-1">
              <div className="flex flex-row  items-center">
                <div>
                  <MdCurrencyRupee className="text-md mt-2" />
                </div>
                <span className="text-xl md:text-2xl font-semibold mt-3">
                  {product.price}
                </span>
              </div>
              <span className="text-sm md:text-md font-semibold ">
                Inclusive of all taxes
              </span>
              <div className="flex flex-row gap-2 mb-2">
                <div className="text-sm md:text-md  ">
                  {" "}
                  No Cost EMI available
                </div>
                <div className="text-sm md:text-md font-semibold text-blue-500">
                  {" "}
                  EMI Options
                </div>
              </div>
            </div>
            <div className=" w-full gap-2 flex flex-col">
              <div className="text-xl font-semibold">Specfications:-</div>
              <div className="flex flex-row pl-2 gap-2 md:pl-5 w-full">
                <div className="flex flex-col gap-1 text-sm md:text-md  w-[30%] md:w-[20%]">
                  <div className="flex flex-row gap-4">
                    <div className="font-bold">Brand </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="font-bold">Model </div>
                  </div>{" "}
                  <div className="flex flex-row gap-4">
                    {" "}
                    <div className="font-bold">Display </div>{" "}
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="font-bold">RAM </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="font-bold">Storage </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="font-bold">Processer </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    {" "}
                    <div className="font-bold">Front-Camera </div>{" "}
                  </div>
                  <div className="flex flex-row gap-4">
                    {" "}
                    <div className="font-bold">Rear-Camera </div>{" "}
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="font-bold">Battery </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    {" "}
                    <div className="font-bold">Description </div>{" "}
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-sm md:text-md  w-[70%] md:w-[80%] ">
                  <div className="flex flex-row gap-4">
                    <div className="font-base">{product?.title}</div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="font-base">{product?.spec?.model}</div>
                  </div>{" "}
                  <div className="flex flex-row gap-4">
                    {" "}
                    <div>
                      <span className="font-base">
                        {product?.spec?.display}
                      </span>{" "}
                      display
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-row gap-1 items-center">
                      <span className="font-base">{product?.spec?.ram}</span>
                      <div>GB RAM</div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-row gap-1 items-center">
                      <span className="font-base">
                        {product?.spec?.storage}
                      </span>
                      <div>GB ROM</div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-row gap-1 items-center">
                      <span className="font-base">
                        {product?.spec?.processer}
                      </span>
                      <div>Processor</div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    {" "}
                    <span className="font-base">{product?.spec?.frontCam}</span>
                  </div>
                  <div className="flex flex-row gap-4">
                    {" "}
                    <span className="font-base">{product?.spec?.rearCam}</span>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-row gap-1 items-center">
                      <span className="font-base">
                        {product?.spec?.battery}
                      </span>
                      <div>mAH</div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    {" "}
                    <span className="font-base">{product?.description}</span>
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
              {openCommentField && (
                <Button onClick={handleSubmit} size="small" variant="outlined">
                  Post
                </Button>
              )}
            </div>
             {totalRating == 0 && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "gray",
                  padding: "10px",
                  background: "white",
                  borderRadius: "8px",
                }}
              >
                No Comments...
              </Box>
            )}
            {openCommentField && (
              <TextField
                value={commentDatas.comment}
                size="small"
                placeholder="Describe your experience"
                onChange={handleonChange}
                name="comment"
              />
            )}
            {openCommentField && (
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
            )}
            {commentsWithPics()?.map((item) => {
              return (
                <CommentCart
                  key={item._id}
                  data={item}
                  userId={userData?._id}
                  deleteHandler={handleDeleteComment}
                  updateHandler={handleOpenUpdation}
                />
              );
            })}
          </Box>
        </div>
      </div>
    </Layout>
  );
}
