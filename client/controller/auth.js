import toast from "react-hot-toast";

export const registerUser = async (data) => {
  try {
    const response = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    console.log(response, "User Registered");
    if (response.status === "ok") {
      toast.success("User Registered Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};
