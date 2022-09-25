import axios from 'axios';

// const url = 'http://localhost:8080';
const url = 'https://todoapp-personaluse.herokuapp.com';

export const loginTodo = (user) => axios.post(`${url}/login`, user, { withCredentials: true } );
export const singUpTodo = (userinfo) => axios.post(`${url}/signup`, userinfo, { withCredentials: true } );  //{ withCredentials: true } 
export const logoutTodo = () => axios.get(`${url}/logout`, { withCredentials: true });

export const getUserInfo = () => axios.get(`${url}/userinfo`, { withCredentials: true });

export const fetchTodo = () => axios.get(`${url}/home/alltodos`, { withCredentials: true});

export const createTodo = (newPost) => axios.post(`${url}/home/newtodo`, newPost, { withCredentials: true });

export const markTodo = (id) => axios.patch(`${url}/home/alltodos/${id}/markcomplete`,{}, { withCredentials: true });

export const updateTodo = (id, updatedPost) => axios.patch(`${url}/home/alltodos/${id}/updatetodo`, updatedPost, { withCredentials: true });

export const deleteTodo = (id) => axios.delete(`${url}/home/alltodos/${id}/deletetodo`, { withCredentials: true });

export const deleteUser = () => axios.delete(`${url}/home/deleteuser`, { withCredentials: true });

export const updateProfile = (user) => axios.patch(`${url}/home/updateuser`, user, { withCredentials: true });