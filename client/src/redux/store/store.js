import {configureStore} from '@reduxjs/toolkit'
import ToDoReducer from "../reducer/todoReducer";

const reducer= {
    todo: ToDoReducer,
}

const store = configureStore({
    reducer
})

export default store