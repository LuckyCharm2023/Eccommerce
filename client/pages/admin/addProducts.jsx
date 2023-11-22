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
import SpecsDatasModal from "@/components/admin/SpecsDatasModel";
import { createProducts } from "@/controller/products";
import { Gradient } from "@mui/icons-material";
import { IoImagesSharp } from "react-icons/io5";

export default function AddProducts() {
  const [specsDatas, setspecsDatas] = useState({
    ram: 0,
    storage: 0,
    frontCam: 0,
    rearCam: 0,
    model: "",
    display: "",
    processer: "",
    battery: "",
  });
  const [formDatas, setformDatas] = useState({
    image: "",
    title: "",
    price: "",
    description: "",
    spec: { ram: 0, storage: 0, frontCam: 0, rearCam: 0, model: "" },
    rating: 0,
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
      label: "Title",
      name: "title",
      placeholder: "Title",
      onchange: handleOnchange,
      value: formDatas.title ? formDatas.title : "",
      required: "Title is required",
      type: "text",
      isErr: errors.title,
    },
    {
      label: "Price",
      name: "price",
      placeholder: "Price",
      onchange: handleOnchange,
      value: formDatas.price ? formDatas.price : "",
      required: "Price is required",
      type: "number",
      isErr: errors.price,
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Description",
      onchange: handleOnchange,
      value: formDatas.description ? formDatas.description : "",
      required: "Description is required",
      type: "text",
      isErr: errors.description,
    },
    {
      label: "Rating",
      name: "rating",
      placeholder: "Rating",
      onchange: handleOnchange,
      value: formDatas.rating ? formDatas.rating : "",
      required: "Rating is required",
      type: "number",
      isErr: errors.rating,
    },
  ];

  const onSubmit = async () => {
    await createProducts(formDatas);
    setformDatas({
      image: "",
      title: "",
      price: "",
      description: "",
      spec: {
        ram: 0,
        storage: 0,
        frontCam: 0,
        rearCam: 0,
        model: "",
        display: "",
        processer: "",
        battery: "",
      },
      rating: 0,
    });
  };
  const [specsErr, setspecsErr] = useState(false);
  const [open, setopen] = useState(false);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right ,#f09f53a2, #6bf3f8a6 )",
      }}
    >
      <SpecsDatasModal
        open={open}
        close={setopen}
        specsDatas={formDatas}
        setspecsDatas={setformDatas}
      />
      <Toaster position="top-center" />
      <form
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "30px",
          // background:"green",
          padding: "10px",
        }}
        className="flex flex-col md:flex-row"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            borderRadius: "20px",
          }}
        >
          {formDatas.image ? (
            <img
              style={{ position: "relative" }}
              alt="loading..."
              src={formDatas.image}
              className="w-40 p-5 "
            />
          ) : (
            <IoImagesSharp className="text-9xl text-slate-400 h-52" />
          )}

          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/"
            className="p-5"
          />
        </Box>

        <Box
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
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
            onClick={() => {
              setopen(true);
            }}
            variant="outlined"
          >
            Add Specifications
          </Button>
          {specsErr && (
            <FormHelperText sx={{ color: "red" }}>
              Specification is required
            </FormHelperText>
          )}
          <Button
            sx={{
              "&.MuiButtonBase-root": {
                backgroundColor: "indigo",
              },
            }}
            variant="contained"
            type="submit"
            onClick={() => {
              if (formDatas.spec.model == "") {
                setspecsErr(true);
              } else {
                setspecsErr(false);
              }
            }}
          >
            Create
          </Button>
        </Box>
      </form>
    </Box>
  );
}
