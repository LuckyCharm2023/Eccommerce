import toast from "react-hot-toast";

export const createComment = async (data) => {
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
export const getComments = async (productID) => {
  try {
    const response = await fetch(
      `http://localhost:4000/comment/getComments/${productID}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    ).then((res) => res.json());
    console.log(response.data, "AllComments");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateComments = async (id, data) => {
  try {
    const response = await fetch(
      `http://localhost:4000/comment/updateComment/${id}`,
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());
    console.log(response.status, "Updated");

    if (response.status == "ok") {
      toast.success("Updated Successfully");
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const deleteComments = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:4000/comment/deleteComment/${id}`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    ).then((res) => res.json());
    console.log(response.ststus, "Deleted");
    if (response.status == "ok") {
      toast.success("Deleted Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};
