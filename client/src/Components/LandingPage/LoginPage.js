import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Card, CardContent, Grid, Stack, TextField, Typography} from '@mui/material';
import { Box } from '@mui/system';
import './LoginPage.css'
import { loginTodo } from '../../api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName : '',
    password: ''
  });
  const [loginError, setLoginError] = useState(undefined);
  
  const loginHandle = async (e) => {
      e.preventDefault();
      loginTodo(user)
      .then((response) => {
        navigate('/home', {replace: true});
      }).catch((res) => {
        const err = res.response.data.error;
        setLoginError(err)
        console.log(err);
      })
      
  }

  const clearHandle = () => {
    setUser({
      userName:'',
      password: ''
    })
  }

  return (
    <>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="info">No User logged In</Alert>
          {/* <Alert severity="error">This is an error alert — check it out!</Alert>
          <Alert severity="warning">This is a warning alert — check it out!</Alert>
          <Alert severity="success">This is a success alert — check it out!</Alert> */}
        </Stack>
        <div className='formcontainer'> 
          <form onSubmit={loginHandle}>
          <Box sx={{flexGrow: 1, top:'200px'}}>
              <Card elevation={2}  style={{maxWidth:750, margin:'0 auto'}}>
                  <Typography align='center' textTransform='uppercase' gutterBottom variant='h5' fontWeight={400} style={{ marginTop:'10px' }}>Login Page</Typography>
                  <CardContent>
                      <Grid container spacing={1}>
                          <Grid xs={12} item>
                              <TextField label='User Name' value={user.userName} onChange={(e)=> setUser({...user, userName: e.target.value})} placeholder="Enter User Name" variant='outlined' fullWidth />
                          </Grid> 
                          <Grid xs={12} item>
                              <TextField label='Password' type='password' value={user.password} onChange={(e)=> setUser({...user, password:e.target.value})} placeholder="Enter Creator's Name" variant='outlined' hidden fullWidth/>
                          </Grid> 
                          {loginError && <Grid xs={12} item>
                              <Typography color='red' >{loginError}</Typography>
                          </Grid>} 
                          <Grid xs={12} columnSpacing={2} rowSpacing={1} style={{display:'flex', justifyContent: 'center', flexDirection: 'column' }} item >
                              <Button type='submit' variant='contained' color='primary' size='small' sx={{ marginBottom: '5px', marginTop: '10px'}}  >Submit</Button>
                              <Button variant='contained' color='secondary' size='small' onClick={clearHandle} sx={{ marginBottom: '5px', marginTop: '5px'}}  >Clear</Button>
                          </Grid>
                          <Grid xs={12} item>
                                <Button >
                                  <Link to='/signup' style={{color: 'blue'}} >New Registration</Link>
                                </Button>
                            </Grid> 
                      </Grid>
                  </CardContent>
              </Card>
          </Box>
          </form>
        </div>
    </>
  )
}

export default LoginPage;