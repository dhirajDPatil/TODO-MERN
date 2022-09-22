import React, { useState } from 'react'
import { Button, Card, CardContent, Grid, TextField, Typography} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAllTodo } from '../../redux/action/todoActions';
import { useNavigate } from 'react-router-dom';

const NewTodo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [todo, setTodo] = useState({
        task: '',
        isCompleted : false
    })
    // console.log(user)
    const addTodoHandle = async () => {
        const user = JSON.parse(localStorage.getItem('newUser'));
        if(todo.task === ''){
            // required
            return;
        }
        await axios.post('http://localhost:8000/home/newtodo',todo, {
            headers : {
                'x-username' : user.userName,
                'x-password': user.password
            }
        });
        const res = await axios.get('http://localhost:8000/home/alltodos', {
            headers : {
                'x-username' : user.userName,
                'x-password': user.password
              }
        });
        dispatch(getAllTodo (res.data));
        setTodo({
            task: '',
            isCompleted : false
        })
        navigate('../alltodos', {replace: true});
    }

    const clearHandle = () => {
        setTodo({
            task: '',
            isCompleted : false
        })
    }

  return (
    <>
        <Box sx={{flexGrow: 1, top:'200px', marginTop: 10}}>
              <Card elevation={2}  style={{maxWidth:750, margin:'0 auto'}}>
                  <Typography align='center' textTransform='uppercase' gutterBottom variant='h5' fontWeight={600} style={{ marginTop:'15px' }}>Enter Todo</Typography>
                  <CardContent>
                      <Grid container spacing={1}>
                          <Grid xs={12} item>
                              <TextField label='Todo' value={todo.task} onChange={(e)=> setTodo((p)=> ({...todo, task: e.target.value}))} placeholder="Enter todo task here" variant='outlined' fullWidth />
                          </Grid>
                          <Grid container spacing={2} item>
                              <Grid item xs={6}>
                                <Button  variant='contained' color='primary' size='small' onClick={addTodoHandle} sx={{ height:'40px', marginBottom: '5px', marginTop: '5px'}} fullWidth >Add Todo</Button>
                              </Grid>
                              <Grid item xs={6}>
                                <Button  variant='contained' color='secondary' size='small' onClick={clearHandle} sx={{ height:'40px', marginBottom: '5px', marginTop: '5px'}} fullWidth >Clear</Button>
                              </Grid>
                          </Grid>
                      </Grid>
                  </CardContent>
              </Card>
          </Box>
    </>
  )
}

export default NewTodo