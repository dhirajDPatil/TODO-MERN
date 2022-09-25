import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './Components/LandingPage/LoginPage';
import RegistrationPage from './Components/LandingPage/RegistrationPage';
import Home from './Components/Home/Home';
import NewTodoList from './Components/Home/NewTodoList';
import NewTodo from './Components/Home/NewTodo';
import ProfileSettings from './Components/Home/ProfileSettings'
import Profile from './Components/Home/Profile'
import './App.css';
import { getUserInfo, logoutTodo } from './api';

function App() {

  const navigate = useNavigate();

  const logoutHandle = () => {
    return logoutTodo().then((r) => {
      if(r.status === 200){
        navigate('/login');
      }
    })
  }
  const getUserName = async () => {
    getUserInfo().then((r)=> {
      if(r.status === 200){
        navigate('/home/alltodos');
      }else{
        navigate('/login');
      }
    }).catch((e)=> {
      navigate('/login');
    })
  }

  useEffect(() => {
    getUserName();
  }, [])  // change for deployment add empty dependency - added 

  return (
    <>
      <Routes>
        <Route path='login' element={<LoginPage />}/>
        <Route path='signup' element={<RegistrationPage />}/>
        <Route path='home' element={<Home logoutHandle={logoutHandle} />}>
          <Route path='alltodos' element={<NewTodoList />}/>
          <Route path='newtodo' element={<NewTodo />}/>
          <Route path='editprofile' element={<Profile />}/>
          <Route path='deleteuser' element={<ProfileSettings />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
