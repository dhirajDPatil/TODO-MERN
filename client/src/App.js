import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './Components/LandingPage/LoginPage';
import RegistrationPage from './Components/LandingPage/RegistrationPage';
import Home from './Components/Home/Home';
import NewTodoList from './Components/Home/NewTodoList';
import NewTodo from './Components/Home/NewTodo';
import './App.css';

function App() {

  const navigate = useNavigate();
  useEffect(()=> {
    const user = localStorage.getItem('newUser');
    if(user){
      navigate('/login');
    } else{
      navigate('/signup');
    }
  },[])
  return (
    <>
      <Routes>
        <Route path='login' element={<LoginPage />}/>
        <Route path='signup' element={<RegistrationPage />}/>
        <Route path='home' element={<Home />}>
          <Route path='alltodos' element={<NewTodoList />}/>
          <Route path='newtodo' element={<NewTodo />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
