import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { registerUser } from "@/controller/auth";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";

export default function Register() {
  const [hide, sethide] = useState(true);

  const [formDatas, setformDatas] = useState({
    email: "",
    password: "",
    uname: "",
    userType: "user",
    image: "",
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();
  const [glower, setglower] = useState("");
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imgSize = file?.size;
    if (imgSize > 70000) {
      toast.error("Image Size should be below 70kb");
      setglower("fileRed");
    } else {
      setglower("");
    }

    TransformFile(file);
  };
  const TransformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setformDatas({ ...formDatas, image: reader.result });
      };
    } else {
      setformDatas({ ...formDatas, image: "" });
    }
  };

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setformDatas({ ...formDatas, [name]: value });
  };
  const inputField = [
    {
      label: "Username",
      name: "uname",
      placeholder: "Username",
      onchange: handleOnchange,
      value: formDatas.uname ? formDatas.uname : "",
      required: "Username is required",
      type: "text",
      isErr: errors.uname,
      icon: false,
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Email",
      onchange: handleOnchange,
      value: formDatas.email ? formDatas.email.toLowerCase() : "",
      required: "Email is required",
      type: "text",
      isErr: errors.email,
      icon: false,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Password",
      onchange: handleOnchange,
      value: formDatas.password ? formDatas.password : "",
      required: "Password is required",
      type: hide ? "password" : "text",
      isErr: errors.password,
      icon: true,
    },
  ];
  const onSubmit = async () => {
    // console.log(errors, "ERR");
    // console.log(formDatas, "Form");
    await registerUser(formDatas);
    setformDatas({
      email: "",
      password: "",
      uname: "",
      userType: "user",
      image: "",
    });
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#1b1b1b",
        // background: "linear-gradient(to right, #fe6b8b,  #ff8e53)",
      }}
    >
      <Toaster position="top-center" />
      <form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px",
          background: "#33333d",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0px 0px 1px 1px gray",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Typography
            variant="p"
            sx={{
              color: "skyblue",
              fontFamily: "serif",
              fontWeight: "600",
              fontSize: "25px",
            }}
          >
            Create Account
          </Typography>
          {formDatas.image ? (
            <img
              style={{
                position: "relative",
                borderRadius: "50%",
                objectFit: "cover",
                height: "124px",
                width: "124px",
              }}
              alt="loading..."
              src={formDatas.image}
            />
          ) : (
            <div>
              <FaUserCircle className="text-9xl text-neutral-300 " />
            </div>
          )}

          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/"
            style={{ color: "lightblue" }}
          />
        </Box>
        {/* <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Typography variant="p" color="initial" sx={{ fontFamily: "serif" }}>
            Register as :
          </Typography>
          <TextField
            {...register("userType", {
              required: !formDatas.userType ? "UserType is Required" : false,
            })}
            name="userType"
            value="admin"
            onChange={handleOnchange}
            type="radio"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
          <Typography sx={{ fontFamily: "serif" }}>Admin</Typography>
        </Box> */}
        {inputField.map((elem, index) => {
          return (
            <div key={index} style={{ position: "relative" }}>
              <TextField
                sx={{
                  width: "300px",
                  "& fieldset": {
                    borderColor: "skyblue",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    borderColor: "lightblue",
                  },
                  "&:hover .MuiInputLabel-root": {
                    color: "lightblue",
                  },
                  " & .MuiInputLabel-root": {
                    color: "skyblue",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "lightblue",
                  },
                  "&:not(.Mui-focused)": {
                    backgroundColor: "transparent", // Set the background color when not focused
                  },
                }}
                {...register(elem.name, {
                  required: !elem.value ? elem.required : false,
                })}
                name={elem.name}
                label={elem.label}
                value={elem.value}
                onChange={elem.onchange}
                type={elem.type}
              />
              {elem.isErr && (
                <FormHelperText sx={{ color: "red" }}>
                  {elem.required}
                </FormHelperText>
              )}
              {elem.icon && (
                <IconButton
                  onClick={() => {
                    sethide((p) => !p);
                  }}
                  sx={{ position: "absolute", right: 0, top: 6 }}
                >
                  {hide ? (
                    <VisibilityOffIcon color="primary" />
                  ) : (
                    <Visibility color="primary" />
                  )}
                </IconButton>
              )}
            </div>
          );
        })}

        <Button
          sx={{
            "&.MuiButtonBase-root": {
              backgroundColor: "lightblue",
              color: "black",
            },
          }}
          variant="contained"
          type="submit"
        >
          Create account
        </Button>
        <Typography sx={{ fontFamily: "serif", color: "skyblue" }}>
          <Link href="/auth/login">Already have account?</Link>
        </Typography>
      </form>
    </Box>
  );
}
