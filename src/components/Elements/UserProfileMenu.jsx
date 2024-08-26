import React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const UserProfileMenu = ({ profileOpen, anchorEl, handleClose, handleLogout }) => {
  return (
    <Menu
      id="profile-menu"
      anchorEl={anchorEl}
      open={profileOpen}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
};

export default UserProfileMenu;
