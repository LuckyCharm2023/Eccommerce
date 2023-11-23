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
  const inputField = [
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
    await loginUser(formDatas).then((res) => {
      if (res.status === "ok") {
        setformDatas({
          email: "",
          password: "",
        });
        window.location.href = "/userDetails";
      }
    });
  };
  return (
    <div className="w-full min-h-screen items-center justify-center">
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
        <Typography
          variant="p"
          color="initial"
          sx={{ fontFamily: "serif", fontWeight: "600", fontSize: "25px" }}
        >
          Login
        </Typography>
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
          Login
        </Button>
        <Typography sx={{ fontFamily: "serif" }}>
          <Link href="/auth/register">Don't have account?</Link>
        </Typography>
      </form>
    </div>
  );
}