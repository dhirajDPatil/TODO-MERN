import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteUser, getUserInfo, logoutTodo } from '../../api';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [uname, setCurrUser] = useState({
    userName: '',
    userID: ''
  });
  const userInfo = async () => {
    const res = await getUserInfo()
    setCurrUser(res.data)
  }

  const handleDeleteUser = async () => {
    const res = prompt("Are you sure?, To Delete User: Enter User Name")
    if(res === uname.userName ){
      await deleteUser();
      await logoutTodo();
      navigate('/login')
    }
  }


  useEffect(()=> {
    userInfo();
  },[])
  return (
  <>
    <Card elevation={2} style={{ maxWidth: 750, margin: "0 auto", padding: 20, marginTop: 25 }}>
      <Grid container  justifyContent={'center'} spacing={2} >
        <Grid item >
          <Card>
            <CardMedia
              component="img"
              height="300"
              width="300"
              image={uname.userID}
              alt={uname.userName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" sx={{textAlign: 'center'}} component="div">
                {uname.userName}
            </Typography>
            </CardContent>
          </Card>
          <Grid sx={{ marginTop: 5 }} item>
            <Grid container justifyContent='space-around'>
              <Button onClick={handleDeleteUser} variant='contained' xs={4} color="success">
                Delete Account
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      

    </Card>
  </>
  )
}

export default ProfileSettings;