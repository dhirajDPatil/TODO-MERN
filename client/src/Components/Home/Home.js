import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../api';
import { getAllT } from '../../redux/action/todoActions';
import NavBar from './NavBar';

const Home = ({logoutHandle}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    uName : 'User',
    profile: ''
  });
  
  const getUser = async () => {
    const res = await getUserInfo(); 
    setUser({
      uName: res.data.userName,
      profile: res.data.userID
    })
  }
  useEffect(() => {
    dispatch(getAllT());
    getUser();
    navigate('alltodos')
  },[])  // change after hosting remove both dependency - removed
  
  return (
    <>
      <NavBar user={user} logoutHandle={logoutHandle}/>
      <Outlet />
    </>
  )
}

export default Home