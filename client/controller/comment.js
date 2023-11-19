import toast from "react-hot-toast";

export const createProducts = async (data) => {
  try {
    const response = await fetch(
      "http://localhost:4000/comment/createComment",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());
    console.log(response, "Comment Added");
    if (response.status === "ok") {
      toast.success("Comment Added Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllProducts = async () => {
  try {
    const response = await fetch("http://localhost:4000/comment/getComments", {
      method: "POST",
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
