import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import { loginUser, userDatas } from "@/controller/auth";
import Link from "next/link";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function LoginModal({ open, close }) {
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
  const router = useRouter();
  const onSubmit = async () => {
    await loginUser(formDatas).then((res) => {
      if (res.status === "ok") {
        setformDatas({
          email: "",
          password: "",
        });
        router.push("/");
        handleClose();
      }
    });
  };
  const handleClose = () => {
    close(false);
  };
  return (
    <Modal
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={open}
      onClose={handleClose}
    >
      <form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "10px",
          position: "relative",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography fontSize="large" fontWeight="bold">
          User Login
        </Typography>
        <IconButton
          sx={{ position: "absolute", right: 0, top: 0 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
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
        <Link href="/auth/register">Don't have account?</Link>
      </form>
    </Modal>
  );
}
