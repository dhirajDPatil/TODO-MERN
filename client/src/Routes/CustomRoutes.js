import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home/Home'
import NewTodo from '../Components/Home/NewTodo'
import NewTodoList from '../Components/Home/NewTodoList'
import LoginPage from '../Components/LandingPage/LoginPage'
import RegistrationPage from '../Components/LandingPage/RegistrationPage'
import NoData from '../Components/Home/NoData'

const CustomRoutes = () => {
  return (
        <Routes>
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<RegistrationPage />} />
            <Route path='home' element={<Home />}>
              <Route path='alltodos' element={<NewTodoList />} />
              <Route path='newtodo' element={<NewTodo />} />
            </Route>
            <Route path='*' element={<NoData />} />
        </Routes>
  )
}

export default CustomRoutes;