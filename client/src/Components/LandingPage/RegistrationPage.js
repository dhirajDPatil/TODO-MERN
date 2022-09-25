import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Grid, TextField, Typography} from '@mui/material';
import { Box } from '@mui/system';
import { logoutTodo, singUpTodo } from '../../api';
import FileBase from 'react-file-base64';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userName: '',
        userID : '',
        password: ''
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        await logoutTodo();
        await singUpTodo(user)
        navigate('/home', {replace: true});
        // const uinfo = {
        //     userName: user.userName,
        //     userID: user.userID,
        //     password: user.password
        // }
        // localStorage.setItem('newUser',JSON.stringify({userName: user.userName, password: user.password}));
        // success
        // const res = await axios.post('http://localhost:8000/signup', uinfo, {
        //     withCredentials: true
        // });
        // api call to register a new user 
        // navigate to home page with 
    }

    const clearHandle = () => {
        setUser({
            userName: '',
            userID : '',
            password: ''
        })
    } 

  return (
    <>
        <form onSubmit={submitHandler}>
            <Box sx={{flexGrow: 1, top:'200px'}}>
                <Card elevation={2}  style={{maxWidth:750, margin:'0 auto'}}>
                    <Typography align='center' textTransform='uppercase' gutterBottom variant='h5' fontWeight={400} style={{ marginTop:'10px' }} >Registration Page</Typography>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid xs={12} item>
                                <TextField label='User Name' value={user.userName} onChange={(e)=> setUser(()=> ({...user, userName: e.target.value}))} placeholder="Enter User Name" variant='outlined' fullWidth />
                            </Grid> 
                            <Grid xs={12} item>
                                <TextField label='Password' type='password' value={user.password} onChange={(e)=> setUser(()=> ({...user, password: e.target.value}))} placeholder="Enter Password" variant='outlined' hidden fullWidth/>
                            </Grid>
                            <Grid xs={12} item>
                                <Typography> Select Profile Picture 
                                    <FileBase type='file' multiple={false} onDone={({base64}) => setUser({...user, userID: base64})} />
                                </Typography>
                            </Grid>
                            <Grid xs={12} columnSpacing={2} rowSpacing={1} style={{display:'flex', justifyContent: 'center', flexDirection: 'column' }} item>
                                <Button type='submit' variant='contained' color='primary' size='small' sx={{ marginBottom: '5px', marginTop: '10px'}}  >Register</Button>
                                <Button variant='contained' color='secondary' size='small' onClick={clearHandle} sx={{ marginBottom: '5px', marginTop: '5px'}}  >Clear</Button>
                            </Grid> 
                            <Grid xs={12} item>
                                <Button >
                                    <Link to='/login'>Existing User</Link>
                                </Button>
                            </Grid> 
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
    
        </form>
    </>
  )
}

export default RegistrationPage