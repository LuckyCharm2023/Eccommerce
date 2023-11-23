import { Skeleton } from "@mui/material";
import React from "react";

export default function SkeletonCard() {
  return (
    <div className="p-5 flex flex-row items-center gap-5  bg-slate-200 md:rounded-xl ">
      <Skeleton
        variant="rectangular"
        sx={{ height: "250px", width: "30%", borderRadius: "10px" }}
      />
      <div className="w-[70%] h-[100%] flex flex-col justify-between gap-2">
        <Skeleton className="text-lg md:text-2xl  font-medium " />
        <Skeleton className="text-lg md:text-2xl  font-medium " />
        <Skeleton className="text-lg md:text-2xl  font-medium " />
        <Skeleton className="text-lg md:text-2xl  font-medium " />
        <Skeleton className="text-lg md:text-2xl  font-medium " />
      </div>
    </div>
  );
}
