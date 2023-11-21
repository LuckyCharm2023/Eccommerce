import { product_Api } from "@/utils/api";
import toast from "react-hot-toast";

export const createProducts = async (data) => {
  try {
    const response = await fetch(product_Api + "/createProducts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    console.log(response, "Product Added");
    if (response.status === "ok") {
      toast.success("Products Added Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllProducts = async () => {
  try {
    const response = await fetch(product_Api + "/getProducts", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    console.log(response.data, "AllProduct");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getProductByID = async (id) => {
  try {
    const response = await fetch(product_Api + `/getProducts/${id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    console.log(response.data, "Particular Product");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
