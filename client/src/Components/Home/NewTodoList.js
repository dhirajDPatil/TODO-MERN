import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { getAllTodo } from '../../redux/action/todoActions';
import { Card, CardContent, Grid, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function CheckboxList() {
  // const [checked, setChecked] = useState([0]);
  const [open, setOpen] = useState(false);
  const [currtask, setCurrTask] = useState('');
  const [currId, setCurrID] = useState(null);
  // const [currUser, setCurrUser] = useState(null);
  const dispatch = useDispatch();
  const todos = useSelector((state)=> state.todo);
  const user = JSON.parse(localStorage.getItem('newUser'));

  const completeHandle = (value) => async () => {
    // const user = JSON.parse(localStorage.getItem('newUser'));
    console.log(user);
    const res1 = await axios.patch(`http://localhost:8000/home/alltodos/${value._id}/markcomplete`, 
    {}, {
      headers: {
        'x-username' : user.userName,
        'x-password': user.password
      }
    });
    console.log(res1);
    const res = await axios.get(`http://localhost:8000/home/alltodos`, {
      headers : {
        'x-username' : user.userName,
        'x-password': user.password
      }
    });
    dispatch(getAllTodo(res.data));
  };

  const editHandle = (value) => async() => {
    console.log(value);
    setOpen(true);
    setCurrTask(value.task);
    setCurrID(value._id);
  }

  const closeHandle = async () => {
    setOpen(false);
    await axios.patch(`http://localhost:8000/home/alltodos/${currId}/updatetodo`, {task: currtask}, {
      headers : {
        'x-username' : user.userName,
        'x-password': user.password
      }
    });
    const res = await axios.get(`http://localhost:8000/home/alltodos`, {
      headers : {
        'x-username' : user.userName,
        'x-password': user.password
      }
    });
    dispatch(getAllTodo(res.data));
    setCurrID(null);
  }
  const deleteHandle = (value) => async() => {
    // setCurrID(value._id);
    const res = await axios.delete(`http://localhost:8000/home/alltodos/${value._id}/deletetodo`, {
      headers : {
        'x-username' : user.userName,
        'x-password': user.password
      }
    });
    const res1 = await axios.get(`http://localhost:8000/home/alltodos`, {
      headers : {
        'x-username' : user.userName,
        'x-password': user.password
      }
    });
    dispatch(getAllTodo(res1.data));
    // setOpen(true);
  }

  useEffect(() => {
    const fetchTodo = async () => { 
      // const user = JSON.parse(localStorage.getItem('newUser'));
      const res = await axios.get('http://localhost:8000/home/alltodos', 
      { 
          headers : {
            'x-username' : user.userName,
            'x-password': user.password
          }
      });
      dispatch(getAllTodo(res.data));
      console.log(res.data);
    }
    fetchTodo();
  },[])

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', alignSelf: 'center', marginTop: '10px'}}>
        {todos.map((value,idx) => {
          const labelId = `checkbox-list-label-${value.id}`;

          return (
              <ListItem
                key={value._id}
                secondaryAction={
                  <>
                    <IconButton onClick={editHandle(value)} edge="start" aria-label="comments">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={deleteHandle(value)} edge="end" aria-label="comments">
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={completeHandle(value)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value.isCompleted}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${idx+1+". "} ${value.task}`} />
                </ListItemButton>
                <Modal open={open} onClose={closeHandle}>
                  <Box display={'flex'} justifyContent={'center'} marginTop='200px' >
                    <Card elevation={2} style={{minWidth:'80%', margin:'0 auto'}}>
                      <Typography align='center' textTransform='uppercase' gutterBottom variant='h5' fontWeight={400} style={{ marginTop:'10px' }}>Edit Todo</Typography>
                      <CardContent>
                          <Grid container spacing={1}>
                              <Grid xs={12} item>
                                  <TextField label='Todo' value={currtask} onChange={(e)=> setCurrTask(e.target.value)} placeholder="Enter new todo" variant='outlined' fullWidth />
                              </Grid> 
                          </Grid>
                      </CardContent>
                    </Card>
                  </Box>
                </Modal>
              </ListItem>
          );
        })}
      </List>
    </div>
  );
}















// import React from 'react'
// import {useSelector} from 'react-redux';

// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import { Button, Card, CardContent, Grid, TextField, Typography} from '@mui/material';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'start',
//   color: theme.palette.text.secondary,
//   width: '100%',
// }));

// const NewTodoList = () => {
//   const todos = useSelector((state)=> state.todo);

//   return (
//     <>
//       <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
//         <Card>

//         </Card>
//         <Stack spacing={2} sx={{marginTop: '10px', maxWidth: '800px'}}>
//           {todos.length === 0 ? <></>: todos.slice(0,10).map((t, idx) => {
//             return (<Item key={t.id}>
//               <div style={{display: 'flex', justifyContent: 'space-between'}}>
//                 <div style={{alignSelf:'center'}} >{idx+1+". "+t.title}</div>
//                 <div style={{minWidth:'100px'}}>
//                   <IconButton><EditIcon/></IconButton>
//                   <IconButton><DeleteIcon/></IconButton>
//                 </div>
//               </div>
//             </Item>)
//           })}
//         </Stack>
//       </Box>
//     </>
//   )
// }

// export default NewTodoList