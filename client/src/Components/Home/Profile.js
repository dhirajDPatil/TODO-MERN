import { Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUserInfo, updateProfile } from '../../api';
import FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate()
  const [uname, setCurrUser] = useState({
    userName: '',
    userID: ''
  });
  const [user , setUser] = useState({
    userName: '',
    userID: ''
  });
  const userInfo = async () => {
    const res = await getUserInfo()
    setUser(res.data)
    setCurrUser(res.data)
  }

  const saveHandle = async () => {
    console.log(user)
    await updateProfile(user)
    navigate('/home/alltodos')
  }

  const clearHandle = () => {
    console.log("Clear Felid state");
    setUser({
      useName: '',
      userID: ''
    })
  }

  useEffect(()=> {
    userInfo();
  },[])
  return (
  <>
    <Card elevation={2} style={{ maxWidth: 750, margin: "0 auto", padding: 20, marginTop: 25 }}>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={5}>
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
        </Grid>
        <Grid xs={12} sx={{ marginTop: 5 }} sm={7} item>
          <Grid xs={12} item>
              <TextField label='Enter New User Name' value={user.userName ? user.userName : '' } onChange={(e)=> setUser({...user, userName: e.target.value})} placeholder="Enter User Name" variant='outlined' fullWidth />
          </Grid>
          <Grid xs={12} sx={{ marginTop: 5 }} item>
              <Typography marginBottom={2} > Choose New Profile Picture </Typography>
              <FileBase type='file' multiple={false} onDone={({base64}) => setUser({...user, userID: base64})} />
          </Grid>
          <Grid sx={{ marginTop: 5 }} item>
            <Grid container justifyContent='space-around'>
              <Button onClick={saveHandle} variant='contained' xs={4} color="success">
                Save
              </Button>
              <Button  onClick={clearHandle} variant='contained' xs={4} color="error">
                Cancel/clear
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      

    </Card>
  </>
  )
}

export default Profile;