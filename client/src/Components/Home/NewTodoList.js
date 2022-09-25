import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlined from '@mui/icons-material/ModeEditOutlined';
import {useSelector, useDispatch} from 'react-redux';
import { deleteT, markT, updateT } from '../../redux/action/todoActions';
import { Card, CardContent, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Tooltip from '@mui/material/Tooltip';

export default function CheckboxList() {
  const [open, setOpen] = useState(false);
  const [currtask, setCurrTask] = useState('');
  const [currPriority, setCurrPriority] = useState("0");
  const [currId, setCurrID] = useState(null);
  const [pr, setPr] = useState(1);
  const dispatch = useDispatch();
  const todos = useSelector((state)=> state.todo);

  const p0 = todos.filter((t)=> t.priority === 0);
  const p1 = todos.filter((t)=> t.priority === 1);
  const p2 = todos.filter((t)=> t.priority === 2);
  
  const priorityWiseTodo = [...p2, ...p1, ...p0]

  const datewiseSortTodo = todos.sort((a,b)=> {
    const aDateNumeric = new Date(a.creationTime).valueOf();
    const bDateNumeric = new Date(b.creationTime).valueOf();
    return aDateNumeric - bDateNumeric;
  }).reverse();
  


  const completeHandle = (value) => async () => {
    dispatch(markT(value._id));
  };

  const editHandle = (value) => async() => {
    setOpen(true);
    setCurrTask(value.task);
    setCurrPriority(String(value.priority))
    setCurrID(value._id);
  }

  const closeHandle = async () => {
    setOpen(false);
    dispatch(updateT(currId, {task: currtask, priority: currPriority}));
    setCurrID(null);
  }

  const deleteHandle = (value) => async() => {
    dispatch(deleteT(value._id));
  }

  const colorBar = (num, completed) => {
    if(completed){
      return "#48de48"
    } else{
      if(num === 0){
        return "#9feaf7"
      } else if(num === 1){
        return "#dff34f"
      } else if(num === 2){
        return "#ff8f8f"
      }
    }
  }

  const handlePriority = (e) => {
    const pvalue = Number(e.target.value)
    setCurrPriority(pvalue)
  }

  const arrayForMap = () => {
    if(pr===1){
      return datewiseSortTodo
    } if(pr===2){
      return priorityWiseTodo
    }
  }

  const handleChange = (e) => {
    setPr(e.target.value);
  }

  return (
    <>
      <FormControl sx={{ marginTop: 2 }}>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pr}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={1}>Date Wise</MenuItem>
          <MenuItem value={2}>Priority Wise</MenuItem>
        </Select>
      </FormControl>
      <div style={{display:'flex', justifyContent:'center' }}>
        <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', alignSelf: 'center', marginTop: '10px'}}>
          {arrayForMap().map((value,idx) => {
            const labelId = `checkbox-list-label-${value.id}`;
            return (
                <ListItem
                  key={value._id}
                  sx={{ backgroundColor: `${colorBar(value.priority, value.isCompleted)}`, marginBottom: '5px' }}
                  secondaryAction={
                    <>
                      <Tooltip title="Edit Task">
                        <IconButton onClick={editHandle(value)} edge="start" aria-label="comments">
                          <ModeEditOutlined/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Task">
                        <IconButton onClick={deleteHandle(value)} edge="end" aria-label="comments">
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Tooltip>
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
                    <ListItemText sx={{color: value.isCompleted ? 'green': 'black'}} id={labelId} primary={`${idx+1+". "} ${value.task}`} />
                  </ListItemButton>
                  <Modal open={open} onClose={closeHandle} >
                    <Box display={'flex'} justifyContent={'center'} marginTop='200px' >
                      <Card elevation={2} style={{minWidth:'80%', margin:'0 auto', color: '#460080'}}>
                        <Typography align='center' textTransform='uppercase' gutterBottom variant='h4' fontWeight={600} style={{ marginTop:'10px', wordSpacing: '15px' }}>Edit Todo</Typography>
                        <CardContent sx={{paddingTop: '0px' }} >
                          <RadioGroup
                            sx={{ display: 'flex', justifyContent: 'center' , paddingBottom: '15px' }}
                            onChange={handlePriority}
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={currPriority}
                            name="radio-buttons-group"
                            row
                          >
                            <FormControlLabel value="0" control={<Radio sx={{ color: 'blue', '&.Mui-checked': { color: 'blue' }}} />} label="Low" sx={{color:'blue'}} />
                            <FormControlLabel value="1" control={<Radio sx={{ color: 'orange', '&.Mui-checked': { color: 'orange' }}} />} label="Medium" sx={{color:'orange'}} />
                            <FormControlLabel value="2" control={<Radio sx={{ color: 'red', '&.Mui-checked': { color: 'red' }}} />} label="High" sx={{color:'red'}} />
                          </RadioGroup>
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
    </>
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