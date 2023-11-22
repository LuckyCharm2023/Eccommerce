import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function SpecsDatasModal({
  specsDatas,
  setspecsDatas,
  open,
  close,
}) {
  const [errStatus, seterrStatus] = useState({
    ram: false,
    storage: false,
    frontCam: false,
    rearCam: false,
    model: false,
  });

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setspecsDatas({
      ...specsDatas,
      spec: { ...specsDatas.spec, [name]: value },
    });
    if (name == "ram") {
      if (value) {
        errors.ram = false;
        seterrStatus({ ...errStatus, ram: false });
      } else {
        errors.ram = true;
        seterrStatus({ ...errStatus, ram: true });
      }
    }
    if (name == "storage") {
      if (value) {
        errors.storage = false;
        seterrStatus({ ...errStatus, storage: false });
      } else {
        errors.storage = true;
        seterrStatus({ ...errStatus, storage: true });
      }
    }
    if (name == "frontCam") {
      if (value) {
        errors.frontCam = false;
        seterrStatus({ ...errStatus, frontCam: false });
      } else {
        errors.frontCam = true;
        seterrStatus({ ...errStatus, frontCam: true });
      }
    }
    if (name == "rearCam") {
      if (value) {
        errors.rearCam = false;
        seterrStatus({ ...errStatus, rearCam: false });
      } else {
        errors.rearCam = true;
        seterrStatus({ ...errStatus, rearCam: true });
      }
    }
    if (name == "model") {
      if (value) {
        errors.model = false;
        seterrStatus({ ...errStatus, model: false });
      } else {
        errors.model = true;
        seterrStatus({ ...errStatus, model: true });
      }
    }
  };
  const handleClose = () => {
    close(false);
    errors.ram = false;
    errors.storage = false;
    errors.frontCam = false;
    errors.rearCam = false;
    errors.model = false;
  };
  const { ram, storage, frontCam, rearCam } = specsDatas.spec;
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();
  const onSubmit = async () => {
    handleClose();
  };
  const specsInputField = [
    {
      label: "Ram",
      name: "ram",
      placeholder: "Ram",
      onchange: handleOnchange,
      value: specsDatas.spec.ram ? specsDatas.spec.ram : "",
      required: "Ram is required",
      type: "number",
      isErr: errors.ram,
      isStateErr: errStatus.ram,
    },
    {
      label: "Storage",
      name: "storage",
      placeholder: "Storage",
      onchange: handleOnchange,
      value: specsDatas.spec.storage ? specsDatas.spec.storage : "",
      required: "Storage is required",
      type: "number",
      isErr: errors.storage,
      isStateErr: errStatus.storage,
    },
    {
      label: "FrontCam",
      name: "frontCam",
      placeholder: "FrontCam",
      onchange: handleOnchange,
      value: specsDatas.spec.frontCam ? specsDatas.spec.frontCam : "",
      required: "FrontCam is required",
      type: "text",
      isErr: errors.frontCam,
      isStateErr: errStatus.frontCam,
    },
    {
      label: "RearCam",
      name: "rearCam",
      placeholder: "RearCam",
      onchange: handleOnchange,
      value: specsDatas.spec.rearCam ? specsDatas.spec.rearCam : "",
      required: "RearCam is required",
      type: "text",
      isErr: errors.rearCam,
      isStateErr: errStatus.rearCam,
    },
    {
      label: "Model",
      name: "model",
      placeholder: "Model",
      onchange: handleOnchange,
      value: specsDatas.spec.model ? specsDatas.spec.model : "",
      required: "Model is required",
      type: "text",
      isErr: errors.model,
      isStateErr: errStatus.model,
    },
    {
      label: "Display",
      name: "display",
      placeholder: "Display",
      onchange: handleOnchange,
      value: specsDatas.spec.display ? specsDatas.spec.display : "",
      required: "Display is required",
      type: "text",
      isErr: errors.display,
      isStateErr: errStatus.display,
    },
    {
      label: "Processer",
      name: "processer",
      placeholder: "Processer",
      onchange: handleOnchange,
      value: specsDatas.spec.processer ? specsDatas.spec.processer : "",
      required: "Processer is required",
      type: "text",
      isErr: errors.processer,
      isStateErr: errStatus.processer,
    },
    {
      label: "Battery",
      name: "battery",
      placeholder: "Battery",
      onchange: handleOnchange,
      value: specsDatas.spec.battery ? specsDatas.spec.battery : "",
      required: "Battery is required",
      type: "text",
      isErr: errors.battery,
      isStateErr: errStatus.battery,
    },
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
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
          maxHeight: "500px",
          overflowY: "scroll",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography>Add Specifications</Typography>
        <IconButton
          sx={{ position: "absolute", right: 0, top: 0 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        {specsInputField.map((elem, index) => {
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

              {(elem.isErr || elem.isStateErr) && (
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
          Add
        </Button>
      </form>
    </Modal>
  );
}
