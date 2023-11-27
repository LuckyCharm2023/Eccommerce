import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import toast, { Toaster } from "react-hot-toast";
import Typography from "@mui/material/Typography";
import { loginUser } from "@/controller/auth";
import Link from "next/link";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";

export default function Login() {
  const [formDatas, setformDatas] = useState({
    email: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setformDatas({ ...formDatas, [name]: value });
  };
  const [hide, sethide] = useState(true);
  const inputField = [
    {
      label: "Email",
      name: "email",
      placeholder: "Email",
      onchange: handleOnchange,
      value: formDatas.email.toLowerCase() ? formDatas.email : "",
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
    await loginUser(formDatas).then((res) => {
      if (res.status === "ok") {
        setformDatas({
          email: "",
          password: "",
        });
        window.location.href = "/";
      }
    });
  };
  return (
    <div className="w-full min-h-screen flex bg-[#1b1b1b] items-center justify-center">
      <Toaster position="top-center" />
      <form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
          background: "#33333d",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0px 0px 1px 1px gray",
        }}
        onSubmit={handleSubmit(onSubmit)}
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
          Login
        </Typography>

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
          Login
        </Button>
        <Typography sx={{ fontFamily: "serif", color: "skyblue" }}>
          <Link href="/auth/register">Don't have account?</Link>
        </Typography>
      </form>
    </div>
  );
}
