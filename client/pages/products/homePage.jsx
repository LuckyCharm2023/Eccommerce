import { getAllProducts } from "@/controller/products";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaTruck } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";

export default function Homepage() {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    getAllProducts().then((res) => setAllProducts(res));
  }, []);

  return (
    <>
      <Layout>
        <div className="flex flex-col bg-slate-100 ">
          {allProducts?.map((item) => {
            return (
              <div
                key={item}
                className=" p-3 flex flex-row w-full"
                onClick={() => {
                  router.push({
                    pathname: "/products/about",
                    query: {
                      id: item._id,
                    },
                  });
                }}
              >
                <div className="p-5 flex justify-center bg-white w-[30%]">
                  <img
                    src={item.image.url}
                    alt="images"
                    className="w-16 h-20 md:w-36 md:h-48 hover:scale-105 transition-all cursor-pointer"
                  />
                </div>
                <div className="bg-slate-200 w-[70%] px-5 py-2 flex flex-col gap-2">
                  <div className="text-lg md:text-2xl font-base hover:text-orange-400 transition-all cursor-pointer">
                    {item.title}
                  </div>
                  <div className="text-lg md:text-md font-base ">
                    {item?.spec?.model}
                  </div>
                  <div className="flex flex-row items-center gap-1 text-sm md:text-md  px-2 py-1">
                    <div className="flex flex-row items-center">
                      <div className=" font-medium ">{item.rating}</div>
                      <MdOutlineStar className="text-orange-500 text-xl " />
                    </div>
                    <span className="text-md">Ratings & Reviews</span>
                  </div>
                  <div className="flex flex-row items-center">
                    <MdCurrencyRupee />
                    <div className="text-lg md:text-2xl font-semibold">
                      {item.price}
                    </div>
                  </div>
                  <div className="flex flex-row gap-1">
                    <FaTruck className="flex text-orange-500 text-2xl" />{" "}
                    <span className="font-medium">FREE</span> Delivery by
                    Shopify
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
}
