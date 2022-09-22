import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function NavBar() {
    const navigate = useNavigate();
    const username = JSON.parse(localStorage.getItem('newUser')).userName;
    const addNewHandler = () => {
        navigate('./newtodo', {replace: true})
    }

    const allTodoHandler = () => {
        navigate('./alltodos', {replace: true})
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between'}} >
          <IconButton onClick={addNewHandler} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <AddCircleIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div" textTransform={ 'uppercase' }>
            Personal Todos of {username}
          </Typography>
          <IconButton onClick={allTodoHandler} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <FormatListBulletedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
