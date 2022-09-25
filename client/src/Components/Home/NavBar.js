import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import AccountMenu from './AccountMenu';

export default function NavBar({user, logoutHandle}) {
    const navigate = useNavigate();
    const addNewHandler = () => {
      navigate('./newtodo', {replace: true})
    }
    
  useEffect(()=> {
    navigate('./alltodos', {replace: true})
  },[user])  // remove navigate dependency -removed

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between'}} >
          <IconButton onClick={addNewHandler} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <AddCircleIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div" textTransform={ 'uppercase' }>
            All Tasks
          </Typography>
          {/* <RDrawer user={user} logoutHandle={logoutHandle} /> */}
          <AccountMenu user={user} logoutHandle={logoutHandle} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
