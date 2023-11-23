import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Cookies from "js-cookie";
import { KeyboardArrowDown } from "@mui/icons-material";
import { logout } from "@/controller/auth";
import Image from "next/image";
import { Anton } from "next/font/google";
import Profile from "@/pages/auth/profile";
import { Avatar, Typography } from "@mui/material";
import toast from "react-hot-toast";
const inter = Anton({ subsets: ["latin"], weight: ["400"] });

export default function TopBar({ auth, userData }) {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        "& .MuiPaper-root": {
          width: "115px",
          marginTop: "10px",
        },
      }}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem
        onClick={() => {
          logout();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ width: "100%", position: "sticky", top: "0px", zIndex: "1111" }}>
      <AppBar position="sticky">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div className="flex flex-row m-2 bg-white px-2 md:px-8 rounded-md md:rounded-lg items-center font-medium text-md md:text-xl text-gray-500  ">
            <Image
              src={require("../src/assests/logo.png")}
              className="w-10 md:w-11  py-1 "
              alt="loading..."
            />
            <div className={inter.className}>
              <span>Shopify</span>
            </div>
          </div>
          <Box>
            <IconButton
              onClick={() => {
                toast.error("COMMING SOON...");
              }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <ShoppingCartIcon />
            </IconButton>

            {auth ? (
              <Button
                title={userData ? userData.uname : "Username"}
                sx={{
                  padding: "5px",
                }}
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => {
                  setOpen(true);
                }}
                color="inherit"
                endIcon={<KeyboardArrowDown />}
                variant="outlined"
                startIcon={
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      boxShadow: "1px 1px 1px 1px gray",
                    }}
                    src={userData?.image?.url}
                  />
                }
              >
                <Typography
                  sx={{
                    overflow: "hidden",
                    maxWidth: "70px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  fontSize="10px"
                >
                  {userData ? userData.uname : "Username"}
                </Typography>
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={() => {
                  router.push("/auth/login");
                }}
              >
                Login
              </Button>
            )}
          </Box>
          <>{open && <Profile open={open} setOpen={setOpen} />}</>

          {renderMenu}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
