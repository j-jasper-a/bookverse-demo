"use client";

import { useUser } from "@/hooks/useUser";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  LogIcon as HistoryIcon,
  SignOutIcon as LogOutIcon,
  GearIcon as SettingsIcon,
  UserCircleIcon as UserIcon,
} from "@phosphor-icons/react";
import NextLink from "next/link";
import { useState } from "react";

export function AccountMenu() {
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleLogOut = () => {
  //   console.log("Logging out...");
  //   handleClose();
  // };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Avatar src={user?.avatarUrl} className="size-full">
          JJ
        </Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleClose}>
        <MenuItem
          component={NextLink}
          href="/user/profile"
          onClick={handleClose}
          disabled
        >
          <UserIcon size={"1rem"} />
          <Typography variant="body2" className="font-semibold">
            My Profile
          </Typography>
        </MenuItem>
        <MenuItem
          component={NextLink}
          href="/user/account"
          onClick={handleClose}
          disabled
        >
          <UserIcon size={"1rem"} />
          <Typography variant="body2" className="font-semibold">
            My Account
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          component={NextLink}
          href="/user/orders"
          onClick={handleClose}
          disabled
        >
          <HistoryIcon size={"1rem"} />
          <Typography variant="body2" className="font-semibold">
            Order History
          </Typography>
        </MenuItem>
        <MenuItem
          component={NextLink}
          href="/user/settings"
          onClick={handleClose}
          disabled
        >
          <SettingsIcon size={"1rem"} />
          <Typography variant="body2" className="font-semibold">
            Settings
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} disabled>
          <LogOutIcon size={"1rem"} />
          <Typography variant="body2" className="font-semibold">
            Log Out
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
