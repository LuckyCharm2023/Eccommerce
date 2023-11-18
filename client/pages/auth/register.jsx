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

export default function Register() {
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
    if (imgSize > 50000) {
      toast.error("Image Size should be below 50kb");
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
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Email",
      onchange: handleOnchange,
      value: formDatas.email ? formDatas.email : "",
      required: "Email is required",
      type: "text",
      isErr: errors.email,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Password",
      onchange: handleOnchange,
      value: formDatas.password ? formDatas.password : "",
      required: "Password is required",
      type: "password",
      isErr: errors.password,
    },
  ];
  const onSubmit = async () => {
    console.log(errors, "ERR");
    console.log(formDatas, "Form");
    await registerUser(formDatas);
    setformDatas({
      email: "",
      password: "",
      uname: "",
      userType: "",
      image: "",
    });
  };
  return (
    <Container
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Toaster position="top-center" />
      <form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {formDatas.image ? (
            <img
              style={{ position: "relative" }}
              alt="loading..."
              src={formDatas.image}
            />
          ) : (
            <Image
              alt="loading..."
              src={require("../../public/image/dp.jpg")}
              priority
            />
          )}

          <input type="file" onChange={handleImageUpload} accept="image/" />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="p" color="initial">
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
        </Box>
        {inputField.map((elem, index) => {
          return (
            <div key={index}>
              <TextField
                sx={{ width: "300px" }}
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
            </div>
          );
        })}

        <Button
          sx={{
            "&.MuiButtonBase-root": {
              backgroundColor: "indigo",
            },
          }}
          variant="contained"
          type="submit"
        >
          Create account
        </Button>
      </form>
    </Container>
  );
}
