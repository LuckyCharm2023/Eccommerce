import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Cookies from "js-cookie";
import { KeyboardArrowDown } from "@mui/icons-material";
import { logout } from "@/controller/auth";
import Image from "next/image";
import { Anton } from "next/font/google";
import Profile from "@/pages/auth/profile";
const inter = Anton({ subsets: ["latin"], weight: ["400"] });

export default function TopBar() {
  const router = useRouter();
  const data = Cookies.get("userData");
  const userData = data ? JSON.parse(data) : null;
  // console.log(userData, "ERR");
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
            />
            <div className={inter.className}>Shopify</div>
          </div>
          <Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <ShoppingCartIcon />
            </IconButton>

            {userData ? (
              <Button
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => {
                  setOpen(true);
                }}
                color="inherit"
                startIcon={
                  <Avatar
                    sx={{
                      width: 35,
                      height: 35,
                      backgroundColor: "#fff",
                      padding: "3px",
                    }}
                    src={userData?.image?.url}
                  />
                }
                endIcon={<KeyboardArrowDown />}
                variant="outlined"
              >
                {userData?.uname}
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
          {open && <Profile open={open} setOpen={setOpen} />}

          {renderMenu}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
