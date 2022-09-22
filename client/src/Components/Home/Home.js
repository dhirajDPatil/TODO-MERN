import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';



const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('alltodos')
  },[])
  
  return (
    <>
      <NavBar/>
      <Outlet />
    </>
  )
}

export default Home