import {configureStore} from '@reduxjs/toolkit'
import ToDoReducer from "../reducer/todoReducer";
import thunk from 'redux-thunk';

const reducer= {
    todo: ToDoReducer,
}

const store = configureStore({
    reducer,
    middleware: [thunk] 
})

export default store