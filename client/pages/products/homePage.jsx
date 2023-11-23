import SkeletonCard from "@/components/SkeletonCard";
import { getAllComments, getComments } from "@/controller/comment";
import { getAllProducts } from "@/controller/products";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";
import { comment } from "postcss";
import React, { useEffect, useState } from "react";
import { FaTruck } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";

export default function Homepage() {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState([]);
  const [allComments, setallComments] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(true);
    getAllProducts().then((res) => {
      setAllProducts(res);
      if (res) {
        setisLoading(false);
      }
    });
    getAllComments().then((res) => {
      setallComments(res);
    });
  }, []);
  const productComments = allProducts?.map((product) => {
    const productComments = allComments
      ?.filter((comment) => comment.productId === product._id)
      .map((comment) => comment.rating)
      .reduce((acc, rating) => acc + Number(rating), 0);

    return {
      ...product,
      commentsRating: productComments,
    };
  });
  return (
    <>
      <Layout>
        <div className="flex flex-col p-0 md:p-3 bg-white w-full gap-3">
          {!isLoading ? (
            <>
              {productComments?.map((item) => {
                return (
                  <div
                    key={item._id}
                    className=" flex flex-row w-full bg-slate-200 md:rounded-xl p-1 py-2 md:p-5 md:border-2 border-[#9d9e9e38]"
                    onClick={() => {
                      router.push({
                        pathname: "/products/about",
                        query: {
                          id: item._id,
                        },
                      });
                    }}
                  >
                    <div className=" p-2 items-center flex md:p-5  justify-center bg-white w-[30%] rounded-md md:rounded-2xl">
                      <img
                        src={item.image.url}
                        alt="images"
                        className="w-24 h-24 md:w-40 md:h-48 hover:scale-105 transition-all cursor-pointer"
                      />
                    </div>
                    <div className=" w-[70%] px-5 py-2 flex flex-col gap-0 md:gap-2">
                      <div className="text-lg md:text-2xl font-medium hover:text-orange-400 transition-all cursor-pointer">
                        {item.title}
                      </div>
                      <div className="text-md md:text-md font-base ">
                        {item?.spec?.model}
                      </div>
                      <div className="flex flex-row items-center gap-1 text-sm md:text-md  px-2 py-1">
                        <div className="flex flex-row items-center">
                          <div className=" font-medium text-md">
                            {item.commentsRating}
                          </div>
                          <MdOutlineStar className="text-orange-500 text-xl " />
                        </div>
                        <div className="text-md">Ratings & Reviews</div>
                      </div>
                      <div className="flex flex-row items-center">
                        <MdCurrencyRupee />
                        <div className="text-lg md:text-2xl font-semibold">
                          {item.price}
                        </div>
                      </div>
                      <div className="flex flex-row gap-1 items-center">
                        <FaTruck className="flex text-orange-500 text-md md:text-2xl" />{" "}
                        <div className="text-sm md:text-xl">
                          <div className="font-medium text-sm md:text-xl">
                            FREE
                          </div>{" "}
                          Delivery by Shopify
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
