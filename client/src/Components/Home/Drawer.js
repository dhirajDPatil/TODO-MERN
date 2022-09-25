import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar } from '@mui/material';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { deleteUser, logoutTodo } from '../../api';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function RDrawer({user, logoutHandle}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
      logoutHandle();
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteUser = async () => {
    const res = prompt("Are you sure?, To Delete User: Enter User Name")
    if(res === user.uName ){
      await deleteUser();
      await logoutTodo();
      navigate('/login')
    }
  }

  return (
    <>
        {true && (
        <div>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
        >
            <Avatar alt={user.Name} src={user.profile} />
        </IconButton>
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleDeleteUser} >{`Delete `+ user.uName} <DeleteForeverIcon/> </MenuItem>
            <MenuItem onClick={handleLogout}>Logout <PowerSettingsNewOutlinedIcon /></MenuItem>
        </Menu>
        </div>
        )}
    </>
  );
}
